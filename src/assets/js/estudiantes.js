// estudiantes.js
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("studentsTable").getElementsByTagName("tbody")[0];

  // Buscar estudiantes
  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const rows = table.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {
      const cells = row.getElementsByTagName("td");
      const text = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
      row.style.display = text.includes(filter) ? "" : "none";
    });
  });

  // Botones de editar y eliminar
  table.addEventListener("click", (e) => {
    if (e.target.closest(".edit")) {
      alert("✏️ Editar estudiante (aquí podrías abrir un formulario).");
    }

    if (e.target.closest(".delete")) {
      const row = e.target.closest("tr");
      const nombre = row.cells[2].textContent;
      if (confirm(`¿Seguro que deseas eliminar a ${nombre}?`)) {
        row.remove();
        alert(`✅ Estudiante ${nombre} eliminado.`);
      }
    }
  });
});
