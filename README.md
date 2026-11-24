# Inslearns — Matemáticas Cyberpunk

**Inslearns** es una red social educativa interactiva estilo Instagram, en su versión **Matemáticas Cyberpunk**, centrada en el aprendizaje de matemáticas mediante publicaciones visuales con diagramas, validación de contenido y práctica interactiva.

La aplicación ofrece un feed mobile-first con tarjetas educativas donde se pueden explorar conceptos de álgebra, geometría, trigonometría, cálculo y estadística, interactuar con cada publicación y guardar apuntes en un cuaderno personal con persistencia local.

## Descripción

Inslearns combina la dinámica de una red social con herramientas de estudio:

- **Feed educativo de matemáticas:** publicaciones con autor, tema, contenido breve y diagramas o imágenes visuales para apoyar la comprensión.
- **Interacción social de aprendizaje:** me gusta por botón o doble clic, y guardado de apuntes favoritos.
- **Organización personal:** vista **Mi Cuaderno** para consultar las publicaciones guardadas.
- **Apoyo con IA (simulada/local):** verificación de veracidad del contenido y ejercicios interactivos de práctica con retroalimentación inmediata.

## Estética

La interfaz utiliza una **estética cyberpunk** coherente y enfocada en la legibilidad:

- **Fondo oscuro** con degradados profundos para resaltar el contenido.
- **Acentos neón** en **cian**, **magenta**, **amarillo** y **verde** para botones, bordes, etiquetas y estados.
- **Enfoque mobile-first** con contenedor centrado y ancho máximo de **480px** en escritorio, simulando una experiencia de aplicación móvil.
- **Tarjetas limpias** con jerarquía visual clara: autor, tema, diagrama, título, contenido y barra de acciones.
- **Sin estilos en línea:** toda la presentación se define en `css/styles.css`.

## Funcionalidades principales

- Al menos **5 publicaciones de matemáticas** precargadas con diagramas/imágenes visuales.
- **Filtro por tema** en el feed para explorar contenidos específicos.
- **Me gusta** mediante botón o doble clic sobre la tarjeta.
- **Botón Guardar** para marcar o desmarcar publicaciones.
- **Vista Mi Cuaderno** con publicaciones guardadas y filtro por tema o título.
- **Persistencia en `localStorage`** para usuario, publicaciones y guardados.
- **Verificador de veracidad** por publicación con validación matemática simulada.
- **Ejercicios interactivos** con opciones de práctica y respuesta inmediata de acierto o error.

## Verificador de veracidad

Cada tarjeta incluye el botón **"Verificar veracidad"**, que ejecuta la lógica definida en `js/ai.js` para evaluar el contenido de la publicación.

- **Entrada:** el objeto de la publicación (`Publicacion`).
- **Salida:** un resultado con:
  - `nivelConfianza`: indica el nivel de confianza del análisis.
  - `explicacionAcademica`: breve explicación o validación matemática del contenido.
- **Comportamiento en la interfaz:** al presionar el botón, se muestra en la tarjeta un bloque de **Validación matemática** con el nivel de confianza y la explicación. El resultado se guarda en la publicación y persiste en `localStorage`.

La implementación actual funciona en **modo simulado local**, con la misma interfaz preparada para una posible integración con una API externa.

## Ejercicios interactivos

Cada tarjeta incluye el botón **"Practicar ejercicio"**, que genera o muestra una práctica asociada al contenido de la publicación.

- **Generación:** si la publicación no tiene ejercicio, `js/ai.js` crea uno con:
  - `pregunta`
  - `opciones`
  - `indiceCorrecto`
  - `retroalimentacion`
- **Interacción:** las opciones se presentan como botones seleccionables dentro de la tarjeta.
- **Respuesta inmediata:** al elegir una opción, la interfaz indica de forma inmediata si la respuesta es **correcta** o **incorrecta** y muestra la retroalimentación correspondiente.
- **Persistencia:** el ejercicio generado se guarda en la publicación dentro de `localStorage`; la selección realizada en la práctica se maneja en la sesión actual para una experiencia interactiva.

