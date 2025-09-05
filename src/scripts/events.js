// Archivo de manejo de eventos
// Contiene todos los event listeners y la lógica de interacción

/**
 * Configura todos los event listeners de la aplicación
 */
export function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Event listeners para navegación
    setupNavigationEvents();
    
    // Event listeners para formularios
    setupFormEvents();
    
    // Event listeners para botones
    setupButtonEvents();
    
    // Event listeners para carrusel
    setupCarouselEvents();
    
    // Event listeners para búsqueda
    setupSearchEvents();
}

/**
 * Configura eventos de navegación
 */
function setupNavigationEvents() {
    // Toggle del menú móvil
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            console.log('Menú móvil toggleado');
        });
    }
    
    // Enlaces de navegación
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase active al enlace clickeado
            e.target.classList.add('active');
        });
    });
}

/**
 * Configura eventos de formularios
 */
function setupFormEvents() {
    // Validación en tiempo real
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Envío de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
}

/**
 * Valida un campo individual
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    
    // Remover errores previos
    clearFieldError(event);
    
    // Validaciones básicas
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${fieldName} es requerido`);
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Email inválido');
        return false;
    }
    
    if (field.type === 'password' && value && value.length < 6) {
        showFieldError(field, 'La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    return true;
}

/**
 * Muestra error en un campo
 */
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    
    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
}

/**
 * Limpia error de un campo
 */
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Maneja el envío de formularios
 */
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validar todos los campos
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        console.log('Formulario inválido');
        return;
    }
    
    // Procesar formulario
    console.log('Datos del formulario:', data);
    
    // Aquí se implementará la lógica de envío
    // Por ahora solo mostramos en consola
    
    // Mostrar mensaje de éxito
    showSuccessMessage(form, 'Formulario enviado correctamente');
}

/**
 * Muestra mensaje de éxito
 */
function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3';
    successDiv.textContent = message;
    
    form.appendChild(successDiv);
    
    // Remover mensaje después de 3 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

/**
 * Configura eventos de botones
 */
function setupButtonEvents() {
    // Botones de acción
    const actionButtons = document.querySelectorAll('.btn-action');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButton);
    });
    
    // Botones de dropdown
    const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', handleDropdownToggle);
    });
}

/**
 * Maneja botones de acción
 */
function handleActionButton(event) {
    const button = event.target;
    const action = button.dataset.action;
    
    console.log(`Acción ejecutada: ${action}`);
    
    switch (action) {
        case 'login':
            handleLogin();
            break;
        case 'register':
            handleRegister();
            break;
        case 'search':
            handleSearch();
            break;
        default:
            console.log('Acción no reconocida:', action);
    }
}

/**
 * Maneja el toggle de dropdowns
 */
function handleDropdownToggle(event) {
    const button = event.target;
    const dropdown = button.nextElementSibling;
    
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
        dropdown.classList.toggle('show');
    }
}

/**
 * Configura eventos del carrusel
 */
function setupCarouselEvents() {
    const carousel = document.getElementById('carouselExample');
    if (carousel) {
        carousel.addEventListener('slide.bs.carousel', (event) => {
            console.log(`Carrusel cambiando a slide ${event.to}`);
        });
        
        carousel.addEventListener('slid.bs.carousel', (event) => {
            console.log(`Carrusel cambió a slide ${event.to}`);
        });
    }
}

/**
 * Configura eventos de búsqueda
 */
function setupSearchEvents() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearchInput, 300));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

/**
 * Maneja la entrada de búsqueda
 */
function handleSearchInput(event) {
    const query = event.target.value.trim();
    console.log('Búsqueda en tiempo real:', query);
    
    // Aquí se implementará la búsqueda en tiempo real
}

/**
 * Ejecuta la búsqueda
 */
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const query = searchInput.value.trim();
        console.log('Ejecutando búsqueda:', query);
        
        // Aquí se implementará la lógica de búsqueda
    }
}

/**
 * Función de debounce para optimizar búsquedas
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Funciones placeholder para acciones principales
function handleLogin() {
    console.log('Manejando login...');
    // Implementar lógica de login
}

function handleRegister() {
    console.log('Manejando registro...');
    // Implementar lógica de registro
}

function handleSearch() {
    console.log('Manejando búsqueda...');
    // Implementar lógica de búsqueda
}

// Exportar funciones para uso en otros módulos
export { 
    validateField, 
    showFieldError, 
    clearFieldError, 
    handleFormSubmission,
    debounce 
};
