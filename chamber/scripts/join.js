// join.js

// Reutilizamos tu función, pero movemos el listener de cierre fuera.
function openModal(texto) {
  const info = document.getElementById("modal-info");
  const dialog = document.getElementById("theDetails");
  info.textContent = texto;
  dialog.showModal();
}

// Validador (dejamos tu regex tal cual)
const re = new RegExp("[A-Za-z\\s-]{7,}");
function testInfo(title) {
  const ok = re.test(title.value);
  if (!ok) {
    alert("Title section only accept alpha characters, hyphens, and spaces with a minimum of seven characters.");
    title.focus();
  }
  return ok;
}

// Conectamos eventos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // 1) Cerrar modal (una vez, sin duplicar handlers)
  const dialog = document.getElementById("theDetails");
  const closeBtn = document.getElementById("closeModal");
  if (closeBtn && dialog) {
    closeBtn.addEventListener("click", () => dialog.close());
  }

  // 2) Botones "LEARN MORE" — usando data-info
  document.querySelectorAll("button.learn-more").forEach((btn) => {
    const text = btn.getAttribute("data-info") || "";
    btn.addEventListener("click", () => openModal(text));
  });

  // 3) (Opcional) Validación del campo "Organization Title" al perder el foco
  const titleInput = document.querySelector('input[name="title"]');
  if (titleInput) {
    titleInput.addEventListener("blur", () => testInfo(titleInput));
  }

  // 4) Marcar timestamp en el submit
  const ts = document.getElementById("timestamp");
  const form = document.querySelector("form.join-form");
  if (form && ts) {
    form.addEventListener("submit", () => {
      ts.value = new Date().toISOString();
    });
  }
});
``