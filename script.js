/* ============================================================
   BARRA ARRASTRABLE – VOLVER ARRIBA
   ============================================================ */
(function () {
  const dragBar = document.createElement("div");
  dragBar.id = "dragBar";
  dragBar.textContent = "⬆";
  document.body.appendChild(dragBar);

  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  dragBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - dragBar.offsetLeft;
    offsetY = e.clientY - dragBar.offsetTop;
    dragBar.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    dragBar.style.left = `${e.clientX - offsetX}px`;
    dragBar.style.top = `${e.clientY - offsetY}px`;
    dragBar.style.right = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    dragBar.style.cursor = "grab";
  });

  dragBar.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();


/* ============================================================
   SLIDER DE TEMA (LIGHT / DARK)
   ============================================================ */
(function () {
  const themeSlider = document.createElement("div");
  themeSlider.id = "themeSlider";

  const handle = document.createElement("div");
  handle.id = "sliderHandle";

  themeSlider.appendChild(handle);
  document.body.appendChild(themeSlider);

  let dragging = false;
  let startX = 0;

  handle.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    let delta = e.clientX - startX;
    delta = Math.max(0, Math.min(80, delta));
    handle.style.left = `${delta}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;

    const pos = parseInt(handle.style.left) || 0;
    const dark = pos > 40;

    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    handle.style.left = dark ? "80px" : "0px";
  });

  // Aplicar tema guardat
  const saved = localStorage.getItem("theme");
  const dark = saved === "dark";
  document.body.classList.toggle("dark-mode", dark);
  handle.style.left = dark ? "80px" : "0px";
})();


/* ============================================================
   VALIDACIÓN FORMULARIO
   ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

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
  });
})();


/* ============================================================
   PARTÍCULAS – UNA SOLA IMPLEMENTACIÓN OPTIMIZADA
   ============================================================ */
(function () {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const NUM = 120;
  const mouse = { x: null, y: null, radius: 150 };

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
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

      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          this.x += dx / 50;
          this.y += dy / 50;
        }
      }

      this.draw();
    }
  }

  for (let i = 0; i < NUM; i++) particles.push(new Particle());

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => p.update());

    // Líneas entre partículas
    for (let i = 0; i < NUM; i++) {
      for (let j = i + 1; j < NUM; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

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
})();


/* ============================================================
   CONTADOR DE TIEMPO EN PÁGINA (UNIFICADO)
   ============================================================ */
(function () {
  const timerSpan = document.querySelector("#pageTimer .pt-time");
  if (!timerSpan) return;

  const key = "pageTimerMs";
  const saved = sessionStorage.getItem(key);
  let baseMs = saved ? parseInt(saved) : 0;
  let start = performance.now();

  function update() {
    const elapsed = baseMs + (performance.now() - start);
    const total = Math.floor(elapsed / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    timerSpan.textContent =
      h > 0
        ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    requestAnimationFrame(update);
  }
  update();

  window.addEventListener("beforeunload", () => {
    const current = baseMs + (performance.now() - start);
    sessionStorage.setItem(key, String(current));
  });
})();
