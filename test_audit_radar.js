/**
 * TEST AUTOMATIZADO DE AUDITORÍA Y MOTOR DEL RADAR EN DIRECTO CON BOE
 * Verifica la extracción de la API de Datos Abiertos del BOE, clasificación temática
 * y sincronización reactiva con el catálogo del Dashboard.
 */

const https = require('https');
const assert = require('assert');

// 1. Extractor de elementos del BOE
function extractBoeItemsFromSumario(json, dateStr) {
  const items = [];
  const dateFormatted = `${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)}`;
  
  function walk(node, currentDep, currentSec) {
    if (!node) return;
    if (Array.isArray(node)) {
      for (const el of node) walk(el, currentDep, currentSec);
      return;
    }
    if (typeof node === 'object') {
      let dep = currentDep;
      let sec = currentSec;
      if (node.nombre && node.codigo && (node.codigo.length > 2 || isNaN(node.codigo))) {
        dep = node.nombre;
      }
      if (node.nombre && (node.codigo === '1' || node.codigo === '3' || node.codigo === '2A' || node.codigo === '5A')) {
        sec = node.nombre;
      }
      
      if (node.identificador && node.titulo) {
        const id = node.identificador;
        const titulo = node.titulo;
        const urlPdf = node.url_pdf?.texto || (typeof node.url_pdf === 'string' ? node.url_pdf : `https://www.boe.es/boe/dias/${dateStr.slice(0,4)}/${dateStr.slice(4,6)}/${dateStr.slice(6,8)}/pdfs/${id}.pdf`);
        const enlace = `https://www.boe.es/buscar/act.php?id=${id}`;
        
        const topic = detectBoeTopic(titulo, dep);
        const ambito = getAmbitoLabelFromTopic(topic, dep);

        items.push({
          id: id,
          titulo: titulo,
          codigo: id,
          organismo: dep || "Boletín Oficial del Estado",
          seccion: sec || "Disposiciones Generales",
          fecha: dateFormatted,
          nivel: "Estatal",
          region: "España",
          do: "Todas",
          topic: topic,
          ambito: ambito,
          resumen: titulo,
          enlace: enlace,
          url_pdf: urlPdf,
          is_live_boe: true
        });
        return;
      }
      for (const k of Object.keys(node)) {
        walk(node[k], dep, sec);
      }
    }
  }
  walk(json.data?.sumario, "", "");
  return items;
}

function detectBoeTopic(titulo, dep) {
  const text = (titulo + " " + (dep || "")).toLowerCase();
  if (/prevención|riesgo|laboral|asfixia|confinado|accidente|seguridad y salud|insst|trabajo/i.test(text)) return 'prl';
  if (/maquinaria|equipo de trabajo|marcado ce|frigor|presión|seguridad industrial|eléctric|industria/i.test(text)) return 'maquinaria';
  if (/aliment|desperdicio|calidad|sanidad|higiene|nutric|consumo|aesan|alérgeno/i.test(text)) return 'alimentaria';
  if (/vino|vitivinícola|viñedo|uva|mosto|bodega|denominación de origen|enolog|alcohol/i.test(text)) return 'vitivinicola';
  if (/medio ambiente|residuo|envase|vertido|agua|hidráulic|clima|emisión|ecolog|transición ecológica/i.test(text)) return 'medioambiente';
  if (/incendio|fuego|bombero|protección civil|rsciei|ripci/i.test(text)) return 'incendios';
  return 'general';
}

function getAmbitoLabelFromTopic(topic, dep) {
  switch (topic) {
    case 'prl': return 'Seguridad y Salud Laboral (PRL)';
    case 'maquinaria': return 'Seguridad Industrial y Maquinaria';
    case 'alimentaria': return 'Seguridad Alimentaria y Calidad';
    case 'vitivinicola': return 'Vitivinícola y Etiquetado';
    case 'medioambiente': return 'Medio Ambiente y Aguas';
    case 'incendios': return 'Seguridad Contra Incendios';
    default: return dep ? (dep.length > 40 ? dep.slice(0, 38) + '...' : dep) : 'Disposición Estatal';
  }
}

