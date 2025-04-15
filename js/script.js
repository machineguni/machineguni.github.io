document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the JS components
    initNavbar();
    initHamburgerMenu();
    initScrollAnimations();
    createToastContainer();
    setupModelControls();
    setupDownloadButtons();
});

// Navbar behavior on scroll
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hamburger menu for mobile
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle menu when hamburger is clicked
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when a nav link is clicked
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const navbar = document.querySelector('.navbar');
            
            if (navbar) {
                const isClickInsideNavbar = navbar.contains(event.target);
                
                if (!isClickInsideNavbar && navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    }
}

// Scroll animations for elements
function initScrollAnimations() {
    // Add fade-in class to elements that should animate
    const elementsToAnimate = [
        ...document.querySelectorAll('.objetivo-card'),
        ...document.querySelectorAll('.step'),
        ...document.querySelectorAll('.componente-card'),
        ...document.querySelectorAll('.ventaja-card'),
        ...document.querySelectorAll('.team-card')
    ];
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Check if elements are in viewport and animate them
    function checkScroll() {
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('appear');
            }
        });
    }
    
    // Initial check and then check on scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);
}

// Set up model viewer controls
function setupModelControls() {
    const rotateButton = document.getElementById('rotate-model');
    const resetButton = document.getElementById('reset-model');
    
    if (rotateButton && resetButton) {
        rotateButton.addEventListener('click', function() {
            const modelViewer = document.getElementById('recycleai-model');
            if (modelViewer && typeof modelViewer.autoRotate !== 'undefined') {
                modelViewer.autoRotate = !modelViewer.autoRotate;
            } else {
                createToast('Rotación de modelo simulada (se requiere model-viewer real)');
            }
        });
        
        resetButton.addEventListener('click', function() {
            const modelViewer = document.getElementById('recycleai-model');
            if (modelViewer && typeof modelViewer.resetTurntable !== 'undefined') {
                modelViewer.resetTurntable();
            } else {
                createToast('Restablecimiento de vista simulada (se requiere model-viewer real)');
            }
        });
    }
}

// Set up download buttons
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-button');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Verifica si el href es "#" o está vacío
            const href = this.getAttribute('href');
            if (href === '#' || href === '' || href === null) {
                e.preventDefault();
                showDownloadMessage(this.id);
            }
            // Si tiene una URL real, no hace nada y deja que el navegador siga el enlace normalmente
        });
    });
}

// Show a friendly message when download buttons are clicked
function showDownloadMessage(buttonId) {
    let message = '';
    
    switch (buttonId) {
        case 'download-code':
            message = 'El código fuente de RecycleAI estará disponible próximamente. ¡Gracias por tu interés!';
            break;
        case 'download-docs':
            message = 'La documentación completa estará disponible después del lanzamiento oficial. ¡Estamos trabajando en ello!';
            break;
        case 'download-schematics':
            message = 'Los esquemas técnicos están siendo finalizados. Serán publicados muy pronto.';
            break;
        default:
            message = 'Esta función estará disponible próximamente. ¡Gracias por tu interés!';
    }
    
    // Create and show toast notification
    createToast(message);
}

// Create toast notification container
function createToastContainer() {
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// Create and show toast notification
function createToast(message) {
    const toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        createToastContainer();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-info-circle"></i>
        </div>
        <div class="toast-message">${message}</div>
    `;
    
    document.querySelector('.toast-container').appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', function() {
            toast.remove();
        });
    }, 5000);
}