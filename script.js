const API_URL = "http://localhost:8000/api/eventos";
const API_PARTICIPANTES = "http://localhost:8000/api/participantes";
let idEventoActual = null;
let eventosCargados = [];
let participantesCargados = [];



// Crear un nuevo evento
function crearEvento() {
  const titulo = document.getElementById("titulo").value;
  const fecha = document.getElementById("fecha").value;
  const lugar = document.getElementById("lugar").value;
  
  if (!titulo || !fecha || !lugar) return alert("Todos los campos son obligatorios");
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, fecha, lugar })
  })
    .then(async res => {
      const data = await res.json();
      console.log("RESPUESTA", data);
      alert("Evento creado con éxito");
      obtenerEventos();

      // Limpiar inputs después de crear
      document.getElementById("titulo").value = "";
      document.getElementById("fecha").value = "";
      document.getElementById("lugar").value = "";
    })
    .catch(err => {
      console.error("Error en crearEvento:", err);
      alert("Error al crear evento");
    });
}

// Obtener todos los eventos
function obtenerEventos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => mostrarEventos(data))
    .catch(err => console.error("Error al obtener eventos", err));
}

function formatearFecha(fechaISO) {
  const [año, mes, dia] = fechaISO.split("T")[0].split("-");
  return `${dia}/${mes}/${año}`;
}

// Mostrar eventos en tabla
function mostrarEventos(eventos) {
  eventosCargados = eventos; // guardo en variable global
  const tabla = document.getElementById("tabla-eventos");
  tabla.innerHTML = "";

  eventos.forEach(ev => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${ev.titulo}</td>
      <td>${formatearFecha(ev.fecha)}</td>
      <td>${ev.lugar}</td>
      <td>
        <button onclick="editarEvento('${ev._id}')">✏️</button>
        <button onclick="borrarEvento('${ev._id}')">🗑️</button>
      </td>
    `;

    tabla.appendChild(fila);
  });
}

// Borrar evento
function borrarEvento(id) {
  if (!confirm("¿Estás seguro de eliminar este evento?")) return;

  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      alert("Evento eliminado");
      obtenerEventos();
    })
    .catch(err => {
      console.error("Error al borrar", err);
      alert("Error al borrar evento");
    });
}

// Abrir modal de edición con datos precargados
function editarEvento(id) {
  const evento = eventosCargados.find(ev => ev._id === id);
  if (!evento) return alert("Evento no encontrado");

  idEventoActual = id;

  document.getElementById("edit-titulo").value = evento.titulo;
  document.getElementById("edit-fecha").value = evento.fecha;
  document.getElementById("edit-lugar").value = evento.lugar;

  document.getElementById("modal-editar").style.display = "flex";
}

// Confirmar edición desde el modal
function confirmarEdicion() {
  const titulo = document.getElementById("edit-titulo").value;
  const fecha = document.getElementById("edit-fecha").value;
  const lugar = document.getElementById("edit-lugar").value;

  fetch(`${API_URL}/${idEventoActual}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, fecha, lugar })
  })
    .then(res => res.json())
    .then(data => {
      alert("Evento editado con éxito");
      cerrarModal();
      obtenerEventos();
    })
    .catch(err => {
      console.error("Error al editar", err);
      alert("Error al editar evento");
    });
}

// Cerrar el modal
function cerrarModal() {
  document.getElementById("modal-editar").style.display = "none";
}

function mostrarSeccion(seccion) {
  const eventos = document.getElementById("seccion-eventos");
  const participantes = document.getElementById("seccion-participantes");

  if (seccion === "eventos") {
    eventos.style.display = "block";
    participantes.style.display = "none";
  } else {
    eventos.style.display = "none";
    participantes.style.display = "block";
    cargarOpcionesEventos(); // Esto llena el select de eventos
  }
}




