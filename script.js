// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize skill progress bars
    initSkillBars();
    

    
    // Initialize contact form
    initContactForm();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize background animation
    initBackgroundAnimation();
});

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'Program Manager at Siemens',
        'Driving Global Standards',
        'Regulatory Excellence Expert',
        'IEC & BIS Committee Member',
        'IEC 1906 Award Recipient'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase after deleting
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
}

// Scroll animations
function initScrollAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.section-header, .about-text p, .timeline-item, .education-item, .certification-item, .skill-item, .project-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // If it's a skill item, add a special entrance animation
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Add scrolled class to header
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
}

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize skill items
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Add animation to skill items when they come into view
    skillItems.forEach(item => {
        // Add subtle animation to icons
        const icon = item.querySelector('.skill-icon i');
        if (icon) {
            // Random subtle animation delay for each icon
            const delay = Math.random() * 2;
            icon.style.animationDelay = `${delay}s`;
            icon.style.animation = 'pulse 3s infinite';
        }
    });
    
    // Add keyframe animation for icons if it doesn't exist
    if (!document.querySelector('#skill-animations')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'skill-animations';
        styleSheet.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}



// Initialize contact section
function initContactForm() {
    // Add animation to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effect for contact icons
        const icon = item.querySelector('.contact-icon i');
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
            
            item.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1)';
            });
        }
        
        // Add click tracking (optional, for analytics in a real project)
        if (item.classList.contains('contact-link')) {
            item.addEventListener('click', (e) => {
                const contactType = item.querySelector('h3').textContent;
                console.log(`Contact clicked: ${contactType}`);
                // In a real project, you might want to track this interaction
            });
        }
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && scrollPosition < heroSection.offsetHeight) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Add glitch effect to hero title occasionally
setInterval(function() {
    const glitchText = document.querySelector('.glitch-text');
    
    if (glitchText) {
        glitchText.classList.add('glitching');
        
        setTimeout(function() {
            glitchText.classList.remove('glitching');
        }, 1000);
    }
}, 10000);

// Preload animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Initialize background animation
function initBackgroundAnimation() {
    // Use the animated-background class instead of bgAnimation id
    const bgAnimation = document.querySelector('.animated-background');
    
    // Create a container for particles if it doesn't exist
    let particleContainer = document.getElementById('particleContainer');
    if (!particleContainer) {
        particleContainer = document.createElement('div');
        particleContainer.id = 'particleContainer';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.zIndex = '0';
        particleContainer.style.pointerEvents = 'none';
        bgAnimation.appendChild(particleContainer);
    }
    
    // Clear any existing particles
    particleContainer.innerHTML = '';
    
    const numberOfParticles = 80; // Increased number of particles
    
    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        createParticle(particleContainer);
    }
    
    // Create floating effect for existing particles
    const particles = document.querySelectorAll('.bg-animation-particle');
    particles.forEach(particle => {
        animateParticle(particle);
    });
    
    // Add new particles occasionally
    setInterval(() => {
        if (document.querySelectorAll('.bg-animation-particle').length < 100) {
            createParticle(particleContainer);
            const newParticle = particleContainer.lastChild;
            animateParticle(newParticle);
        }
    }, 2000);
    
    // Add a visual indicator that animations are working
    console.log("Background animation initialized with " + numberOfParticles + " particles");
}

// Create a single particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('bg-animation-particle');
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    
    // Random size (larger and more visible)
    const size = Math.random() < 0.7 ? Math.random() * 3 + 2 : Math.random() * 5 + 3;
    
    // Random opacity (higher for better visibility)
    const opacity = Math.random() * 0.6 + 0.4;
    
    // Random glow effect
    const glow = Math.random() * 10 + 5;
    
    // Set styles
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.boxShadow = `0 0 ${glow}px rgba(0, 168, 255, 0.7)`;
    
    // Add to container
    container.appendChild(particle);
    
    return particle;
}

// Animate a single particle
function animateParticle(particle) {
    // Current position
    const currentX = parseFloat(particle.style.left);
    const currentY = parseFloat(particle.style.top);
    
    // Random movement distance (more noticeable movements)
    const moveX = (Math.random() - 0.5) * 150;
    const moveY = (Math.random() - 0.5) * 150;
    
    // Random duration (varied movement speeds)
    const duration = Math.random() * 12 + 8;
    
    // Apply animation
    particle.style.transition = `all ${duration}s ease-in-out`;
    
    // Set new position after a small delay
    setTimeout(() => {
        particle.style.left = `${currentX + moveX}px`;
        particle.style.top = `${currentY + moveY}px`;
        
        // Randomly change opacity during movement for twinkling effect
        const newOpacity = Math.random() * 0.6 + 0.4;
        particle.style.opacity = newOpacity;
        
        // When animation completes, start a new one
        setTimeout(() => {
            // Check if particle is still in viewport
            const rect = particle.getBoundingClientRect();
            if (
                rect.left < -50 || 
                rect.right > window.innerWidth + 50 || 
                rect.top < -50 || 
                rect.bottom > window.innerHeight + 50
            ) {
                // If outside viewport, reset position
                particle.style.transition = 'none';
                particle.style.left = `${Math.random() * window.innerWidth}px`;
                particle.style.top = `${Math.random() * window.innerHeight}px`;
                
                // Start new animation after reset
                setTimeout(() => {
                    animateParticle(particle);
                }, 100);
            } else {
                // If still in viewport, continue animation
                animateParticle(particle);
            }
        }, duration * 1000);
    }, 100);
}

// Adjust background animation on window resize
window.addEventListener('resize', function() {
    const particles = document.querySelectorAll('.bg-animation-particle');
    particles.forEach(particle => {
        // Check if particle is outside viewport after resize
        const rect = particle.getBoundingClientRect();
        if (
            rect.left < -50 || 
            rect.right > window.innerWidth + 50 || 
            rect.top < -50 || 
            rect.bottom > window.innerHeight + 50
        ) {
            // Reset position
            particle.style.transition = 'none';
            particle.style.left = `${Math.random() * window.innerWidth}px`;
            particle.style.top = `${Math.random() * window.innerHeight}px`;
        }
    });
});