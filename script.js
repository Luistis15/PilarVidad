const gifts  = [
  {
    id: 1,
    title: "Regalo Semana 1 🎁",
    unlockDate: "2025-11-11T18:00:00",
    content: `
      <h2>🎉 ¡Primer regalo desbloqueado!</h2>
      <p>Empieza la aventura vamos a bailar con la Vaquita Paquita que nos da calorcito en la tripita </p>
      <a href=https://www.youtube.com/watch?v=Cff5rfmaAMM>La vaca lechera.</a>
      <p>-----</p>
      <img src="images/vaca.jpg" alt="Primer regalo">
    `
  },
  {
    id: 2,
    title: "Regalo Semana 2 🎁",
    unlockDate: "2025-11-11T18:00:00",
    content: `
      <h2>🌈 Colores colorcitos</h2>
      <p>Si quieres ver el mundo en tonos y flores, abre este regalo: ¡un diccionario de colores!</p>
      <a href=https://youtu.be/Nby3UZRylok>Marisol - Tómbola </a>
      <p>-----</p>
      <img src="images/disccionarioDeColores.jpg" alt="Librito">
    `
  },
  {
    id: 3,
    title: "Regalo Semana 3 🎁",
    unlockDate: "2025-11-13T22:01:00",
    content: `
      <h2>👜 Bolsito de para no perder las cositas</h2>
      <p>“Dentro caben secretos y brillo especial, adivina, adivina… ¿qué regalo tan genial?.”</p>
      <a href=https://youtu.be/yKDTBNUEBrI>María Escarmiento - Bolso Valentino</a>
      <p>-----</p>
      <img src="images/bolsito.jpg" alt="Bolsito">
    `
  },
  {
    id: 4,
    title: "Regalo Semana 4 🎁",
    unlockDate: "2025-11-22T00:00:00",
    content: `
      <h2>🎞️📷 Fotitos</h2>
      <p>Fotos fotitos, para que tengas los mejores recuedor amano bien bonitos🫶🫶</p>
      <a href=https://youtu.be/v9T_MGfzq7I?si=pvVUJN77ajre0zTT>BadBunny - DtMf </a>
      <p>-----</p>
      <img src="images/fotitos.jpeg" alt="Librito">
    `
  },
  {
    id: 5,
    title: "Regalo Semana 5 🎁",
    unlockDate: "2025-11-29T15:00:00",
    content: `
      <h2>🎬 Mini sorpresa</h2>
      <video controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Tu navegador no soporta video.
      </video>
    `
  },
  {
    id: 6,
    title: "Regalo Semana 6 🎁",
    unlockDate: "2025-12-16T18:00:00",
    content: `
      <h2>🎄 ¡Felices fiestas!</h2>
      <p>Gracias por acompañarnos todo este adviento. ¡Feliz Navidad!</p>
      <img src="https://picsum.photos/400/200?random=6" alt="Regalo final">
    `
  }
];

const calendar = document.getElementById('calendar');

// Crear los regalos
gifts.forEach((gift, i) => {
  const div = document.createElement('div');
  div.classList.add('gift');
  div.textContent = `🎁 ${gift.title}`;
  div.dataset.index = i;
  calendar.appendChild(div);
});

function updateGifts() {
  const now = new Date();

  document.querySelectorAll('.gift').forEach(giftEl => {
    const gift = gifts[giftEl.dataset.index];
    const unlockTime = new Date(gift.unlockDate);

    if (now >= unlockTime) {
      giftEl.classList.remove('locked');
      giftEl.onclick = () => openModal(gift.content);
    } else {
      giftEl.classList.add('locked');
      const timeLeft = Math.floor((unlockTime - now) / 1000);
      const days = Math.floor(timeLeft / (3600*24));
      const hours = Math.floor((timeLeft % (3600*24)) / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      giftEl.textContent = `🔒 ${gift.title}\n(${days}d ${hours}h ${minutes}m)`;
      giftEl.onclick = null;
    }
  });
}

function openModal(content) {
  const modal = document.getElementById('giftModal');
  const giftContent = document.getElementById('giftContent');
  giftContent.innerHTML = content;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('giftModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Actualiza cada 30 segundos
updateGifts();
setInterval(updateGifts, 30000);
