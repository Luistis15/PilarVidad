const regalos = [
  {
    id: 1,
    nombre: "Regalo Semana 1 🎁",
    fecha: "2025-11-11",
    contenido: `
      <h2>🎉 ¡Primer regalo desbloqueado!</h2>
      <p>Empieza la aventura vamos a bailar con la Vaquita Paquita que nos da calorcito en la tripita </p>
      <a href=https://www.youtube.com/watch?v=Cff5rfmaAMM>La vaca lechera.</a>
      <p>-----</p>
      <img src="images/vaca.jpg" alt="Primer regalo">
    `
  },
  {
    id: 2,
    nombre: "Regalo Semana 2 🎁",
    fecha: "2025-11-11",
    contenido: `
      <h2>🌈 Colores colorcitos</h2>
      <p>Si quieres ver el mundo en tonos y flores, abre este regalo: ¡un diccionario de colores!</p>
      <a href=https://youtu.be/Nby3UZRylok>Marisol - Tómbola </a>
      <p>-----</p>
      <img src="images/disccionarioDeColores.jpg" alt="Primer regalo">
    `
  },
  {
    id: 3,
    nombre: "Regalo Semana 3 🎁",
    fecha: "2025-11-16",
    contenido: `
      <h2>📜 Mensaje motivador</h2>
      <p>“No hay mejor época que la Navidad para agradecer lo que tenemos.”</p>
    `
  },
  {
    id: 4,
    nombre: "Regalo Semana 4 🎁",
    fecha: "2025-12-02",
    contenido: `
      <h2>🎶 Música navideña</h2>
      <audio controls>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
        Tu navegador no soporta audio.
      </audio>
    `
  },
  {
    id: 5,
    nombre: "Regalo Semana 5 🎁",
    fecha: "2025-12-09",
    contenido: `
      <h2>🎬 Mini sorpresa</h2>
      <video controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Tu navegador no soporta video.
      </video>
    `
  },
  {
    id: 6,
    nombre: "Regalo Semana 6 🎁",
    fecha: "2025-12-16",
    contenido: `
      <h2>🎄 ¡Felices fiestas!</h2>
      <p>Gracias por acompañarnos todo este adviento. ¡Feliz Navidad!</p>
      <img src="https://picsum.photos/400/200?random=6" alt="Regalo final">
    `
  }
];

const calendario = document.getElementById("calendario");
const contador = document.getElementById("contador");
const modal = document.getElementById("modal");
const contenidoModal = document.getElementById("contenido-regalo");
const cerrarModal = document.querySelector(".cerrar");

// Crear los cuadros del calendario
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

// Abrir modal con contenido
function abrirRegalo(regalo) {
  contenidoModal.innerHTML = regalo.contenido;
  modal.style.display = "block";
}

// Cerrar modal
cerrarModal.onclick = () => (modal.style.display = "none");
window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

// Temporizador
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

  contador.textContent = `⏳⚱💨📦​ Próximo regalo en: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

// Iniciar
crearCalendario();
actualizarContador();
setInterval(actualizarContador, 1000);