## Estructura de carpetas

```text
/
├── AGENTS.md
├── README.md
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── ai.js
    ├── app.js
    └── data.js
```

### Descripción de archivos

- `index.html`: estructura semántica de la interfaz y punto de entrada de la aplicación.
- `css/styles.css`: estilos principales, paleta cyberpunk, diseño mobile-first y componentes visuales.
- `js/app.js`: lógica de interfaz, eventos, filtros, interacciones, renderizado y orquestación.
- `js/data.js`: modelos, datos iniciales de matemáticas, diagramas visuales y persistencia en `localStorage`.
- `js/ai.js`: módulo de IA para verificación de veracidad y generación de ejercicios, separado de la manipulación del DOM.

## Cómo ejecutarlo

### Opción 1: Ejecutar en local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/gitkarenh/inslearns.git
   cd inslearns
   ```
2. **Inicia un servidor estático (recomendado):**

   Con Python 3:
   ```bash
   python3 -m http.server 8000
   ```

   Con Node.js (si tienes `npx`):
   ```bash
   npx serve .
   ```
3. **Abre la aplicación en el navegador:**
   - `http://localhost:8000`

> También puedes abrir `index.html` directamente, pero se recomienda un servidor local para un comportamiento más consistente.

### Opción 2: Ejecutar en GitHub Codespaces

1. Abre el repositorio en GitHub.
2. Haz clic en **Code** → **Codespaces** → **Create codespace on main** (o la rama correspondiente).
3. Espera a que el entorno se inicie.
4. En la terminal de Codespaces, ejecuta:
   ```bash
   python3 -m http.server 8000
   ```
5. Abre el puerto **8000** desde la pestaña **Ports** o con el botón **Open in Browser**.
6. Interactúa con la aplicación desde el navegador.

## Checklist de pruebas rápidas

- [ ] **Carga inicial:** la aplicación abre sin errores visibles y muestra la pantalla de registro o el feed según el estado guardado.
- [ ] **Publicaciones de matemáticas:** el feed muestra al menos 5 publicaciones con tema, contenido y diagrama/visual.
- [ ] **Filtro por tema:** al cambiar el filtro en el feed, solo se muestran las publicaciones del tema seleccionado.
- [ ] **Me gusta por botón:** el contador de "Me gusta" aumenta al presionar el botón en una tarjeta.
- [ ] **Me gusta por doble clic:** el contador aumenta al hacer doble clic sobre una tarjeta.
- [ ] **Guardar:** el botón "Guardar" cambia de estado y la publicación se agrega o quita de Mi Cuaderno.
- [ ] **Mi Cuaderno:** la vista muestra las publicaciones guardadas y permite filtrarlas por tema o título.
- [ ] **Persistencia:** al recargar la página, se conservan el perfil, las publicaciones, los likes/guardados y el contenido de Mi Cuaderno en `localStorage`.
- [ ] **Verificar veracidad:** el botón muestra la validación matemática con nivel de confianza y explicación académica.
- [ ] **Practicar ejercicio:** el botón muestra una pregunta con opciones; al seleccionar una, se indica de inmediato acierto o error y se muestra la retroalimentación.
- [ ] **Enlaces y recursos:** `index.html` carga correctamente `css/styles.css`, `js/data.js`, `js/ai.js` y `js/app.js`.
- [ ] **Consola:** no aparecen errores en la consola del navegador durante las interacciones básicas.

## Tecnologías y convenciones

- Proyecto construido con **HTML5, CSS3 y JavaScript ES6+ puro** (sin frameworks pesados).
- Toda la **interfaz** y los **comentarios del código** están en **español**.
- La lógica de IA permanece en `js/ai.js`, separada de la manipulación del DOM.
- Revisa las reglas y convenciones del proyecto en [`AGENTS.md`](AGENTS.md).
