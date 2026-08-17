/**
 * Visual Effects Engine (Canvas Background + Intersections)
 */

// 1. Setup Background Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrame;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
        this.angle = Math.random() * 360;
        this.speed = (Math.random() * 0.02) + 0.005;
    }
    
    update() {
        // Subtle orbital movement
        this.angle += this.speed;
        this.x = this.baseX + Math.cos(this.angle) * 20;
        this.y = this.baseY + Math.sin(this.angle) * 20;
    }
    
    draw(isLight) {
        ctx.fillStyle = isLight ? 'rgba(0, 92, 151, 0.2)' : 'rgba(0, 210, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initCanvas() {
    resizeCanvas();
    particles = [];
    const numParticles = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    particles.forEach(p => {
        p.update();
        p.draw(isLight);
    });
    
    // Draw connections if close enough (creates a network/grid effect)
    for(let i = 0; i < particles.length; i++) {
        for(let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if(distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = isLight ? `rgba(0, 92, 151, ${0.1 - distance/1200})` : `rgba(0, 210, 255, ${0.1 - distance/1200})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    animationFrame = requestAnimationFrame(animateCanvas);
}

window.addEventListener('resize', () => {
    cancelAnimationFrame(animationFrame);
    initCanvas();
    animateCanvas();
});

// 2. Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once revealed
            revealObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

// 3. Counter Animation Observer
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

const counterObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !hasCounted) {
        hasCounted = true;
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200; // lower is faster
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    }
}, { threshold: 0.5 });

if(document.getElementById('stats')) {
    counterObserver.observe(document.getElementById('stats'));
}

// Export initialization for main.js
window.initEffects = () => {
    initCanvas();
    animateCanvas();
};