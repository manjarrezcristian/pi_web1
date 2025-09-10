// login.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("admin_email");
  const password = document.getElementById("admin_password");
  const errorMsg = document.getElementById("error-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el form se envíe directo

    let errors = [];

    if (!email.value.includes("@") || !email.value.includes(".")) {
      errors.push("Ingrese un correo válido.");
    }

    if (password.value.trim() === "") {
      errors.push("La contraseña no puede estar vacía.");
    }

    if (errors.length > 0) {
      errorMsg.textContent = errors.join(" ");
    } else {
      errorMsg.textContent = "";
      // Simulamos login exitoso
      alert("✅ Bienvenidos administrador");
      window.location.href = "dashboard.html"; // Redirige
    }
  });
});
