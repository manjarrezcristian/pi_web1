// Archivo principal de la aplicación
// Contiene la lógica principal y la inicialización de componentes

/**
 * Inicializa la aplicación principal
 */
export function initApp() {
    console.log('Inicializando aplicación de Biblioteca Virtual...');
    
    // Configurar el tema de la aplicación
    setupTheme();
    
    // Inicializar componentes principales
    initComponents();
    
    // Configurar eventos globales
    setupGlobalEvents();
}

/**
 * Configura el tema de la aplicación
 */
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Crear selector de tema si no existe
    if (!document.getElementById('theme-toggle')) {
        createThemeToggle();
    }
}

/**
 * Crea el selector de tema
 */
function createThemeToggle() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'btn btn-outline-secondary ms-2';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Cambiar tema';
        
        themeToggle.addEventListener('click', toggleTheme);
        navbar.appendChild(themeToggle);
    }
}

/**
 * Cambia entre tema claro y oscuro
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
    }
}

/**
 * Inicializa los componentes principales
 */
function initComponents() {
    // Inicializar carrusel si existe
    initCarousel();
    
    // Inicializar navegación
    initNavigation();
    
    // Inicializar formularios
    initForms();
}

/**
 * Inicializa el carrusel de libros
 */
function initCarousel() {
    const carousel = document.getElementById('carouselExample');
    if (carousel) {
        // Configuración del carrusel
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
        
        console.log('Carrusel inicializado');
    }
}

/**
 * Inicializa la navegación
 */
function initNavigation() {
    // Marcar enlace activo en la navegación
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Inicializa los formularios
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

/**
 * Maneja el envío de formularios
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Datos del formulario:', data);
    
    // Aquí se implementará la lógica de envío
    // Por ahora solo mostramos en consola
}

/**
 * Configura eventos globales
 */
function setupGlobalEvents() {
    // Evento para scroll suave en enlaces internos
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Evento para mostrar/ocultar botón de volver arriba
    window.addEventListener('scroll', () => {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        }
    });
}

// Exportar funciones para uso en otros módulos
export { setupTheme, toggleTheme, initComponents };
