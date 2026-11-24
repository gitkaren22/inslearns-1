// Lógica principal de la aplicación: interfaz, eventos y orquestación

let seccionActual = 'feed';

function obtenerElemento(id) {
  return document.getElementById(id);
}

// Muestra u oculta la barra de navegación inferior
function mostrarNavegacion(mostrar) {
  obtenerElemento('barra-navegacion').classList.toggle('oculto', !mostrar);
}

// Marca el botón activo en la navegación
function actualizarNavegacionActiva(seccion) {
  const botones = obtenerElemento('barra-navegacion').querySelectorAll('.boton-nav');
  botones.forEach((boton) => {
    boton.classList.toggle('activo', boton.dataset.seccion === seccion);
  });
}

// Muestra el feed con una transición suave
function mostrarFeedConTransicion() {
  const feed = obtenerElemento('seccion-feed');
  feed.classList.remove('oculto');
  feed.classList.remove('feed-visible');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => feed.classList.add('feed-visible'));
  });
}

// Muestra una sección principal de la app
function mostrarSeccionPrincipal(seccion, conTransicion) {
  seccionActual = seccion;
  const feed = obtenerElemento('seccion-feed');
  const cuaderno = obtenerElemento('seccion-cuaderno');
  feed.classList.toggle('oculto', seccion !== 'feed');
  cuaderno.classList.toggle('oculto', seccion !== 'cuaderno');
  actualizarNavegacionActiva(seccion);
  renderizarVistaActual();
  if (seccion === 'feed' && conTransicion) {
    mostrarFeedConTransicion();
    return;
  }
  if (seccion === 'feed') {
    feed.classList.add('feed-visible');
  }
}

// Muestra la pantalla de registro y oculta la app
function mostrarRegistro() {
  obtenerElemento('seccion-registro').classList.remove('oculto');
  obtenerElemento('seccion-feed').classList.add('oculto');
  obtenerElemento('seccion-cuaderno').classList.add('oculto');
  obtenerElemento('seccion-feed').classList.remove('feed-visible');
  cerrarModalPublicar();
  mostrarNavegacion(false);
}

// Limpia la selección activa de un grupo de chips
function limpiarChips(idGrupo) {
  const chips = obtenerElemento(idGrupo).querySelectorAll('.chip');
  chips.forEach((chip) => chip.classList.remove('chip-activo'));
}

// Activa chips según una lista de valores guardados
function activarChipsGuardados(idGrupo, valores) {
  const chips = obtenerElemento(idGrupo).querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.classList.toggle('chip-activo', valores.includes(chip.dataset.valor));
  });
}

// Rellena el formulario con los datos del usuario
function cargarUsuarioEnFormulario(usuario) {
  obtenerElemento('campo-nombre').value = usuario.nombre || '';
  obtenerElemento('campo-carrera').value = usuario.carrera || '';
  limpiarChips('grupo-materias');
  limpiarChips('grupo-intereses');
  activarChipsGuardados('grupo-materias', usuario.materiasSeleccionadas || []);
  activarChipsGuardados('grupo-intereses', usuario.intereses || []);
}

// Obtiene los valores seleccionados en un grupo de chips
function obtenerValoresChips(idGrupo) {
  const chipsActivos = obtenerElemento(idGrupo).querySelectorAll('.chip-activo');
  return Array.from(chipsActivos).map((chip) => chip.dataset.valor);
}

// Construye un objeto Usuario desde el formulario
function leerUsuarioDesdeFormulario() {
  return {
    nombre: obtenerElemento('campo-nombre').value.trim(),
    carrera: obtenerElemento('campo-carrera').value.trim(),
    materiasSeleccionadas: obtenerValoresChips('grupo-materias'),
    intereses: obtenerValoresChips('grupo-intereses')
  };
}

