// Configura tus regalos con fechas específicas (una por semana)
const regalos = [
  { id: 1, nombre: "Regalo Semana 1 🎁", fecha: "2025-11-11" },
  { id: 2, nombre: "Regalo Semana 2 🎁", fecha: "2025-11-18" },
  { id: 3, nombre: "Regalo Semana 3 🎁", fecha: "2025-11-25" },
  { id: 4, nombre: "Regalo Semana 4 🎁", fecha: "2025-12-02" },
  { id: 5, nombre: "Regalo Semana 5 🎁", fecha: "2025-12-09" },
  { id: 6, nombre: "Regalo Semana 6 🎁", fecha: "2025-12-16" },
  { id: 7, nombre: "Regalo Semana 6 🎁", fecha: "2025-12-17" },
  { id: 8, nombre: "Regalo Semana 6 🎁", fecha: "2025-12-18" }
];

const calendario = document.getElementById("calendario");
const contador = document.getElementById("contador");

// Función para crear los cuadrados
function crearCalendario() {
  calendario.innerHTML = "";
  const hoy = new Date();

  regalos.forEach(regalo => {
    const fechaApertura = new Date(regalo.fecha);
    const caja = document.createElement("div");
    caja.classList.add("caja");

    if (hoy >= fechaApertura) {
      caja.textContent = regalo.nombre;
      caja.addEventListener("click", () => abrirRegalo(regalo));
    } else {
      caja.classList.add("bloqueada");
      caja.textContent = "🔒";
    }

    calendario.appendChild(caja);
  });
}

// Función para mostrar mensaje al abrir regalo
function abrirRegalo(regalo) {
  alert(`🎉 Has abierto: ${regalo.nombre}!`);
  const cajas = document.querySelectorAll(".caja");
  cajas[regalo.id - 1].classList.add("abierta");
}

// Función para mostrar temporizador hacia el próximo regalo
function actualizarContador() {
  const hoy = new Date();
  const proximo = regalos.find(r => new Date(r.fecha) > hoy);

  if (!proximo) {
    contador.textContent = "¡Todos los regalos están disponibles! 🎄";
    return;
  }

  const tiempoRestante = new Date(proximo.fecha) - hoy;

  const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tiempoRestante / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((tiempoRestante / (1000 * 60)) % 60);
  const segundos = Math.floor((tiempoRestante / 1000) % 60);

  contador.textContent = `⏳ Próximo regalo disponible en: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

// Inicialización
crearCalendario();
actualizarContador();
setInterval(actualizarContador, 1000);