# Portal y Dashboard de Cumplimiento Legal y Regulatorio Vitivinícola

Dashboard integral interactivo diseñado para **bodegas de elaboración, plantas de crianza y embotellado, comercializadoras y almacenes de vino** con presencia multirregional en el Estado español (**Cataluña, Navarra, La Rioja, País Vasco, Burgos/Castilla y León y Málaga/Andalucía**) y bajo las principales Denominaciones de Origen (**DO Empordà, DO Catalunya, DOQ Priorat, DO Cava, DO Ribera del Duero, DOCa Rioja, DO Navarra, IGP 3 Riberas y DO Sierras de Málaga / Ronda**).

---

## 🌟 Características Principales

1. **Novedades Críticas Visibles Arriba (Top Banner)**:
   - Destacado visual en la parte superior con alertas operativas de cumplimiento inmediato (2024-2026):
     - **Reglamento (UE) 2021/2117**: Etiquetado nutricional ('E') e ingredientes vía código QR / e-label.
     - **Ley 16/2021**: Registro telemático obligatorio de contratos de uva en la plataforma AICA antes de la entrega del producto.
     - **Ley de Prevención de las Pérdidas y el Desperdicio Alimentario & Llei 3/2020 de Catalunya**: Plan de Prevención del Desperdicio obligatorio en bodega y almacén, donación social y aprovechamiento de subproductos.
     - **Reglamento (UE) 2023/1230 de Máquinas**: Nuevo marco europeo de seguridad en maquinaria industrial, marcado CE digital y ciberseguridad en líneas de embotellado.
     - **Reglamento (UE) 2023/1115 (EUDR Deforestación)**: Trazabilidad de no deforestación en madera de roble para barricas y cartón.
     - **Ley 2/2023 (Canal de Denuncias / Whistleblowing)**: Canal ético interno obligatorio para empresas de 50 o más trabajadores.
     - **DO Cava**: Obligación de uva y vino 100% ecológico para Cava de Guarda Superior desde la cosecha 2025.
     - **Reglamento PPWR (UE) 2025/40**: Cuotas obligatorias de reutilización de botellas, ecodiseño y reducción de envases de vidrio.
     - **RD 39/1997 (Art. 22 bis) & Criterio Técnico INSST**: Protocolo reforzado contra asfixia por CO2 (*tufo*) en fermentación y permisos de espacios confinados.
     - **RD 3/2023**: Plan Sanitario del Agua (PSA) de proceso y limpieza de cubas.
     - **RD 1055/2022**: Registro de Productores de Producto (sección envases MITECO) y declaración anual.
     - **Ley 7/2022**: Impuesto sobre envases de plástico no reutilizables (Modelo 592).
     - **DOCa Rioja**: Pliego revisado sobre separación física en bodega y trazabilidad.

2. **Ordenación Cronológica Estricta (de más reciente a más antigua)**:
   - Las **78 normativas** del catálogo están ordenadas por defecto cronológicamente desde la fecha más reciente (2025) hasta las bases fundacionales internacionales (OIV - 1924).
   - Posibilidad de alternar orden ascendente o alfabético con un clic.

