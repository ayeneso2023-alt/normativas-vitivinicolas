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

3. **Radar Oficial en Tiempo Real (Conectado a la API oficial de Datos Abiertos del BOE)**:
   - Motor en vivo conectado directamente a la API oficial de Datos Abiertos del Boletín Oficial del Estado (`https://www.boe.es/datosabiertos/api/boe/sumario/{YYYYMMDD}`):
     - **Descarga y análisis en vivo** de más de 250 disposiciones por sumario diario oficial.
     - **Selector de fechas y botón "Escanear Último BOE"** para monitorizar publicaciones recientes.
     - **Filtros por los 6 ámbitos regulatorios de bodega**:
       - 🦺 **Prevención de Riesgos Laborales (PRL)** (espacios confinados, asfixia por CO2, atmósferas explosivas ATEX, ergonomía).
       - ⚙️ **Maquinaria Industrial y Equipos** (marcado CE, recipientes a presión, frío industrial RSIF, baja tensión).
       - 🍏 **Seguridad Alimentaria, Higiene y Desperdicio** (APPCC, RGSEAA, alérgenos, materiales MOCA, control metrológico de llenado).
       - 💧 **Medio Ambiente, Aguas y Vertidos** (EDARI, cánones hidrológicos de cuenca, residuos, huella de carbono, fitosanitarios).
       - 🍷 **Vitivinícola y Denominaciones de Origen** (circulares de los 9 Consejos Reguladores, INFOVI, SILICIE, AICA).
       - 🚒 **Seguridad Contra Incendios** (RSCIEI, RIPCI, revisiones OCA).
   - **Buscador en directo**: Localiza cualquier término (ej: *decreto, subvención, uva, alcohol, residuos, inspección*) en el sumario oficial del día.
   - **Integración Reactiva Instantánea**: El botón **"➕ Añadir a mi Catálogo"** incorpora cualquier disposición encontrada directamente a la base de datos de la bodega (`localStorage`), actualizando en tiempo real el contador global (de 78 a 79+), el banner de avisos prioritarios y el catálogo cronológico.
   - **Formulario de Alta Rápida**: Permite a la bodega registrar circulares y acuerdos de plenos de Consejos Reguladores o decretos autonómicos sin tocar código.
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
3. Para consultar el radar o añadir normas, dirígete a la pestaña **"Radar Oficial en Tiempo Real"**.
4. Para ejecutar el monitorizador de BOE por consola: `node sync_boe_normativas.js`.

---

## 📁 Estructura de Archivos

- `index.html`: Aplicación Single-Page interactiva con interfaz Tailwind CSS, diseño visual premium y módulo de Radar BOE en Vivo.
- `normativas_data.js`: Base de datos jurídica consolidada con **78 normativas reales**, metadatos, checklist por departamentos y calendarios.
- `sync_boe_normativas.js`: Script de monitorización del BOE por consola para novedades de PRL, maquinaria, alimentación y vino.
- `README.md`: Documentación de uso y especificaciones técnicas.
