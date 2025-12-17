/* ====== BARRA ARRASTRABLE VOLVER ARRIBA ====== */
const dragBar = document.createElement("div");
dragBar.id = "dragBar";
dragBar.textContent = "⬆"; // contenido de la barra
document.body.appendChild(dragBar);

let isDraggingBar = false;
let offsetXBar, offsetYBar;

dragBar.addEventListener("mousedown", (e) => {
  isDraggingBar = true;
  offsetXBar = e.clientX - dragBar.getBoundingClientRect().left;
  offsetYBar = e.clientY - dragBar.getBoundingClientRect().top;
  dragBar.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDraggingBar) {
    dragBar.style.left = e.clientX - offsetXBar + "px";
    dragBar.style.top = e.clientY - offsetYBar + "px";
    dragBar.style.right = "auto"; // desactiva el right fijo
  }
});

document.addEventListener("mouseup", () => {
  isDraggingBar = false;
  dragBar.style.cursor = "grab";
});

// Al hacer clic en la barra, volver arriba
dragBar.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ====== BARRA DESLIZABLE PARA CAMBIAR TEMA ====== */
const themeSlider = document.createElement("div");
themeSlider.id = "themeSlider";

const sliderHandle = document.createElement("div");
sliderHandle.id = "sliderHandle";

themeSlider.appendChild(sliderHandle);
document.body.appendChild(themeSlider);

let isDraggingHandle = false;
let startX;

sliderHandle.addEventListener("mousedown", (e) => {
  isDraggingHandle = true;
  startX = e.clientX;
});

document.addEventListener("mousemove", (e) => {
  if (isDraggingHandle) {
    let delta = e.clientX - startX;
    if (delta < 0) delta = 0;
    if (delta > 80) delta = 80;
    sliderHandle.style.left = delta + "px";
  }
});

document.addEventListener("mouseup", () => {
  if (isDraggingHandle) {
    isDraggingHandle = false;
    if (parseInt(sliderHandle.style.left) > 40) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      sliderHandle.style.left = "80px";
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      sliderHandle.style.left = "0px";
    }
  }
});

// Al cargar la página, aplicar preferencia guardada
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  sliderHandle.style.left = "80px";
} else {
  sliderHandle.style.left = "0px";
}


/* ====== VALIDACIÓN FORMULARIO ====== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const email = form.querySelector("input[type='email']");
      const name = form.querySelector("input[name='name']");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name && !name.value.trim()) {
        alert("Por favor, introduce tu nombre.");
        e.preventDefault();
      } else if (email && !emailRegex.test(email.value)) {
        alert("Introduce un correo válido.");
        e.preventDefault();
      }
    });
  }
});

/* ====== ANIMACIÓN DE PARTÍCULAS ====== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 80;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.dx = (Math.random() - 0.5) * 1.5;
    this.dy = (Math.random() - 0.5) * 1.5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0077ff"; // color minimalista
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // rebote en bordes
    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    this.draw();
  }
}

// inicializar partículas
for (let i = 0; i < numParticles; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y));
}

// animación
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());

  // dibujar líneas entre partículas cercanas
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,119,255,0.2)";
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();

// ajustar tamaño al cambiar ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ====== FONDO DE PARTÍCULAS ====== */
(function() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particleArray = [];
  const numParticles = 120;
  const particleMouse = { x: null, y: null, radius: 150 };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.dx = (Math.random() - 0.5) * 1.5;
      this.dy = (Math.random() - 0.5) * 1.5;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0077ff";
      ctx.fill();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

      // efecto imán
      if (particleMouse.x && particleMouse.y) {
        let dx = particleMouse.x - this.x;
        let dy = particleMouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < particleMouse.radius) {
          this.x += dx / 50;
          this.y += dy / 50;
        }
      }

      this.draw();
    }
  }

  // inicializar partículas
  for (let i = 0; i < numParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach(p => p.update());

    // líneas entre partículas
    for (let i = 0; i < particleArray.length; i++) {
      for (let j = i + 1; j < particleArray.length; j++) {
        let dx = particleArray[i].x - particleArray[j].x;
        let dy = particleArray[i].y - particleArray[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(0,119,255,0.2)";
          ctx.moveTo(particleArray[i].x, particleArray[i].y);
          ctx.lineTo(particleArray[j].x, particleArray[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();

  // ratón solo para partículas
  window.addEventListener("mousemove", (e) => {
    particleMouse.x = e.clientX;
    particleMouse.y = e.clientY;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();

/* ====== CONTADOR DE TIEMPO EN PÁGINA (ENCAPSULADO) ====== */
(function () {
  const timerEl = document.querySelector("#pageTimer .pt-time");
  if (!timerEl) return;

  let elapsedMs = 0;
  let ticking = false;
  let lastTick = 0;
  let rafId = null;

  function format(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return h > 0
      ? `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`
      : `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function tick(now) {
    if (!ticking) return;
    if (!lastTick) lastTick = now;
    const delta = now - lastTick;
    lastTick = now;
    elapsedMs += delta;
    timerEl.textContent = format(elapsedMs);
    rafId = requestAnimationFrame(tick);
  }

  function resume() {
    if (ticking) return;
    ticking = true;
    lastTick = 0;
    rafId = requestAnimationFrame(tick);
  }

  function pause() {
    ticking = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Iniciar y pausar según visibilidad
  resume();
  document.addEventListener("visibilitychange", () => document.hidden ? pause() : resume());
  window.addEventListener("blur", pause);
  window.addEventListener("focus", resume);

  // Limpieza al salir
  window.addEventListener("beforeunload", pause);
})();

/* Mantener tiempo si navegas dentro del sitio */
(function () {
  const key = "pageTimerMs";
  const saved = sessionStorage.getItem(key);
  const timerSpan = document.querySelector("#pageTimer .pt-time");
  if (!timerSpan) return;

  let baseMs = saved ? parseInt(saved) : 0;
  let start = performance.now();

  function update() {
    const elapsed = baseMs + (performance.now() - start);
    const totalSeconds = Math.floor(elapsed / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    timerSpan.textContent = h > 0
      ? `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`
      : `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    requestAnimationFrame(update);
  }
  update();

  window.addEventListener("beforeunload", () => {
    const current = baseMs + (performance.now() - start);
    sessionStorage.setItem(key, String(current));
  });
})();







