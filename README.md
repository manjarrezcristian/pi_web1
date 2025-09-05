# 📚 Proyecto: Sistema de Gestión de Biblioteca

Este proyecto consiste en un sistema sencillo para gestionar préstamos y devoluciones de libros. El usuario debe iniciar sesión con sus credenciales y podrá interactuar con un menú de opciones que permite realizar préstamos, devoluciones y consultas de libros.

---

## 🚀 Características principales

1. **Acceso con credenciales**
- El usuario debe ingresar usuario y contraseña.
- Solo se permiten **3 intentos** de acceso. Si los agota, se bloquea el ingreso.

2. **Menú de opciones**
- Realizar un préstamo de libro.
- Realizar una devolución de libro.
- Consultar préstamos activos.
- Consultar libros disponibles.
- Salir del sistema.

3. **Préstamo de libro**
- El usuario debe escoger una **categoría de libro**.
- Luego selecciona el libro que desea prestar.
- Validación: el usuario no puede prestar dos veces el mismo libro.

4. **Devolución de libro**
- El usuario escoge la categoría.
- Luego selecciona el libro que desea devolver.
- Validación: no es posible devolver un libro que no se tenga prestado.

5. **Consulta de préstamos activos**
- El sistema muestra los libros actualmente prestados por el usuario.

6. **Consulta de libros disponibles**
- El usuario escoge la categoría que quiere consultar.
- El sistema muestra el estado de los libros: **disponible** o **prestado**.

---

## 📂 Estructura del proyecto

- `index.html` → Interfaz principal del sistema.
- `info.json` → Archivo de datos que puede contener información de libros y usuarios.
- `README.md` → Documentación del proyecto.

---

## 🛠️ Requisitos

- Navegador web actualizado (para ejecutar el HTML).
- Editor de texto recomendado: VS Code, Sublime Text o similar.

---

## ▶️ Ejecución

1. Clonar o descargar este repositorio.
2. Abrir el archivo `index.html` en un navegador.
3. Iniciar sesión con las credenciales asignadas.
4. Navegar por el menú de opciones.

---
