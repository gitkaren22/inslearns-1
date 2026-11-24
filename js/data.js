// Gestión de datos, modelos y persistencia local para Inslearns

const CLAVE_USUARIO = 'inslearns_user';
const CLAVE_PUBLICACIONES = 'inslearns_posts';
const CLAVE_GUARDADOS = 'inslearns_saved';

// Crea un objeto Usuario con el esquema definido
function crearUsuarioBase() {
  return {
    nombre: '',
    carrera: '',
    materiasSeleccionadas: [],
    intereses: []
  };
}

// Convierte un texto separado por comas en una lista limpia
function convertirTextoALista(texto) {
  if (!texto) {
    return [];
  }
  return texto
    .split(',')
    .map((elemento) => elemento.trim())
    .filter((elemento) => elemento.length > 0);
}

// Obtiene el usuario almacenado o un usuario base
function obtenerUsuario() {
  const datos = localStorage.getItem(CLAVE_USUARIO);
  if (!datos) {
    return crearUsuarioBase();
  }
  try {
    return { ...crearUsuarioBase(), ...JSON.parse(datos) };
  } catch (error) {
    return crearUsuarioBase();
  }
}

// Guarda el objeto Usuario en localStorage
function guardarUsuario(usuario) {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
}

// Diagramas SVG por publicación para apoyo visual en Matemáticas
const DIAGRAMAS_POR_PUBLICACION = {
  'mat-1': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gráfica de una recta"><rect width="200" height="120" fill="#081018"/><line x1="20" y1="100" x2="180" y2="100" stroke="#00f0ff" stroke-width="2"/><line x1="40" y1="110" x2="40" y2="10" stroke="#00f0ff" stroke-width="2"/><line x1="40" y1="90" x2="170" y2="25" stroke="#ff00e6" stroke-width="3"/><circle cx="40" cy="90" r="4" fill="#ffee00"/><circle cx="105" cy="57" r="4" fill="#39ff14"/><text x="145" y="20" fill="#e6f7ff" font-size="12">y = 2x + 1</text></svg>',
  'mat-2': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triángulo rectángulo"><rect width="200" height="120" fill="#081018"/><polygon points="40,95 150,95 40,25" fill="rgba(0,240,255,0.15)" stroke="#00f0ff" stroke-width="3"/><rect x="40" y="85" width="10" height="10" fill="none" stroke="#ffee00" stroke-width="2"/><text x="90" y="110" fill="#39ff14" font-size="12">b</text><text x="20" y="65" fill="#39ff14" font-size="12">a</text><text x="100" y="55" fill="#ff00e6" font-size="12">c</text><text x="120" y="20" fill="#e6f7ff" font-size="12">a² + b² = c²</text></svg>',
  'mat-3': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Círculo unitario"><rect width="200" height="120" fill="#081018"/><circle cx="90" cy="60" r="38" fill="none" stroke="#00f0ff" stroke-width="2"/><line x1="45" y1="60" x2="135" y2="60" stroke="#39ff14" stroke-width="2"/><line x1="90" y1="15" x2="90" y2="105" stroke="#39ff14" stroke-width="2"/><line x1="90" y1="60" x2="120" y2="35" stroke="#ff00e6" stroke-width="3"/><circle cx="120" cy="35" r="4" fill="#ffee00"/><text x="140" y="30" fill="#e6f7ff" font-size="11">(cos θ, sen θ)</text></svg>',
  'mat-4': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Curva y tangente"><rect width="200" height="120" fill="#081018"/><path d="M20 95 Q70 90 90 70 T170 20" fill="none" stroke="#00f0ff" stroke-width="3"/><line x1="55" y1="95" x2="140" y2="35" stroke="#ffee00" stroke-width="2"/><circle cx="95" cy="66" r="4" fill="#ff00e6"/><text x="110" y="85" fill="#39ff14" font-size="12">tangente</text><text x="130" y="18" fill="#e6f7ff" font-size="12">f(x)</text></svg>',
  'mat-5': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama de barras"><rect width="200" height="120" fill="#081018"/><line x1="25" y1="100" x2="185" y2="100" stroke="#00f0ff" stroke-width="2"/><rect x="40" y="55" width="20" height="45" fill="#ff00e6"/><rect x="75" y="35" width="20" height="65" fill="#00f0ff"/><rect x="110" y="65" width="20" height="35" fill="#ffee00"/><rect x="145" y="45" width="20" height="55" fill="#39ff14"/><text x="35" y="115" fill="#e6f7ff" font-size="11">Datos y promedio</text></svg>'
};

