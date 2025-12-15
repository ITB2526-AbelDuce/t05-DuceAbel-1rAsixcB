/* ====== BOTÓN VOLVER ARRIBA ====== */
const btnTop = document.createElement("button");
btnTop.id = "btnTop";
btnTop.textContent = "⬆";
btnTop.title = "Volver arriba";
document.body.appendChild(btnTop);

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 200) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ====== MODO OSCURO / CLARO ====== */
const toggleBtn = document.createElement("button");
toggleBtn.id = "toggleTheme";
toggleBtn.textContent = "🌙 Cambiar tema";
document.body.insertBefore(toggleBtn, document.body.firstChild);

// Al cargar la página, aplicar preferencia guardada
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Alternar y guardar preferencia
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Cambiar tema";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Cambiar tema";
  }
});

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
