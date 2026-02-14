
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Callback que se ejecuta cuando un elemento entra en viewport
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

// Crear el observer
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Observar todos los proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const proyectos = document.querySelectorAll('.proyecto1, .proyecto2');
    proyectos.forEach(proyecto => observer.observe(proyecto));
});