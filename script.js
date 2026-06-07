// --- LOGICA DE CONTROL DEL MENÚ HAMBURGUESA ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

if (hamburgerBtn && navMenu && menuOverlay) {
    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            const isOpen = navMenu.classList.contains('active');
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-xmark', isOpen);
        }
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en cualquier link interno
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// --- LÓGICA AUTOMÁTICA DE SLIDERS INDEPENDIENTES ---
function initAutoSlider(sliderId, intervalTime) {
    const sliderContainer = document.getElementById(sliderId);
    if (!sliderContainer) {
        return;
    }

    const slides = sliderContainer.querySelectorAll('.slide');
    if (slides.length <= 1) {
        return;
    }

    let currentSlideIndex = 0;
    let intervalId = null;

    const advanceSlide = () => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    };

    const startSlider = () => {
        if (intervalId) {
            return;
        }

        intervalId = setInterval(advanceSlide, intervalTime);
    };

    const stopSlider = () => {
        if (!intervalId) {
            return;
        }

        clearInterval(intervalId);
        intervalId = null;
    };

    startSlider();

    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);
    sliderContainer.addEventListener('focusin', stopSlider);
    sliderContainer.addEventListener('focusout', startSlider);
}

// Inicializamos los sliders solo si existen en la página
initAutoSlider('slider1', 3500);
initAutoSlider('slider2', 4000);
initAutoSlider('slider3', 4200);

document.querySelectorAll('.btn-donation').forEach(button => {
    button.addEventListener('click', () => {
        // Generamos múltiples partículas de humo para un efecto realista pero tenue
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('smoke-particle');

            // Tamaño aleatorio para las bocanadas de humo
            const size = Math.random() * 30 + 20;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Posición inicial: Distribuidas a lo largo del botón
            const rect = button.getBoundingClientRect();
            const randomX = Math.random() * rect.width;
            const randomY = Math.random() * rect.height;

            particle.style.left = `${randomX - size / 2}px`;
            particle.style.top = `${randomY - size / 2}px`;

            // Dirección aleatoria hacia los lados mientras sube
            const drift = (Math.random() - 0.5) * 80;
            particle.style.setProperty('--x-drift', `${drift}px`);

            // Retraso mínimo entre partículas para evitar que salgan en bloque
            particle.style.animationDelay = `${Math.random() * 0.15}s`;

            button.appendChild(particle);

            // Limpieza del DOM al terminar la animación
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', event => event.preventDefault());
});