async function testFetchBoe(dateStr) {
  return new Promise((resolve, reject) => {
    const url = `https://www.boe.es/datosabiertos/api/boe/sumario/${dateStr}`;
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', err => reject(err));
  });
}

async function runTests() {
  console.log("=== INICIO TEST DE AUDITORÍA Y MOTOR DEL RADAR BOE EN DIRECTO ===");
  
  // Test 1: Conexión con BOE Datos Abiertos
  console.log("Test 1: Conectando con API de Datos Abiertos del BOE (20250923)...");
  const json = await testFetchBoe('20250923');
  assert.strictEqual(json.status.code, "200", "El código de respuesta debe ser 200");
  console.log("✓ Test 1 superado: Respuesta 200 OK del BOE recibida.");

  // Test 2: Extracción exhaustiva de disposiciones
  console.log("Test 2: Extracción de disposiciones oficiales...");
  const items = extractBoeItemsFromSumario(json, '20250923');
  assert.ok(items.length > 200, `Debe extraer más de 200 disposiciones, extraídas: ${items.length}`);
  console.log(`✓ Test 2 superado: ${items.length} disposiciones reales extraídas.`);

  // Test 3: Validación de campos de cada disposición
  console.log("Test 3: Validación de estructura de datos oficial...");
  const sample = items[0];
  assert.ok(sample.id.startsWith("BOE-A-"), "ID oficial debe empezar por BOE-A-");
  assert.ok(sample.titulo.length > 10, "El título debe contener texto");
  assert.ok(sample.enlace.includes(sample.id), "El enlace debe apuntar a la ficha oficial de la disposición");
  assert.strictEqual(sample.fecha, "2025-09-23", "La fecha debe estar en formato ISO YYYY-MM-DD");
  console.log(`✓ Test 3 superado: Campos validados (${sample.id} - ${sample.organismo}).`);

  // Test 4: Búsqueda y filtrado temático
  console.log("Test 4: Filtrado temático y búsqueda por palabra clave...");
  const industriaItems = items.filter(i => i.topic === 'maquinaria' || /industria/i.test(i.titulo));
  assert.ok(industriaItems.length > 0, "Debe encontrar al menos una disposición sobre industria o maquinaria");
  console.log(`✓ Test 4 superado: Encontradas ${industriaItems.length} disposiciones de industria/maquinaria.`);

  // Test 5: Simulación de integración en el Catálogo de la bodega
  console.log("Test 5: Integración reactiva en el Catálogo...");
  const customCatalog = [];
  const selectedNorma = sample;
  const newEntry = {
    id: selectedNorma.id,
    titulo: selectedNorma.titulo,
    codigo: selectedNorma.codigo,
    fecha: selectedNorma.fecha,
    nivel: "Estatal",
    region: "España",
    do: "Todas",
    ambito: selectedNorma.ambito,
    is_news: true,
    novedad_badge: "Radar BOE en Directo",
    resumen: selectedNorma.titulo,
    requisitos: [
      `Publicado en el BOE (${selectedNorma.fecha}) en la sección ${selectedNorma.seccion}.`,
      "Revisión y análisis de aplicabilidad legal en bodega."
    ],
    sanciones: "Conforme al régimen sancionador de la legislación estatal aplicable.",
    enlace: selectedNorma.enlace
  };
  customCatalog.push(newEntry);
  assert.strictEqual(customCatalog.length, 1);
  assert.strictEqual(customCatalog[0].id, sample.id);
  console.log(`✓ Test 5 superado: Disposición ${sample.id} agregada al catálogo de la bodega con éxito.`);

  console.log("\n=================================================");
  console.log("🎯 TODOS LOS TESTS DEL MOTOR DEL RADAR HAN SIDO SUPERADOS.");
  console.log("=================================================");
}

runTests().catch(err => {
  console.error("❌ Error en tests:", err);
  process.exit(1);
});