// Actualiza el resumen del perfil en el feed
function mostrarResumenPerfil(usuario) {
  const resumen = obtenerElemento('resumen-perfil');
  const materias = usuario.materiasSeleccionadas.join(', ') || 'Sin materias';
  resumen.textContent = `${usuario.nombre} · ${usuario.carrera} · Materias: ${materias}`;
}

// Abre el modal para publicar un nuevo apunte
function abrirModalPublicar() {
  obtenerElemento('modal-publicar').classList.remove('oculto');
}

// Cierra el modal de publicación
function cerrarModalPublicar() {
  const modal = obtenerElemento('modal-publicar');
  if (modal) {
    modal.classList.add('oculto');
  }
}

// Genera un identificador único para una publicación
function generarIdPublicacion() {
  return `pub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Crea un objeto Publicacion desde el formulario de publicación
function crearPublicacionDesdeFormulario() {
  const usuario = obtenerUsuario();
  return {
    id: generarIdPublicacion(),
    autor: usuario.nombre || 'Estudiante',
    materia: obtenerElemento('campo-materia-publicar').value,
    titulo: obtenerElemento('campo-titulo-publicar').value.trim(),
    contenido: obtenerElemento('campo-contenido-publicar').value.trim(),
    veracidad: null,
    ejercicio: null,
    likes: 0,
    guardado: false
  };
}

// Guarda un nuevo apunte y lo agrega al inicio del feed
function manejarEnvioPublicacion(evento) {
  evento.preventDefault();
  const publicaciones = obtenerPublicaciones();
  const nuevaPublicacion = crearPublicacionDesdeFormulario();
  publicaciones.unshift(nuevaPublicacion);
  guardarPublicaciones(publicaciones);
  evento.target.reset();
  cerrarModalPublicar();
  mostrarSeccionPrincipal('feed');
}

// Guarda el perfil y muestra la app con transición
function manejarEnvioRegistro(evento) {
  evento.preventDefault();
  const usuario = leerUsuarioDesdeFormulario();
  guardarUsuario(usuario);
  mostrarResumenPerfil(usuario);
  obtenerElemento('seccion-registro').classList.add('oculto');
  mostrarNavegacion(true);
  mostrarSeccionPrincipal('feed', true);
}

// Alterna el estado activo de un chip interactivo
function manejarClicChip(evento) {
  const chip = evento.target.closest('.chip');
  if (chip) {
    chip.classList.toggle('chip-activo');
  }
}

// Busca una publicación por id en la colección
function buscarPublicacion(publicaciones, idPublicacion) {
  return publicaciones.find((publicacion) => publicacion.id === idPublicacion);
}

// Sincroniza la lista de guardados con el estado actual
function sincronizarGuardados(guardados, idPublicacion, estaGuardado) {
  const indice = guardados.indexOf(idPublicacion);
  if (estaGuardado && indice === -1) {
    guardados.push(idPublicacion);
  }
  if (!estaGuardado && indice !== -1) {
    guardados.splice(indice, 1);
  }
}

// Renderiza la vista activa (feed o cuaderno)
function renderizarVistaActual() {
  if (seccionActual === 'cuaderno') {
    renderizarCuaderno();
    return;
  }
  renderizarPublicaciones();
}

// Actualiza likes y estado guardado de una publicación
function actualizarInteraccion(idPublicacion, tipo) {
  const publicaciones = obtenerPublicaciones();
  const guardados = obtenerGuardados();
  const publicacion = buscarPublicacion(publicaciones, idPublicacion);
  if (!publicacion) {
    return;
  }
  if (tipo === 'like') {
    publicacion.likes += 1;
  }
  if (tipo === 'guardar') {
    publicacion.guardado = !publicacion.guardado;
    sincronizarGuardados(guardados, idPublicacion, publicacion.guardado);
  }
  guardarPublicaciones(publicaciones);
  guardarGuardados(guardados);
  renderizarVistaActual();
}

// Crea el HTML del resultado de veracidad
function crearHtmlVeracidad(veracidad) {
  if (!veracidad) {
    return '';
  }
  return `<div class="resultado-ia"><h4>Veracidad</h4>
    <p><strong>Nivel de confianza:</strong> ${veracidad.nivelConfianza}</p>
    <p>${veracidad.explicacionAcademica}</p></div>`;
}

// Crea el HTML del ejercicio generado
function crearHtmlEjercicio(ejercicio) {
  if (!ejercicio) {
    return '';
  }
  const opciones = ejercicio.opciones.map((opcion, indice) => {
    const clase = indice === ejercicio.indiceCorrecto ? 'opcion-correcta' : '';
    return `<li class="${clase}">${opcion}</li>`;
  }).join('');
  return `<div class="resultado-ia"><h4>Ejercicio</h4>
    <p><strong>Pregunta:</strong> ${ejercicio.pregunta}</p>
    <ol class="lista-opciones">${opciones}</ol>
    <p><strong>Retroalimentación:</strong> ${ejercicio.retroalimentacion}</p></div>`;
}

// Crea la tarjeta HTML de una publicación
function crearTarjetaPublicacion(publicacion) {
  const textoGuardar = publicacion.guardado ? 'Guardado' : 'Guardar';
  const claseGuardar = publicacion.guardado ? 'boton-accion activo' : 'boton-accion';
  return `<article class="tarjeta-publicacion" data-id="${publicacion.id}">
    <div class="cabecera-tarjeta">
      <h3 class="autor-publicacion">${publicacion.autor}</h3>
      <span class="etiqueta-materia">${publicacion.materia}</span>
    </div>
    <h4 class="titulo-publicacion">${publicacion.titulo}</h4>
    <p class="contenido-publicacion">${publicacion.contenido}</p>
    <div class="barra-acciones">
      <button class="boton-accion" data-accion="like">Me gusta (${publicacion.likes})</button>
      <button class="${claseGuardar}" data-accion="guardar">${textoGuardar}</button>
      <button class="boton-accion" data-accion="verificar">Verificar veracidad</button>
      <button class="boton-accion" data-accion="ejercicio">Generar ejercicio</button>
    </div>
    ${crearHtmlVeracidad(publicacion.veracidad)}
    ${crearHtmlEjercicio(publicacion.ejercicio)}
  </article>`;
}

// Renderiza una lista de publicaciones en un contenedor
function renderizarListaPublicaciones(idContenedor, publicaciones, mensajeVacio) {
  const contenedor = obtenerElemento(idContenedor);
  if (!publicaciones.length) {
    contenedor.innerHTML = `<p class="mensaje-vacio">${mensajeVacio}</p>`;
    return;
  }
  contenedor.innerHTML = publicaciones.map(crearTarjetaPublicacion).join('');
}

// Renderiza todas las publicaciones en el feed
function renderizarPublicaciones() {
  renderizarListaPublicaciones('contenedor-publicaciones', obtenerPublicaciones(), 'No hay publicaciones disponibles.');
}

// Filtra publicaciones guardadas según el texto ingresado
function filtrarGuardados(publicaciones, filtro) {
  const termino = filtro.trim().toLowerCase();
  if (!termino) {
    return publicaciones;
  }
  return publicaciones.filter((publicacion) => {
    const materia = (publicacion.materia || '').toLowerCase();
    const titulo = (publicacion.titulo || '').toLowerCase();
    return materia.includes(termino) || titulo.includes(termino);
  });
}

// Renderiza las publicaciones guardadas en el cuaderno
function renderizarCuaderno() {
  const filtro = obtenerElemento('filtro-cuaderno').value || '';
  const guardadas = obtenerPublicaciones().filter((publicacion) => publicacion.guardado);
  const filtradas = filtrarGuardados(guardadas, filtro);
  const mensaje = guardadas.length ? 'No hay resultados para el filtro.' : 'Aún no tienes apuntes guardados.';
  renderizarListaPublicaciones('contenedor-guardados', filtradas, mensaje);
}

// Ejecuta la verificación de IA y actualiza la publicación
async function procesarVeracidad(idPublicacion) {
  const publicaciones = obtenerPublicaciones();
  const publicacion = buscarPublicacion(publicaciones, idPublicacion);
  if (!publicacion) {
    return;
  }
  publicacion.veracidad = await verificarVeracidad(publicacion);
  guardarPublicaciones(publicaciones);
  renderizarVistaActual();
}

// Ejecuta la generación de ejercicio y actualiza la publicación
async function procesarEjercicio(idPublicacion) {
  const publicaciones = obtenerPublicaciones();
  const publicacion = buscarPublicacion(publicaciones, idPublicacion);
  if (!publicacion) {
    return;
  }
  publicacion.ejercicio = await generarEjercicio(publicacion);
  guardarPublicaciones(publicaciones);
  renderizarVistaActual();
}

// Maneja los clics de acciones dentro de tarjetas
function manejarAccionPublicacion(evento) {
  const boton = evento.target.closest('button[data-accion]');
  const tarjeta = evento.target.closest('.tarjeta-publicacion');
  if (!boton || !tarjeta) {
    return;
  }
  const accion = boton.dataset.accion;
  const idPublicacion = tarjeta.dataset.id;
  if (accion === 'like' || accion === 'guardar') {
    actualizarInteraccion(idPublicacion, accion);
  }
  if (accion === 'verificar') {
    procesarVeracidad(idPublicacion);
  }
  if (accion === 'ejercicio') {
    procesarEjercicio(idPublicacion);
  }
}

// Maneja la navegación inferior
function manejarNavegacion(evento) {
  const boton = evento.target.closest('.boton-nav');
  if (!boton) {
    return;
  }
  const seccion = boton.dataset.seccion;
  if (seccion === 'publicar') {
    abrirModalPublicar();
    return;
  }
  mostrarSeccionPrincipal(seccion);
}

// Muestra el feed directamente sin animación inicial
function mostrarFeedDirecto() {
  obtenerElemento('seccion-registro').classList.add('oculto');
  obtenerElemento('seccion-cuaderno').classList.add('oculto');
  const feed = obtenerElemento('seccion-feed');
  feed.classList.remove('oculto');
  feed.classList.add('feed-visible');
}

// Configura eventos principales de la interfaz
function configurarEventos() {
  obtenerElemento('formulario-registro').addEventListener('submit', manejarEnvioRegistro);
  obtenerElemento('boton-editar-perfil').addEventListener('click', mostrarRegistro);
  obtenerElemento('contenedor-publicaciones').addEventListener('click', manejarAccionPublicacion);
  obtenerElemento('contenedor-guardados').addEventListener('click', manejarAccionPublicacion);
  obtenerElemento('grupo-materias').addEventListener('click', manejarClicChip);
  obtenerElemento('grupo-intereses').addEventListener('click', manejarClicChip);
  obtenerElemento('barra-navegacion').addEventListener('click', manejarNavegacion);
  obtenerElemento('boton-cerrar-modal').addEventListener('click', cerrarModalPublicar);
  obtenerElemento('formulario-publicar').addEventListener('submit', manejarEnvioPublicacion);
  obtenerElemento('filtro-cuaderno').addEventListener('input', renderizarCuaderno);
}

// Inicializa la aplicación según el estado guardado
function iniciarAplicacion() {
  const usuario = obtenerUsuario();
  cargarUsuarioEnFormulario(usuario);
  configurarEventos();
  const tienePerfil = usuario.nombre && usuario.carrera;
  if (tienePerfil) {
    mostrarResumenPerfil(usuario);
    mostrarNavegacion(true);
    seccionActual = 'feed';
    actualizarNavegacionActiva('feed');
    renderizarVistaActual();
    mostrarFeedDirecto();
  } else {
    mostrarRegistro();
  }
}

document.addEventListener('DOMContentLoaded', iniciarAplicacion);
