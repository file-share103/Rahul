// Create animated dots with better performance
document.addEventListener('DOMContentLoaded', function() {
    const dotsContainer = document.getElementById('dotsContainer');
    const numberOfDots = 15; // Reduced for better performance
    
    // Create dots with optimized animation
    for (let i = 0; i < numberOfDots; i++) {
        createDot(dotsContainer, i);
    }
});

// Create a single dot with optimized properties
function createDot(container, index) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    
    // Distribute dots more evenly
    const posX = (Math.random() * 80) + 10; // Keep away from edges
    const posY = (Math.random() * 80) + 10;
    
    // Staggered animation delay for smoother effect
    const delay = (index * 0.3) + (Math.random() * 2);
    
    // Set styles with better performance
    dot.style.left = `${posX}%`;
    dot.style.top = `${posY}%`;
    dot.style.animationDelay = `${delay}s`;
    dot.style.willChange = 'transform, opacity'; // Optimize for animations
    
    // Add to container
    container.appendChild(dot);
}