3. **Radar Multi-Jurisdiccional en Tiempo Real (5 Niveles Regulatorios)**:
   - Supera la limitación de consultar únicamente el BOE al incorporar las 5 capas legales del sector vitivinícola:
     - 🌍 **Mundial**: OIV (Organización Internacional de la Viña y el Vino) y Codex Alimentarius (prácticas enológicas, límites de contaminantes y aditivos, desalcoholización).
     - 🇪🇺 **Unión Europea (DOUE / EUR-Lex)**: Reglamentos comunitarios de aplicación directa (PPWR 2025/40 de envases, Reglamento de Máquinas 2023/1230, EUDR 2023/1115 de deforestación, OCM única 1308/2013, Etiquetado e-label 2021/2117).
     - 🇪🇸 **Estatal (BOE / Ministerios)**: Leyes estatales y Reales Decretos (Ley de la Cadena Alimentaria / AICA, Ley de Residuos 7/2022, RD Envases 1055/2022, PSA RD 3/2023, PRL RD 39/1997 / INSST). Motor conectado a la API de Datos Abiertos del BOE en vivo.
     - 🏛️ **Autonómico (Boletines de las CCAA)**: DOGC (Cataluña), BOR (La Rioja), BON (Navarra), BOCyL (Castilla y León), BOPV (País Vasco) y BOJA (Andalucía). Gestión de autorizaciones de vertido (EDARI / ACA / URA / Confederaciones), prevención de desperdicio alimentario (Llei 3/2020), huella de carbono y calendarios de vendimia.
     - 🍷 **Consejos Reguladores (DO / DOCa)**: Pliegos de condiciones y acuerdos de pleno de DO Cava (100% ecológico en Guarda Superior 2025), DOCa Rioja, DO Ribera del Duero, DOQ Priorat, DO Empordà, DO Navarra, DO Catalunya y DO Sierras de Málaga.
   - **Sincronización Unificada de Todas las Fuentes (5 Niveles)**: Botón `🔄 Sincronizar Todas las Fuentes (5 Niveles)` que audita en tiempo real las resoluciones de la OIV, los reglamentos del DOUE, el sumario diario en vivo del BOE (conectado a su API de Datos Abiertos), los boletines autonómicos (DOGC, BOR, BON, BOCyL, BOPV, BOJA) y los pliegos de los Consejos Reguladores.
   - **Sistema Anti-Duplicados y Saneamiento Automático**: Motor inteligente que identifica y compara disposiciones por código legal unificado, identificador oficial y URL. Las normas ya incorporadas muestran la etiqueta `✓ En tu Catálogo` y bloquean la creación de duplicados. Además, sanea automáticamente el almacenamiento local (`localStorage`) eliminando cualquier entrada duplicada preexistente.
   - **Incorporación en Bloque o Individual**: Posibilidad de añadir novedades puntuales con `➕ Añadir a mi Catálogo` o incorporar todas las disposiciones pendientes de golpe en un solo clic con `📥 Incorporar Novedades al Catálogo`.
   - **Hub de Consultas Oficiales en Directo**: Barra de accesos directos con 1 clic a los buscadores oficiales con filtros preconfigurados de DOUE/EUR-Lex, OIV, DOGC, BOR, BOCyL, BON, BOPV y BOJA.
   - **Formulario de Alta Rápida Multi-Jurisdicción**: Permite registrar con 1 clic disposiciones de cualquier nivel legal con asignación automática de ámbito y enlaces oficiales.
   - **Exportación JSON**: Descarga de la base de datos completa actualizada.

4. **Autodiagnóstico de Cumplimiento (*Compliance Audit*)**:
   - Lista de chequeo interactiva con 25 puntos de control por departamentos con cálculo dinámico de puntuación (%) y guardado en memoria.

5. **Calendario de Obligaciones Periódicas**:
   - Cronograma de trámites recurrentes (INFOVI mensual día 20, SILICIE en 8 días, registro previo AICA, declaración anual MITECO de envases, revisiones OCA contra incendios, limpiezas de legionela, etc.).

---

## 🌐 Acceso Online Multi-Dispositivo (GitHub Pages)

El dashboard está desplegado y accesible desde cualquier ordenador, tablet o smartphone:
👉 **[https://ayeneso2023-alt.github.io/normativas-vitivinicolas/](https://ayeneso2023-alt.github.io/normativas-vitivinicolas/)**

---

## 🚀 Cómo Usar el Dashboard Localmente

El dashboard es **completamente autocontenido y funciona offline**:
1. Abre la carpeta: `/Users/joseantoniocorralesortega/Documents/Normativas y reglamentos/`
2. Haz doble clic en `index.html` para abrirlo en cualquier navegador web moderno (Google Chrome, Safari, Firefox, Edge).
3. Para consultar el radar o añadir normas, dirígete a la pestaña **"Radar Multi-Jurisdiccional en Tiempo Real"**.
4. Para ejecutar el monitorizador de BOE por consola: `node sync_boe_normativas.js`.

---

## 📁 Estructura de Archivos

- `index.html`: Aplicación Single-Page interactiva con interfaz Tailwind CSS, diseño visual premium y módulo de Radar Multi-Jurisdiccional en Vivo (Mundial, Europa, España, CCAA y DOs).
- `normativas_data.js`: Base de datos jurídica consolidada con **78 normativas reales**, metadatos, checklist por departamentos y calendarios.
- `sync_boe_normativas.js`: Script de monitorización del BOE por consola para novedades de PRL, maquinaria, alimentación y vino.
- `README.md`: Documentación de uso y especificaciones técnicas.