// Devuelve el diagrama SVG asociado a una publicación
function obtenerDiagramaPorId(idPublicacion) {
  return DIAGRAMAS_POR_PUBLICACION[idPublicacion] || '';
}

// Colección inicial de publicaciones de matemáticas con apoyo visual
const PUBLICACIONES_INICIALES = [
  {
    id: 'mat-1',
    autor: 'Profe Lina',
    materia: 'Álgebra',
    titulo: 'Ecuaciones lineales en la vida diaria',
    contenido: 'Una ecuación lineal como y = 2x + 1 modela relaciones con cambio constante; su gráfica es una recta y la pendiente indica cuánto crece y por cada unidad de x.',
    veracidad: null,
    ejercicio: null,
    likes: 14,
    guardado: false
  },
  {
    id: 'mat-2',
    autor: 'Marco Ríos',
    materia: 'Geometría',
    titulo: 'Teorema de Pitágoras',
    contenido: 'En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: a² + b² = c². Es clave para calcular distancias.',
    veracidad: null,
    ejercicio: null,
    likes: 21,
    guardado: false
  },
  {
    id: 'mat-3',
    autor: 'Sara Núñez',
    materia: 'Trigonometría',
    titulo: 'Seno y coseno en el círculo unitario',
    contenido: 'En el círculo unitario, un ángulo θ define un punto (cos θ, sen θ). Esta relación conecta ángulos con coordenadas y ayuda a entender ondas y rotaciones.',
    veracidad: null,
    ejercicio: null,
    likes: 17,
    guardado: false
  },
  {
    id: 'mat-4',
    autor: 'Diego Vega',
    materia: 'Cálculo',
    titulo: 'La derivada como pendiente',
    contenido: 'La derivada de una función en un punto representa la pendiente de la recta tangente a la curva. Permite analizar cambios instantáneos y optimizar situaciones.',
    veracidad: null,
    ejercicio: null,
    likes: 19,
    guardado: false
  },
  {
    id: 'mat-5',
    autor: 'Valeria Cruz',
    materia: 'Estadística',
    titulo: 'Media aritmética y lectura de datos',
    contenido: 'La media aritmética resume un conjunto de datos dividiendo la suma total entre la cantidad de valores. Los diagramas de barras facilitan comparar frecuencias.',
    veracidad: null,
    ejercicio: null,
    likes: 11,
    guardado: false
  }
];

// Devuelve una copia de las publicaciones iniciales de ejemplo
function obtenerPublicacionesIniciales() {
  return PUBLICACIONES_INICIALES.map((publicacion) => ({ ...publicacion }));
}

// Obtiene publicaciones desde localStorage o inicializa ejemplos
function obtenerPublicaciones() {
  const datos = localStorage.getItem(CLAVE_PUBLICACIONES);
  if (!datos) {
    const iniciales = obtenerPublicacionesIniciales();
    guardarPublicaciones(iniciales);
    return iniciales;
  }
  try {
    return JSON.parse(datos);
  } catch (error) {
    const iniciales = obtenerPublicacionesIniciales();
    guardarPublicaciones(iniciales);
    return iniciales;
  }
}

// Guarda la colección de publicaciones
function guardarPublicaciones(publicaciones) {
  localStorage.setItem(CLAVE_PUBLICACIONES, JSON.stringify(publicaciones));
}

// Obtiene la información de publicaciones guardadas
function obtenerGuardados() {
  const datos = localStorage.getItem(CLAVE_GUARDADOS);
  if (!datos) {
    localStorage.setItem(CLAVE_GUARDADOS, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(datos);
  } catch (error) {
    localStorage.setItem(CLAVE_GUARDADOS, JSON.stringify([]));
    return [];
  }
}

// Guarda la información de publicaciones guardadas
function guardarGuardados(guardados) {
  localStorage.setItem(CLAVE_GUARDADOS, JSON.stringify(guardados));
}
