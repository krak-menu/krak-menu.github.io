// Main JavaScript for Krak Menu Website

// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
const featureCards = document.querySelectorAll('.feature-card');
const statNumbers = document.querySelectorAll('.stat-number');
const downloadCards = document.querySelectorAll('.download-card');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavbar();
    initializeScrollEffects();
    initializeCounters();
    initializeParticles();
    initializeHoverEffects();
    initializeSmoothScrolling();
});

// Navbar functionality
function initializeNavbar() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 12, 41, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 12, 41, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Active nav link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Smooth scroll for hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('View Features')) {
                document.querySelector('#features').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (this.textContent.includes('Download')) {
                document.querySelector('#download').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Special animations for different elements
                if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                } else if (entry.target.classList.contains('stat-item')) {
                    animateStatCounter(entry.target);
                } else if (entry.target.classList.contains('download-card')) {
                    animateDownloadCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.feature-card, .stat-item, .download-card, .section-title, .section-subtitle');
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Feature card animations
function animateFeatureCard(card) {
    const icon = card.querySelector('.feature-icon');
    const benefits = card.querySelectorAll('.feature-benefits li');

    // Icon pulse animation
    if (icon) {
        icon.style.animation = 'iconPulse 2s ease-in-out infinite';
    }

    // Stagger benefit list animations
    benefits.forEach((benefit, index) => {
        setTimeout(() => {
            benefit.style.opacity = '1';
            benefit.style.transform = 'translateX(0)';
        }, index * 100);
        benefit.style.opacity = '0';
        benefit.style.transform = 'translateX(-20px)';
        benefit.style.transition = 'all 0.3s ease-out';
    });
}

// Counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        counter.style.opacity = '0';
    });
}

function animateStatCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 30);
}

// Download card animations
function animateDownloadCard(card) {
    const features = card.querySelectorAll('.features-list li');

    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, index * 50);
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-15px)';
        feature.style.transition = 'all 0.3s ease-out';
    });
}

// Particle effects for buttons
function initializeParticles() {
    const pulseButtons = document.querySelectorAll('.pulse-btn');

    pulseButtons.forEach(button => {
        button.addEventListener('click', createParticleExplosion);
        button.addEventListener('mouseenter', createFloatingParticles);
    });
}

function createParticleExplosion(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#8b5cf6';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 6px #8b5cf6';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 150 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = centerX;
        let posY = centerY;
        let opacity = 1;

        const animate = () => {
            posX += vx * 0.02;
            posY += vy * 0.02;
            opacity -= 0.02;

            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };

        requestAnimationFrame(animate);
    }
}

function createFloatingParticles(e) {
    const button = e.currentTarget;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * button.offsetWidth + 'px';
            particle.style.top = button.offsetHeight + 'px';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = '#06b6d4';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '0.8';
            particle.style.boxShadow = '0 0 4px #06b6d4';

            button.style.position = 'relative';
            button.appendChild(particle);

            let posY = button.offsetHeight;
            let opacity = 0.8;

            const float = () => {
                posY -= 2;
                opacity -= 0.02;

                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;

                if (opacity > 0 && posY > -10) {
                    requestAnimationFrame(float);
                } else {
                    if (button.contains(particle)) {
                        button.removeChild(particle);
                    }
                }
            };

            requestAnimationFrame(float);
        }, i * 200);
    }
}

// Advanced hover effects
function initializeHoverEffects() {
    // Feature cards 3D tilt effect
    featureCards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
        card.addEventListener('mouseenter', addCardGlow);
    });

    // Download cards hover effects
    downloadCards.forEach(card => {
        card.addEventListener('mouseenter', enhanceCard);
        card.addEventListener('mouseleave', resetCard);
    });

    // Button hover effects
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', addButtonRipple);
        button.addEventListener('mouseleave', removeButtonRipple);
    });
}

function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / rect.height) * 10;
    const rotateY = (mouseX / rect.width) * -10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

function addCardGlow(e) {
    const card = e.currentTarget;
    const glowElement = document.createElement('div');
    glowElement.className = 'card-glow';
    glowElement.style.position = 'absolute';
    glowElement.style.top = '0';
    glowElement.style.left = '0';
    glowElement.style.right = '0';
    glowElement.style.bottom = '0';
    glowElement.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))';
    glowElement.style.borderRadius = '16px';
    glowElement.style.opacity = '0';
    glowElement.style.transition = 'opacity 0.3s ease';
    glowElement.style.pointerEvents = 'none';

    card.style.position = 'relative';
    card.appendChild(glowElement);

    setTimeout(() => {
        glowElement.style.opacity = '1';
    }, 10);
}

function enhanceCard(e) {
    const card = e.currentTarget;
    const icon = card.querySelector('.feature-icon, .card-header');

    if (icon) {
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
    }
}

function resetCard(e) {
    const card = e.currentTarget;
    const icon = card.querySelector('.feature-icon, .card-header');
    const glow = card.querySelector('.card-glow');

    if (icon) {
        icon.style.transform = 'scale(1)';
    }

    if (glow) {
        glow.style.opacity = '0';
        setTimeout(() => {
            if (card.contains(glow)) {
                card.removeChild(glow);
            }
        }, 300);
    }
}

function addButtonRipple(e) {
    const button = e.currentTarget;

    if (!button.querySelector('.ripple-effect')) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.transition = 'width 0.6s ease, height 0.6s ease';
        ripple.style.pointerEvents = 'none';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.style.width = button.offsetWidth * 2 + 'px';
            ripple.style.height = button.offsetWidth * 2 + 'px';
        }, 10);
    }
}

function removeButtonRipple(e) {
    const button = e.currentTarget;
    const ripple = button.querySelector('.ripple-effect');

    if (ripple) {
        ripple.style.opacity = '0';
        setTimeout(() => {
            if (button.contains(ripple)) {
                button.removeChild(ripple);
            }
        }, 300);
    }
}

// Initialize background animations
function initializeAnimations() {
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
            50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
        }

        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(15, 12, 41, 0.98);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(139, 92, 246, 0.2);
            padding: 1rem 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
}

// Floating panel mod toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const modItems = document.querySelectorAll('.mod-item');

    modItems.forEach(item => {
        item.addEventListener('click', function() {
            const toggle = this.querySelector('.mod-toggle');

            if (toggle.classList.contains('on')) {
                toggle.classList.remove('on');
                toggle.classList.add('off');
                toggle.textContent = 'OFF';
                this.classList.remove('active');
            } else {
                toggle.classList.remove('off');
                toggle.classList.add('on');
                toggle.textContent = 'ON';
                this.classList.add('active');
            }

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Additional scroll-based animations can be added here
}, 16)); // ~60fps

console.log('🚀 Krak Menu website loaded successfully!');
