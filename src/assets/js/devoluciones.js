// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    const openFormBtn = document.getElementById("openAddForm");
    const closeFormBtn = document.getElementById("closeForm");
    const formContainer = document.querySelector(".add-edit-form-container");
    const form = document.querySelector(".add-edit-form");

    // Simulación de datos por ID de préstamo (ejemplo)
    const prestamos = {
        "P-001": { libro: "El Señor de los Anillos", estudiante: "Ana Pérez" },
        "P-002": { libro: "Harry Potter y la Piedra Filosofal", estudiante: "Juan García" },
        "P-005": { libro: "1984", estudiante: "Sofía Martínez" }
    };

    // Abrir formulario
    openFormBtn.addEventListener("click", () => {
        formContainer.style.display = "block";
    });

    // Cerrar formulario
    closeFormBtn.addEventListener("click", () => {
        formContainer.style.display = "none";
        form.reset();
    });

    // Autocompletar datos según ID de préstamo
    const prestamoID = document.getElementById("prestamoID");
    const libroDevuelto = document.getElementById("libroDevuelto");
    const estudianteDevuelve = document.getElementById("estudianteDevuelve");

    prestamoID.addEventListener("input", () => {
        const valor = prestamoID.value.trim();
        if (prestamos[valor]) {
            libroDevuelto.value = prestamos[valor].libro;
            estudianteDevuelve.value = prestamos[valor].estudiante;
        } else {
            libroDevuelto.value = "";
            estudianteDevuelve.value = "";
        }
    });

    // Validación del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fecha = document.getElementById("fechaDevolucion").value;
        const estado = document.getElementById("estadoDevolucion").value;

        if (!prestamoID.value || !libroDevuelto.value || !estudianteDevuelve.value || !fecha || !estado) {
            alert("⚠️ Por favor, complete todos los campos obligatorios.");
            return;
        }

        // Simular registro (en un caso real, aquí iría una petición al backend)
        alert(`✅ Devolución registrada con éxito:
- ID Préstamo: ${prestamoID.value}
- Libro: ${libroDevuelto.value}
- Estudiante: ${estudianteDevuelve.value}
- Fecha: ${fecha}
- Estado: ${estado}`);

        form.reset();
        formContainer.style.display = "none";
    });
});
