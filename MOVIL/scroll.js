// Configuración optimizada del observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Callback optimizado con requestAnimationFrame
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Usar RAF para sincronizar con el repaint del navegador
            requestAnimationFrame(() => {
                entry.target.classList.add('visible');
            });
            // Dejar de observar inmediatamente para liberar recursos
            observer.unobserve(entry.target);
        }
    });
};

// Crear el observer una sola vez
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Inicialización optimizada
const initScrollAnimations = () => {
    // Usar querySelectorAll de forma más eficiente
    const proyectos = document.querySelectorAll('.proyecto1, .proyecto2');
    
    // Verificar que existan elementos antes de observar
    if (proyectos.length === 0) return;
    
    // Observar con un loop optimizado
    for (let i = 0; i < proyectos.length; i++) {
        observer.observe(proyectos[i]);
    }
};

// Event listener con opciones de rendimiento
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations, { once: true });
} else {
    // Si el DOM ya está cargado, ejecutar inmediatamente
    initScrollAnimations();
}

// Cleanup opcional al salir de la página (previene memory leaks)
window.addEventListener('pagehide', () => {
    observer.disconnect();
}, { once: true });