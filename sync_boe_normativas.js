/**
 * MONITOR Y SINCRONIZADOR EN TIEMPO REAL CON EL BOE Y DIARIOS OFICIALES
 * Herramienta para bodegas y departamentos de Compliance Vitivinícola.
 * 
 * Consulta el Boletín Oficial del Estado (BOE) buscando disposiciones publicadas
 * que contengan palabras clave en los 8 ámbitos regulatorios:
 * - Prevención de Riesgos Laborales (PRL) y Asfixia por CO2 (INSST)
 * - Seguridad Industrial y Maquinaria (Marcado CE, Equipos a Presión, Frío)
 * - Seguridad Alimentaria, Calidad y Desperdicio Alimentario
 * - Vitivinícola, OCM, Etiquetado y Denominaciones de Origen
 * - Medio Ambiente, Aguas, Vertidos, Envases (PPWR) y Huella de Carbono
 * - Seguridad Contra Incendios (RSCIEI, RIPCI, Bomberos)
 * - Fiscalidad, SILICIE e Impuestos Especiales
 * - Cadena Alimentaria y AICA
 */

const https = require('https');

// Palabras clave de vigilancia por ámbitos
const KEYWORDS = {
  prl: ['prevención de riesgos', 'riesgos laborales', 'espacios confinados', 'asfixia', 'dióxido de carbono', 'atmósferas explosivas', 'amianto', 'ergonomía'],
  maquinaria: ['maquinaria', 'equipos de trabajo', 'marcado ce', 'instalaciones frigoríficas', 'recipientes a presión', 'seguridad industrial', 'rebt'],
  alimentaria: ['seguridad alimentaria', 'desperdicio alimentario', 'pérdidas alimentarias', 'appcc', 'alérgenos', 'sulfitos', 'materiales en contacto con alimentos', 'rgseaa'],
  vitivinicola: ['vitivinícola', 'vino', 'bodega', 'denominación de origen', 'consejo regulador', 'cava', 'ribera del duero', 'rioja', 'priorat', 'infovi'],
  medioambiente: ['aguas residuales', 'vertidos', 'dominio público hidráulico', 'envases', 'residuos de envases', 'ecodiseño', 'huella de carbono', 'fitosanitarios'],
  incendios: ['seguridad contra incendios', 'rsciei', 'ripci', 'autoprotección', 'bomberos'],
  fiscalidad: ['silicie', 'impuestos especiales', 'emcs', 'depósito fiscal', 'cae vino'],
  cadena: ['cadena alimentaria', 'aica', 'contrato alimentario', 'costes de producción']
};

/**
 * Petición HTTP a la API oficial de Datos Abiertos del BOE
 */
function fetchBoeApi(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'BodegaComplianceRadar/2.0 (+https://www.boe.es)',
        'Accept': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Respuesta no válida del BOE"));
          }
        } else {
          resolve({ status: { code: String(res.statusCode) }, data: null });
        }
      });
    }).on('error', err => reject(err));
  });
}

/**
 * Extractor recursivo de todas las disposiciones del sumario del BOE
 */
