/**
 * Main Initialization and UI Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Remove Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Start Canvas effects once loaded
            if(window.initEffects) window.initEffects();
        }, 500);
    }, 1200);

    // 2. Theme Management
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark) {
        root.setAttribute('data-theme', 'light');
    }
    
    themeBtn.addEventListener('click', () => {
        let currentTheme = root.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Sticky Navbar & Active States
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // 5. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Front-end validation message
            formStatus.style.color = 'var(--accent)';
            formStatus.innerHTML = "Transmission generated. Connecting a backend (like Formspree) is required to deliver it. <br><a href='mailto:your.email@example.com' style='color:inherit'>Click here to use default mail client.</a>";
            contactForm.reset();
        });
    }
});