// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoadingScreen();
    initTypingAnimation();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initSkillHover();
    initParticleEffects();
    initGlitchEffect();
    initScrollIndicator();
    initContactForm();
});

// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    const messages = ['INITIALIZING...', 'LOADING ASSETS...', 'RENDERING UI...', 'READY!'];
    let currentMessage = 0;
    
    const messageInterval = setInterval(() => {
        if (currentMessage < messages.length - 1) {
            currentMessage++;
            loadingText.textContent = messages[currentMessage];
        } else {
            clearInterval(messageInterval);
        }
    }, 800);
    
    // Hide loading screen after animation completes
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 5000);
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        'Full Stack Developer',
        'Mobile App Creator',
        'UI/UX Enthusiast', 
        'Problem Solver',
        'Code Architect',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 50;
                setTimeout(typeWriter, 2000); // Pause before deleting
                return;
            }
        } else {
            typingText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 150;
            }
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typing animation after loading screen
    setTimeout(typeWriter, 5500);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animatedElements = document.querySelectorAll([
        '.section',
        '.project-card',
        '.skill-category',
        '.timeline-item',
        '.contact-content'
    ].join(','));
    
    animatedElements.forEach((element, index) => {
        // Add staggered animation classes
        const animations = ['fade-in', 'slide-in-left', 'slide-in-right'];
        const randomAnimation = animations[index % animations.length];
        element.classList.add(randomAnimation);
        
        // Add delay for staggered effect
        element.style.animationDelay = `${index * 0.1}s`;
        
        observer.observe(element);
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav-bar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Hover Effects
function initSkillHover() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        
        item.addEventListener('mouseenter', () => {
            // Create skill level tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = `${level}%`;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--gradient-primary);
                color: white;
                padding: 0.3rem 0.6rem;
                border-radius: 5px;
                font-size: 0.8rem;
                top: -35px;
                left: 50%;
                transform: translateX(-50%);
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                animation: fadeInTooltip 0.3s ease forwards;
            `;
            
            // Add CSS for tooltip animation
            if (!document.querySelector('#tooltip-styles')) {
                const style = document.createElement('style');
                style.id = 'tooltip-styles';
                style.textContent = `
                    @keyframes fadeInTooltip {
                        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
                        100% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            item.style.position = 'relative';
            item.appendChild(tooltip);
        });
        
        item.addEventListener('mouseleave', () => {
            const tooltip = item.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Enhanced Particle Effects
function initParticleEffects() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, var(--neon-cyan), transparent);
            border-radius: 50%;
            left: ${startX}px;
            bottom: -10px;
            animation: floatUp ${duration}s linear ${delay}s infinite;
            opacity: 0.7;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    // Add CSS for particle animation
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.7;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// Glitch Effect Enhancement
function initGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    if (!glitchElement) return;
    
    // Random glitch trigger
    setInterval(() => {
        if (Math.random() > 0.8) {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = '';
            }, 100);
        }
    }, 3000);
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrolled > windowHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Enhanced Contact Form (if contact form is added)
function initContactForm() {
    // Add click effects to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('div');
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(0, 255, 255, 0.3);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Add CSS for ripple animation
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes rippleEffect {
                        0% {
                            transform: scale(0);
                            opacity: 0.6;
                        }
                        100% {
                            transform: scale(1);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            link.style.position = 'relative';
            link.style.overflow = 'hidden';
            link.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Dynamic Background Color Change
function initDynamicBackground() {
    const colors = [
        'var(--neon-cyan)',
        'var(--neon-pink)',
        'var(--neon-purple)',
        'var(--neon-green)',
        'var(--neon-orange)'
    ];
    
    let colorIndex = 0;
    
    setInterval(() => {
        document.documentElement.style.setProperty('--dynamic-accent', colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) {
                    originalScrollHandler();
                }
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    };
    
    // Preload critical images
    const criticalImages = ['profile.jpg'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize performance optimizations
optimizePerformance();

// Easter egg - Konami code
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate easter egg - rainbow mode
                document.body.classList.add('rainbow-mode');
                
                // Add rainbow CSS
                if (!document.querySelector('#rainbow-styles')) {
                    const style = document.createElement('style');
                    style.id = 'rainbow-styles';
                    style.textContent = `
                        .rainbow-mode {
                            animation: rainbow 2s ease-in-out infinite;
                        }
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Show message
                const message = document.createElement('div');
                message.textContent = '🌈 RAINBOW MODE ACTIVATED! 🌈';
                message.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--gradient-primary);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    font-weight: bold;
                    z-index: 10000;
                    animation: slideInDown 0.5s ease;
                `;
                
                document.body.appendChild(message);
                
                setTimeout(() => {
                    message.remove();
                }, 3000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
})();

// Console welcome message
console.log(`
%c
██████╗ ██████╗     ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██████╔╝    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██╔══██╗    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ██║  ██║    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝     ╚═╝  ╚═╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 

%c🚀 Welcome to my futuristic portfolio! 
%c💻 Built with passion and cutting-edge web technologies
%c🎨 Designed for the future of web development
%c📱 Fully responsive and optimized for all devices

%cTry the Konami Code for a surprise! ↑↑↓↓←→←→BA
`, 
'color: #00ffff; font-family: monospace; font-size: 10px; line-height: 1;',
'color: #00ffff; font-size: 16px; font-weight: bold;',
'color: #ff0080; font-size: 14px;',
'color: #8000ff; font-size: 14px;',
'color: #00ff41; font-size: 14px;',
'color: #ffff00; font-size: 12px; font-style: italic;'
);