function mostrarParticipantes(participantes) {
  participantesCargados = participantes;
  const tabla = document.getElementById("tabla-participantes");
  tabla.innerHTML = "";

  participantes.forEach(p => {
    const evento = eventosCargados.find(e => e._id === p.eventoId);
    const nombreEvento = evento ? evento.titulo : "Evento no encontrado";

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.email}</td>
      <td>${nombreEvento}</td>
      <td>
        <button onclick="editarParticipante('${p._id}')">✏️</button>
        <button onclick="borrarParticipante('${p._id}')">🗑️</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function obtenerParticipantes() {
  fetch("http://localhost:8000/api/participantes")
    .then(res => res.json())
    .then(data => mostrarParticipantes(data))
    .catch(err => console.error("Error al cargar participantes", err));
}

// Crear participante
function crearParticipante() {
  const nombre = document.getElementById("nombreParticipante").value;
  const email = document.getElementById("emailParticipante").value;
  const eventoId = document.getElementById("eventoParticipante").value;

  if (!nombre || !email || !eventoId) return alert("Todos los campos son obligatorios");

  fetch(API_PARTICIPANTES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, eventoId })
  })
    .then(res => res.json())
    .then(data => {
      alert("Participante creado con éxito");
      document.getElementById("nombreParticipante").value = "";
      document.getElementById("emailParticipante").value = "";
      document.getElementById("eventoParticipante").value = "";
      obtenerParticipantes();
    })
    .catch(err => {
      console.error("Error al crear participante", err);
      alert("Error al crear participante");
    });
}

let idParticipanteActual = null;

function editarParticipante(id) {
  const participante = participantesCargados.find(p => p._id === id);
  if (!participante) return alert("Participante no encontrado");

  idParticipanteActual = id;

  // Cargar valores
  document.getElementById("edit-nombreParticipante").value = participante.nombre;
  document.getElementById("edit-emailParticipante").value = participante.email;
  document.getElementById("edit-eventoParticipante").value = participante.eventoId;

  // Mostrar modal
  document.getElementById("modal-editar-participante").style.display = "flex";
}
function cerrarModalParticipante() {
  document.getElementById("modal-editar-participante").style.display = "none";
}

// Editar participante desde modal
function confirmarEdicionParticipante() {
  const nombre = document.getElementById("edit-nombreParticipante").value;
  const email = document.getElementById("edit-emailParticipante").value;
  const eventoId = document.getElementById("edit-eventoParticipante").value;

  fetch(`http://localhost:8000/api/participantes/${idParticipanteActual}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, eventoId })
  })
    .then(res => res.json())
    .then(data => {
      alert("Participante editado con éxito");
      cerrarModalParticipante();
      obtenerParticipantes();
    })
    .catch(err => {
      console.error("Error al editar participante", err);
      alert("Error al editar participante");
    });
}

function borrarParticipante(id) {
  if (!confirm("¿Seguro que querés borrar este participante?")) return;

  fetch(`http://localhost:8000/api/participantes/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      alert("Participante eliminado");
      obtenerParticipantes();
    })
    .catch(err => {
      console.error("Error al borrar participante", err);
      alert("Error al borrar participante");
    });
}

// Cargar eventos en los selects de participantes
function cargarOpcionesEventos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      eventosCargados = data;

      const select = document.getElementById("eventoParticipante");
      const selectEditar = document.getElementById("edit-eventoParticipante");

      // Limpiar opciones anteriores
      select.innerHTML = '<option value="">Seleccione un evento</option>';
      selectEditar.innerHTML = '<option value="">Seleccione un evento</option>';

      // Cargar nuevas opciones
      data.forEach(ev => {
        const option = document.createElement("option");
        option.value = ev._id;
        option.textContent = ev.titulo;

        const option2 = option.cloneNode(true);
        select.appendChild(option);
        selectEditar.appendChild(option2);
      });
    })
    .catch(err => console.error("Error al cargar eventos para el dropdown", err));
}