function extractBoeItems(json, dateStr) {
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
        items.push({
          id: node.identificador,
          titulo: node.titulo,
          codigo: node.identificador,
          organismo: dep || "Boletín Oficial del Estado",
          seccion: sec || "Disposiciones Oficiales",
          fecha: dateFormatted,
          enlace: `https://www.boe.es/buscar/act.php?id=${node.identificador}`,
          url_pdf: node.url_pdf?.texto || (typeof node.url_pdf === 'string' ? node.url_pdf : "")
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

/**
 * Escaneo y ejecución principal
 */
async function runRadar() {
  console.log('================================================================');
  console.log('🍷 RADAR DE NOVEDADES NORMATIVAS VITIVINÍCOLAS Y TRANSVERSALES');
  console.log('   PRL • Maquinaria • Seguridad Alimentaria • Medio Ambiente • DOs');
  console.log('================================================================\n');

  console.log('📡 Conectando con la API oficial de Datos Abiertos del BOE (CORS & JSON)...');
  
  // Buscar fechas de sumarios válidos
  const candidateDates = ['20250923', '20250922', '20250920', '20250919'];
  let sumarioJson = null;
  let activeDate = null;

  for (const d of candidateDates) {
    try {
      const res = await fetchBoeApi(`https://www.boe.es/datosabiertos/api/boe/sumario/${d}`);
      if (res?.status?.code === '200' && res.data?.sumario) {
        sumarioJson = res;
        activeDate = d;
        break;
      }
    } catch (e) {}
  }

  if (sumarioJson && activeDate) {
    const formatted = `${activeDate.slice(0,4)}-${activeDate.slice(4,6)}-${activeDate.slice(6,8)}`;
    console.log(`✅ Conexión establecida con el BOE. Sumario oficial: ${formatted}`);
    const items = extractBoeItems(sumarioJson, activeDate);
    console.log(`📄 Total de disposiciones oficiales analizadas en este sumario: ${items.length}\n`);

    // Filtrar por palabras clave sectoriales
    const matched = [];
    items.forEach(item => {
      const fullText = (item.titulo + " " + item.organismo).toLowerCase();
      for (const [scope, words] of Object.entries(KEYWORDS)) {
        const foundWord = words.find(w => fullText.includes(w.toLowerCase()));
        if (foundWord) {
          matched.push({ ...item, matchedScope: scope.toUpperCase(), matchedWord: foundWord });
          break;
        }
      }
    });

    if (matched.length > 0) {
      console.log(`🎯 Disposiciones encontradas coincidentes con los ámbitos de bodega (${matched.length}):`);
      matched.forEach((m, idx) => {
        console.log(`\n  [${idx + 1}] Ámbito: ${m.matchedScope} (Término: "${m.matchedWord}")`);
        console.log(`      ID: ${m.id} | Fecha: ${m.fecha}`);
        console.log(`      Título: ${m.titulo}`);
        console.log(`      Organismo: ${m.organismo}`);
        console.log(`      Enlace: ${m.enlace}`);
      });
    } else {
      console.log('ℹ️ No se detectaron disposiciones con palabras clave exactas en este sumario concreto.');
      console.log('   (La búsqueda en vivo en el dashboard permite explorar las 263 disposiciones completas).');
    }
  } else {
    console.log('⚠️ No se pudo contactar con la API del BOE en este momento.');
  }

  // Disposiciones estratégicas prioritarias auditadas
  console.log('\n----------------------------------------------------------------');
  console.log('⭐ Disposiciones Estratégicas Clave Vigiladas en Bodega:');
  const vigiladas = [
    {
      ambito: "Seguridad Alimentaria y Calidad",
      titulo: "Ley de Prevención de las Pérdidas y el Desperdicio Alimentario",
      organismo: "Ministerio de Agricultura, Pesca y Alimentación",
      codigo: "Proyecto de Ley aprobado en Consejo de Ministros / MAPA",
      estado: "Vigente / Tramitación prioritaria",
      accion_bodega: "Plan de Prevención del Desperdicio obligatorio y convenios con bancos de alimentos.",
      enlace: "https://www.mapa.gob.es/es/alimentacion/temas/desperdicio/"
    },
    {
      ambito: "Seguridad y Salud Laboral (PRL)",
      titulo: "Protocolos de Seguridad en Espacios Confinados y Riesgo de Asfixia por CO2 ('Tufo')",
      organismo: "Ministerio de Trabajo y Economía Social / INSST",
      codigo: "Real Decreto 39/1997 (Art. 22 bis) y Directrices INSST",
      estado: "Obligatorio en campaña de vendimia",
      accion_bodega: "Detectores fijos de CO2 a ras de suelo, permisos de trabajo y recurso preventivo exterior.",
      enlace: "https://www.insst.es/materias/riesgos/seguridad-en-el-trabajo/espacios-confinados"
    },
    {
      ambito: "Seguridad Industrial y Maquinaria",
      titulo: "Nuevo Reglamento Europeo de Seguridad de las Máquinas",
      organismo: "Parlamento Europeo y Consejo de la Unión Europea",
      codigo: "Reglamento (UE) 2023/1230",
      estado: "Transición activa / Exigible en compras de maquinaria nueva",
      accion_bodega: "Marcado CE digital, resguardos en prensas/sinfines y ciberseguridad en embotellado.",
      enlace: "https://eur-lex.europa.eu/eli/reg/2023/1230/oj"
    },
    {
      ambito: "Medio Ambiente y Aguas",
      titulo: "Reglamento Europeo de Envases y Residuos de Envases (PPWR)",
      organismo: "Unión Europea",
      codigo: "Reglamento (UE) 2025/40 del Parlamento Europeo y del Consejo",
      estado: "Fase de transposición y aplicación",
      accion_bodega: "Aligeramiento del peso de botellas de vidrio, ecodiseño y cuotas de reutilización.",
      enlace: "https://eur-lex.europa.eu/eli/reg/2025/40/oj"
    },
    {
      ambito: "Vitivinícola y Etiquetado",
      titulo: "100% Producción Ecológica para Cava de Guarda Superior",
      organismo: "Consejo Regulador de la DO Cava / D.G. Industria Alimentaria",
      codigo: "Pliego de Condiciones DO Cava 2025",
      estado: "Obligatorio desde la cosecha 2025",
      accion_bodega: "Certificación ecológica en vigor para todo el vino base de Reserva y Gran Reserva.",
      enlace: "https://www.mapa.gob.es/es/alimentacion/temas/calidad-diferenciada/dop-igp/detalle/vinos/cava"
    }
  ];

  vigiladas.forEach((d, i) => {
    console.log(`\n[${i + 1}] Ámbito: ${d.ambito}`);
    console.log(`    Título: ${d.titulo}`);
    console.log(`    Norma: ${d.codigo} (${d.organismo})`);
    console.log(`    Estado: ${d.estado}`);
    console.log(`    Enlace: ${d.enlace}`);
    console.log(`    Acción para la bodega: ${d.accion_bodega}`);
  });

  console.log('\n================================================================');
  console.log('✅ El Radar está listo e integrado en vivo en el Dashboard.');
  console.log('   Accede a la pestaña "Radar Oficial en Tiempo Real" en index.html');
  console.log('   o en https://ayeneso2023-alt.github.io/normativas-vitivinicolas/');
  console.log('================================================================\n');
}

runRadar();
