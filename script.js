const targetDate = new Date("2026-01-10T21:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const carousels = [
  {
    track: document.getElementById("carouselTrack"),
    index: 0
  },
  {
    track: document.getElementById("carouselTrack2"),
    index: 0
  }
];

function getVisibleSlides() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function getSlideWidth(track) {
  const slide = track.children[0];
  const gap = parseFloat(getComputedStyle(track).gap);
  return slide.offsetWidth + gap;
}

function moveCarousels() {
  carousels.forEach(carousel => {
    if (!carousel.track) return;

    const slides = carousel.track.children;
    const slideWidth = getSlideWidth(carousel.track);
    carousel.index++;

    if (carousel.index > slides.length - getVisibleSlides()) {
      carousel.index = 0;
    }

    carousel.track.style.transform =
      `translateX(-${carousel.index * slideWidth}px)`;
  });
}

setInterval(moveCarousels, 3000);

function abrirMapa(tipo) {
  const modal = document.getElementById('modalMapa');
  const iframe = document.getElementById('iframeMapa');

  if (tipo === 'ceremonia') {
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.2042141270786!2d-59.33814472531256!3d-35.40018837267926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bdbb8222c61977%3A0xcfce9eea95e6cd60!2sIglesia%20San%20Juan%20Bautista!5e0!3m2!1ses-419!2sar!4v1765826338705!5m2!1ses-419!2sar";
  }

  if (tipo === 'fiesta') {
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.2116767698353!2d-59.33443022531256!3d-35.40000337267929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bdbb7f31d41701%3A0xba692a6481c69a29!2sBomberos%20Voluntarios!5e0!3m2!1ses-419!2sar!4v1765826617720!5m2!1ses-419!2sar"
  }

  modal.style.display = 'flex';
}

function cerrarMapa() {
  const modal = document.getElementById('modalMapa');
  const iframe = document.getElementById('iframeMapa');

  iframe.src = '';
  modal.style.display = 'none';
}

let dia = 1;
const numero = document.getElementById("numeroDia");
const calendario = document.querySelector(".calendario");
let animando = false;

function cicloCalendario() {
  if (animando) return; // evita superposición
  animando = true;

  // 1️⃣ levantar
  calendario.style.transform = "rotate(-14deg)";

  // 2️⃣ caer y golpear
  setTimeout(() => {
    calendario.style.transform = "rotate(0deg)";

    // 3️⃣ correr TODOS los números hasta 31
    correrHasta31();
  }, 500);
}
setTimeout(cicloCalendario, 1000);
function correrHasta31() {
  let tiempoAcumulado = 0;

  while (dia < 31) {
    let delay;

    const r = Math.random();

    if (r < 0.7) {
      // MUY rápido (flash)
      delay = Math.random() * 40 + 20; // 20–60ms
    } else if (r < 0.9) {
      // medio
      delay = Math.random() * 100 + 100; // 100–200ms
    } else {
      // lento (muy pocos)
      delay = Math.random() * 300 + 300; // 300–600ms
    }

    tiempoAcumulado += delay;
    dia++;

    ((valorDia) => {
      setTimeout(() => {
        numero.textContent = valorDia;

        // destacar el 10
        if (valorDia === 10) {
          numero.classList.add("dia-destacado");
          setTimeout(() => {
            numero.classList.remove("dia-destacado");
          }, 600);
        }
      }, tiempoAcumulado);
    })(dia);
  }

 setTimeout(() => {
  // 🔹 volver a posición normal
  calendario.style.transform = "rotate(0deg)";

  dia = 1;
  numero.textContent = dia;
  animando = false;

  setTimeout(cicloCalendario, 1200);
}, tiempoAcumulado + 600);
}

// ===============================
// FORMULARIO – VERSIÓN LIMPIA
// ===============================

// generar invitados
function generarPersonasUI() {
  const container = document.getElementById("personasContainer");
  const selectCantidad = document.getElementById("cantidadPersonas");

  if (!container || !selectCantidad) return;

  const cantidad = selectCantidad.value;
  container.innerHTML = "";

  if (!cantidad) return;

  for (let i = 1; i <= cantidad; i++) {
    container.innerHTML += `
      <div class="campo persona">
        <label class="label">Invitado ${i}</label>
        <input type="text" placeholder="Nombre">
        <input type="text" placeholder="Apellido">
        <select class="restriccion">
          <option value="">Sin restricción</option>
          <option value="Vegetariana">Vegetariana</option>
          <option value="Vegana">Vegana</option>
          <option value="Sin TACC">Sin TACC</option>
        </select>
      </div>
    `;
  }
}

// escuchar cantidad
const cantidadSelect = document.getElementById("cantidadPersonas");
if (cantidadSelect) {
  cantidadSelect.addEventListener("change", generarPersonasUI);
}

// antes de enviar
const form = document.getElementById("asistenciaForm");
if (form) {
  form.addEventListener("submit", function () {
    const personas = document.querySelectorAll(".persona");
    let texto = "";

    personas.forEach((p, i) => {
      const nombre = p.querySelector('input[placeholder="Nombre"]').value;
      const apellido = p.querySelector('input[placeholder="Apellido"]').value;
      const restriccion =
        p.querySelector(".restriccion").value || "Sin restricción";

      texto += `Invitado ${i + 1}: ${nombre} ${apellido} – ${restriccion}\n`;
    });

    const campoFinal = document.getElementById("datosFinales");
    if (campoFinal) {
      campoFinal.value = texto;
    }
  });
}

const mensajeGracias = document.getElementById("mensajeGracias");

if (form && mensajeGracias) {
  form.addEventListener("submit", function () {
    setTimeout(() => {
      form.style.display = "none";
      mensajeGracias.classList.remove("oculto");
    }, 300);
  });
}

// Scroll reveal con Intersection Observer
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // anima una sola vez
      }
    });
  },
  {
    threshold: 0.25, // cuánto tiene que verse para animar
  }
);

reveals.forEach((el) => observer.observe(el));

// ===============================
// MÚSICA
// ===============================

const audio = document.getElementById("musica");
const musicBtn = document.getElementById("musicToggle");

if (audio && musicBtn) {
  // arrancar música automáticamente
  audio.play().then(() => {
    musicBtn.textContent = "❚❚";
  }).catch(() => {
    // por si algún navegador bloquea, queda en pausa
    musicBtn.textContent = "▶";
    musicBtn.classList.add("paused");
  });

  let isPlaying = true;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      musicBtn.textContent = "▶";
      musicBtn.classList.add("paused");
    } else {
      audio.play();
      musicBtn.textContent = "❚❚";
      musicBtn.classList.remove("paused");
    }
    isPlaying = !isPlaying;
  });
}





