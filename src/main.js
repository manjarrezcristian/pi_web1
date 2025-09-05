// Archivo principal de JavaScript para la Biblioteca Virtual
// Este archivo será el punto de entrada para toda la funcionalidad

// Importaciones de módulos
import { initApp } from './scripts/app.js';
import { setupEventListeners } from './scripts/events.js';
import { loadUserPreferences } from './utils/preferences.js';

// Función principal que se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Biblioteca Virtual - Inicializando aplicación...');
    
    try {
        // Inicializar la aplicación
        initApp();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Cargar preferencias del usuario
        loadUserPreferences();
        
        console.log('Aplicación inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});

// Exportar funciones principales para uso en otros módulos
export { initApp, setupEventListeners };
