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

// Colección inicial de publicaciones de ejemplo
const PUBLICACIONES_INICIALES = [
  {
    id: 'pub-1',
    autor: 'Ana Torres',
    materia: 'Biología',
    titulo: 'La fotosíntesis en plantas',
    contenido: 'La fotosíntesis transforma luz solar, agua y CO2 en glucosa y oxígeno dentro de los cloroplastos.',
    veracidad: null,
    ejercicio: null,
    likes: 12,
    guardado: false
  },
  {
    id: 'pub-2',
    autor: 'Luis Rivas',
    materia: 'Historia',
    titulo: 'Causas de la Revolución Francesa',
    contenido: 'La crisis económica, la desigualdad social y las ideas ilustradas impulsaron cambios políticos en Francia en 1789.',
    veracidad: null,
    ejercicio: null,
    likes: 8,
    guardado: false
  },
  {
    id: 'pub-3',
    autor: 'Marta Díaz',
    materia: 'Programación',
    titulo: 'Qué es una variable en JavaScript',
    contenido: 'Una variable almacena datos que pueden reutilizarse; en ES6 se declaran con let y const según su mutabilidad.',
    veracidad: null,
    ejercicio: null,
    likes: 15,
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
