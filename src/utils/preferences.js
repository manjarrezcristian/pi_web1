// Archivo de utilidades para preferencias del usuario
// Maneja el almacenamiento y recuperación de configuraciones del usuario

/**
 * Clase para manejar las preferencias del usuario
 */
class UserPreferences {
    constructor() {
        this.storageKey = 'biblioteca_virtual_preferences';
        this.defaultPreferences = {
            theme: 'light',
            language: 'es',
            notifications: true,
            autoSave: true,
            searchHistory: [],
            favoriteBooks: [],
            readingProgress: {},
            uiPreferences: {
                fontSize: 'medium',
                showImages: true,
                compactMode: false
            }
        };
        
        this.preferences = this.loadPreferences();
    }
    
    /**
     * Carga las preferencias guardadas o usa las predeterminadas
     */
    loadPreferences() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Fusionar con preferencias predeterminadas para nuevas opciones
                return this.mergePreferences(this.defaultPreferences, parsed);
            }
        } catch (error) {
            console.error('Error al cargar preferencias:', error);
        }
        
        return { ...this.defaultPreferences };
    }
    
    /**
     * Guarda las preferencias en localStorage
     */
    savePreferences() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Error al guardar preferencias:', error);
            return false;
        }
    }
    
    /**
     * Fusiona preferencias existentes con nuevas
     */
    mergePreferences(defaultPrefs, savedPrefs) {
        const merged = { ...defaultPrefs };
        
        for (const key in savedPrefs) {
            if (savedPrefs.hasOwnProperty(key)) {
                if (typeof savedPrefs[key] === 'object' && !Array.isArray(savedPrefs[key])) {
                    merged[key] = this.mergePreferences(merged[key] || {}, savedPrefs[key]);
                } else {
                    merged[key] = savedPrefs[key];
                }
            }
        }
        
        return merged;
    }
    
    /**
     * Obtiene una preferencia específica
     */
    get(key, defaultValue = null) {
        const keys = key.split('.');
        let value = this.preferences;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && value.hasOwnProperty(k)) {
                value = value[k];
            } else {
                return defaultValue;
            }
        }
        
        return value;
    }
    
    /**
     * Establece una preferencia específica
     */
    set(key, value) {
        const keys = key.split('.');
        let current = this.preferences;
        
        // Navegar hasta el penúltimo nivel
        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!current[k] || typeof current[k] !== 'object') {
                current[k] = {};
            }
            current = current[k];
        }
        
        // Establecer el valor en el último nivel
        current[keys[keys.length - 1]] = value;
        
        // Guardar automáticamente
        this.savePreferences();
        
        return true;
    }
    
    /**
     * Cambia el tema de la aplicación
     */
    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.set('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
            return true;
        }
        return false;
    }
    
    /**
     * Obtiene el tema actual
     */
    getTheme() {
        return this.get('theme', 'light');
    }
    
    /**
     * Cambia el idioma de la aplicación
     */
    setLanguage(language) {
        if (['es', 'en'].includes(language)) {
            this.set('language', language);
            document.documentElement.setAttribute('lang', language);
            return true;
        }
        return false;
    }
    
    /**
     * Obtiene el idioma actual
     */
    getLanguage() {
        return this.get('language', 'es');
    }
    
    /**
     * Agrega un libro a favoritos
     */
    addFavoriteBook(bookId, bookData) {
        const favorites = this.get('favoriteBooks', []);
        if (!favorites.find(book => book.id === bookId)) {
            favorites.push({
                id: bookId,
                addedAt: new Date().toISOString(),
                ...bookData
            });
            this.set('favoriteBooks', favorites);
            return true;
        }
        return false;
    }
    
    /**
     * Remueve un libro de favoritos
     */
    removeFavoriteBook(bookId) {
        const favorites = this.get('favoriteBooks', []);
        const filtered = favorites.filter(book => book.id !== bookId);
        if (filtered.length !== favorites.length) {
            this.set('favoriteBooks', filtered);
            return true;
        }
        return false;
    }
    
    /**
     * Verifica si un libro está en favoritos
     */
    isFavoriteBook(bookId) {
        const favorites = this.get('favoriteBooks', []);
        return favorites.some(book => book.id === bookId);
    }
    
    /**
     * Guarda el progreso de lectura de un libro
     */
    saveReadingProgress(bookId, progress) {
        const readingProgress = this.get('readingProgress', {});
        readingProgress[bookId] = {
            ...progress,
            lastUpdated: new Date().toISOString()
        };
        this.set('readingProgress', readingProgress);
        return true;
    }
    
    /**
     * Obtiene el progreso de lectura de un libro
     */
    getReadingProgress(bookId) {
        return this.get(`readingProgress.${bookId}`, null);
    }
    
    /**
     * Agrega una búsqueda al historial
     */
    addSearchToHistory(query) {
        if (!query.trim()) return false;
        
        const searchHistory = this.get('searchHistory', []);
        const trimmedQuery = query.trim();
        
        // Remover si ya existe
        const filtered = searchHistory.filter(item => item.query !== trimmedQuery);
        
        // Agregar al inicio
        filtered.unshift({
            query: trimmedQuery,
            timestamp: new Date().toISOString()
        });
        
        // Limitar a 20 búsquedas
        if (filtered.length > 20) {
            filtered.splice(20);
        }
        
        this.set('searchHistory', filtered);
        return true;
    }
    
    /**
     * Obtiene el historial de búsquedas
     */
    getSearchHistory() {
        return this.get('searchHistory', []);
    }
    
    /**
     * Limpia el historial de búsquedas
     */
    clearSearchHistory() {
        this.set('searchHistory', []);
        return true;
    }
    
    /**
     * Restablece todas las preferencias a los valores predeterminados
     */
    resetToDefaults() {
        this.preferences = { ...this.defaultPreferences };
        this.savePreferences();
        return true;
    }
    
    /**
     * Exporta las preferencias como JSON
     */
    exportPreferences() {
        try {
            return JSON.stringify(this.preferences, null, 2);
        } catch (error) {
            console.error('Error al exportar preferencias:', error);
            return null;
        }
    }
    
    /**
     * Importa preferencias desde JSON
     */
    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = this.mergePreferences(this.defaultPreferences, imported);
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Error al importar preferencias:', error);
            return false;
        }
    }
}

// Crear instancia global
const userPreferences = new UserPreferences();

/**
 * Carga las preferencias del usuario al iniciar la aplicación
 */
export function loadUserPreferences() {
    console.log('Cargando preferencias del usuario...');
    
    // Aplicar tema
    const theme = userPreferences.getTheme();
    userPreferences.setTheme(theme);
    
    // Aplicar idioma
    const language = userPreferences.getLanguage();
    userPreferences.setLanguage(language);
    
    // Aplicar otras preferencias de UI
    const fontSize = userPreferences.get('uiPreferences.fontSize');
    if (fontSize) {
        document.documentElement.setAttribute('data-font-size', fontSize);
    }
    
    console.log('Preferencias del usuario cargadas');
}

// Exportar la instancia y funciones principales
export default userPreferences;
export { UserPreferences };
