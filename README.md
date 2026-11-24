# Inslearns

**Inslearns** es una red social educativa interactiva con estilo inspirado en Instagram y una estética **cyberpunk**, diseñada para que estudiantes descubran, compartan y validen apuntes de forma dinámica. La plataforma permite registrar materias e intereses, explorar publicaciones en un feed desplazable y usar inteligencia artificial en cada publicación para verificar la veracidad del contenido y generar ejercicios de aprendizaje.

## Visión del proyecto

Crear un espacio digital donde el aprendizaje colaborativo sea visual, rápido y confiable. Inslearns busca combinar la experiencia de consumo de contenido tipo red social con herramientas educativas que fomenten el pensamiento crítico, la revisión de fuentes y la práctica activa mediante ejercicios generados a partir de cada apunte.

## Estética cyberpunk interactiva

La interfaz apuesta por una identidad visual futurista y envolvente:

- **Paleta neón sobre fondo oscuro:** contrastes con cian, magenta y violeta para resaltar acciones y estados.
- **Tarjetas con brillo y profundidad:** bordes luminosos, sombras y efectos de realce al interactuar.
- **Experiencia tipo aplicación móvil:** diseño *mobile-first* con contenedor centrado y ancho máximo de 480px en escritorio.
- **Interacciones dinámicas:** botones con retroalimentación visual, despliegue de resultados de IA y acciones rápidas en cada publicación (me gusta, guardar, verificar y practicar).
- **Jerarquía visual clara:** cada tarjeta muestra autor, etiqueta de materia, contenido breve y una barra de acciones para facilitar la lectura y el uso.

## Funcionalidades clave

- **Registro de perfil estudiantil:** captura de nombre, carrera, materias seleccionadas e intereses.
- **Feed educativo desplazable:** exploración de apuntes y publicaciones en formato de tarjetas, similar al flujo de una red social.
- **Verificación de veracidad con IA:** análisis del contenido de cada publicación con nivel de confianza y explicación académica.
- **Generación de ejercicios con IA:** creación de preguntas de opción múltiple con retroalimentación a partir del contenido del apunte.
- **Interacción con publicaciones:** acciones para dar *me gusta*, guardar publicaciones y consultar resultados de IA por publicación.
- **Persistencia local:** almacenamiento de usuario, publicaciones y guardados en `localStorage` para conservar el estado entre sesiones.
- **Modo simulado de IA:** lógica preparada para funcionar en modo local simulado y con posibilidad de integrarse a una API externa manteniendo la misma interfaz.

## Estructura de carpetas

```text
/
├── AGENTS.md
├── README.md
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── data.js
    └── ai.js
```

### Descripción de archivos

- `index.html`: punto de entrada y estructura semántica de la interfaz en español.
- `css/styles.css`: estilos principales, estética cyberpunk, responsividad y componentes visuales.
- `js/app.js`: lógica principal, manipulación del DOM, eventos y orquestación de funcionalidades.
- `js/data.js`: modelos, datos de ejemplo y gestión del estado en `localStorage`.
- `js/ai.js`: módulo exclusivo de IA para verificación de veracidad y generación de ejercicios (sin manipulación del DOM).

## Guía rápida para ejecutarlo

### Opción 1: Ejecutar en local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/gitkarenh/inslearns.git
   cd inslearns
   ```
2. **Abre el proyecto:**
   - Opción rápida: abre el archivo `index.html` directamente en tu navegador.
   - Opción recomendada: usa un servidor local estático para evitar restricciones del navegador.

   Con Python 3:
   ```bash
   python3 -m http.server 8000
   ```

   Con Node.js (si tienes `npx`):
   ```bash
   npx serve .
   ```
3. **Accede en el navegador:**
   - Si usaste servidor local: `http://localhost:8000`
   - Si abriste el archivo directamente: verifica que los recursos carguen correctamente.

### Opción 2: Ejecutar en GitHub Codespaces

1. Abre el repositorio en GitHub.
2. Haz clic en **Code** → pestaña **Codespaces** → **Create codespace on main** (o la rama que corresponda).
3. Espera a que el entorno se inicie.
4. En la terminal de Codespaces, inicia un servidor estático:
   ```bash
   python3 -m http.server 8000
   ```
5. Codespaces detectará el puerto y te ofrecerá abrirlo en el navegador (botón **Open in Browser** o pestaña **Ports**).
6. Interactúa con la aplicación desde la vista previa en tu navegador.

## Notas de desarrollo

- Proyecto construido con **HTML5, CSS3 y JavaScript ES6+ puro** (sin frameworks).
- Toda la interfaz, identificadores descriptivos y comentarios deben mantenerse en **español**.
- La lógica de IA debe permanecer en `js/ai.js`, separada de la manipulación del DOM.
- Antes de realizar cambios, revisa las reglas y convenciones definidas en [`AGENTS.md`](AGENTS.md).
