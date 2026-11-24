# AGENTS.md — Inslearns

## Rol del agente

Eres un agente de desarrollo para **Inslearns**, una red social educativa con estilo visual inspirado en Instagram, orientada al aprendizaje. Tu función es diseñar, implementar y mantener la aplicación priorizando:

- **Experiencia educativa:** publicación y consumo de contenido didáctico en formato visual y claro.
- **Verificación de veracidad:** inclusión de mecanismos y señales que ayuden a validar la confiabilidad de la información compartida.
- **Ejercicios generados por IA:** generación y presentación de actividades o ejercicios personalizados a partir del contenido publicado.

Debes producir soluciones funcionales, coherentes con el propósito educativo del proyecto y fáciles de mantener.

## Stack permitido

- **HTML5** para la estructura y semántica del contenido.
- **CSS3** para los estilos, el diseño visual y la responsividad.
- **JavaScript ES6+ puro** (Vanilla JS) para la lógica de la aplicación.

**Restricciones:**
- No utilizar frameworks ni librerías pesadas (por ejemplo: React, Angular, Vue, Svelte, jQuery, Bootstrap, Tailwind, etc.).
- No incorporar dependencias externas salvo que sean estrictamente necesarias y se justifique explícitamente; por defecto, la solución debe funcionar con tecnologías web nativas.
- Priorizar código modular, legible y mantenible dentro del stack permitido.

## Estructura de archivos obligatoria

El proyecto debe respetar la siguiente estructura mínima:

```text
/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── data.js
    └── ai.js
```

**Responsabilidades de cada archivo:**
- `index.html`: punto de entrada de la aplicación; define la estructura semántica de la interfaz.
- `css/styles.css`: hoja de estilos principal de la interfaz.
- `js/app.js`: lógica principal de la aplicación, interacción con la interfaz y orquestación de funcionalidades.
- `js/data.js`: definición y gestión de datos, modelos, contenido de ejemplo o fuentes de información utilizadas por la aplicación.
- `js/ai.js`: lógica relacionada con la verificación de veracidad y la generación de ejercicios mediante IA (o su simulación/integración definida en el proyecto).

No alterar esta estructura base sin una instrucción explícita del usuario.

## Regla estricta de idioma

- Toda la **interfaz de usuario** debe estar escrita en **español** (textos visibles, etiquetas, botones, mensajes, placeholders, etc.).
- Todos los **nombres de variables descriptivas**, funciones, constantes y otros identificadores cuyo propósito sea comunicarse en el código deben estar en **español** y ser claros.
- Todos los **comentarios** del código deben estar escritos en **español**.
- Se permite el uso de términos técnicos inevitables en inglés únicamente cuando no exista una alternativa razonable (por ejemplo, nombres de APIs o propiedades estándar del lenguaje), pero la explicación y el contexto deben mantenerse en español.

## Reglas de Diseño e Interfaz (UI/UX)

- **Enfoque mobile-first:** diseñar priorizando dispositivos móviles, con un contenedor centrado y un ancho máximo de **480px** en escritorio para simular una aplicación móvil.
- **Tarjetas limpias y jerarquía visual clara:** presentar el contenido en tarjetas que muestren, de forma ordenada, el **autor**, la **etiqueta de materia**, el **contenido breve** y una **barra de acciones**.
- **Paleta moderna y buen contraste:** utilizar una paleta de colores moderna que garantice legibilidad y un contraste adecuado entre texto y fondo.
- **Sin estilos en línea:** evitar el uso de estilos en línea dentro del HTML; todos los estilos deben definirse en `css/styles.css`.

## Estructura de Datos y Estado

Para garantizar consistencia en el proyecto, se deben respetar exactamente los siguientes esquemas y nombres. No inventar propiedades ni claves distintas en futuros cambios.

### Objeto `Usuario`

Propiedades exactas:

- `nombre`
- `carrera`
- `materiasSeleccionadas`
- `intereses`

Ejemplo de esquema:

```js
{
  nombre: "",
  carrera: "",
  materiasSeleccionadas: [],
  intereses: []
}
```

### Objeto `Publicacion`

Propiedades exactas:

- `id`
- `autor`
- `materia`
- `titulo`
- `contenido`
- `veracidad`
- `ejercicio`
- `likes`
- `guardado`

Ejemplo de esquema:

```js
{
  id: "",
  autor: "",
  materia: "",
  titulo: "",
  contenido: "",
  veracidad: null,
  ejercicio: null,
  likes: 0,
  guardado: false
}
```

### Claves de `localStorage`

Usar únicamente estas claves exactas:

- `inslearns_user`: almacena el objeto `Usuario`.
- `inslearns_posts`: almacena la colección/listado de objetos `Publicacion`.
- `inslearns_saved`: almacena la información de publicaciones guardadas.

## Directrices del Módulo de IA

- Toda la lógica relacionada con inteligencia artificial debe vivir **exclusivamente** en `js/ai.js`.
- `js/ai.js` debe mantenerse **separado de la manipulación del DOM**: no debe acceder a elementos de la interfaz ni modificarlos directamente. La interacción con la vista corresponde a `js/app.js`.
- Las funciones del módulo deben estar preparadas para funcionar tanto en **modo simulado local** como conectadas a una **API externa**, manteniendo la misma interfaz de entrada y salida. Cuando sea necesario para la integración con una API, pueden implementarse como funciones asíncronas (por ejemplo, devolviendo una `Promise`).

### Funciones obligatorias

#### `verificarVeracidad(post)`

- **Entrada:** recibe un objeto `post` con la estructura de `Publicacion`.
- **Responsabilidad:** evaluar el rigor del tema/contenido de la publicación.
- **Salida:** debe devolver un objeto con, al menos, las siguientes propiedades:
  - `nivelConfianza`: nivel de confianza del análisis.
  - `explicacionAcademica`: explicación académica breve que justifique el resultado.

Ejemplo de salida:

```js
{
  nivelConfianza: "",
  explicacionAcademica: ""
}
```

#### `generarEjercicio(post)`

- **Entrada:** recibe un objeto `post` con la estructura de `Publicacion`.
- **Responsabilidad:** generar un ejercicio de aprendizaje basado en el contenido de la publicación.
- **Salida:** debe devolver un objeto con, al menos, las siguientes propiedades:
  - `pregunta`: enunciado de una pregunta de opción múltiple.
  - `opciones`: arreglo con las opciones de respuesta.
  - `indiceCorrecto`: índice de la opción correcta dentro de `opciones`.
  - `retroalimentacion`: explicación o retroalimentación asociada a la respuesta correcta.

Ejemplo de salida:

```js
{
  pregunta: "",
  opciones: [],
  indiceCorrecto: 0,
  retroalimentacion: ""
}
```

## Flujo de Trabajo y Restricciones

- **Lectura previa obligatoria:** antes de modificar cualquier archivo, el agente debe leer las secciones previas de `AGENTS.md` para respetar el rol, el stack, la estructura, las reglas de idioma, el diseño, los esquemas de datos y las directrices del módulo de IA.
- **Preservación de funcionalidades:** al agregar nuevas funcionalidades, no se deben borrar ni romper las funcionalidades existentes; cualquier cambio debe integrarse de forma compatible con el comportamiento ya implementado.
- **Funciones cortas y mantenibles:** mantener las funciones cortas, con una extensión máxima de **30-40 líneas por función**, favoreciendo la claridad, la modularidad y la reutilización.
- **Verificación final:** comprobar que no existan errores en la consola del navegador ni enlaces rotos entre `index.html` y los scripts u otros recursos referenciados por la aplicación.
