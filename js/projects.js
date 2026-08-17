/**
 * Projects Data & Rendering
 * Add new projects easily by appending objects to the array.
 */
const projectsData = [
    {
        id: "01",
        title: "Scientific Calculator API",
        category: "tools",
        description: "A robust backend API capable of parsing complex mathematical expressions, solving differential equations numerically, and returning formatted JSON data.",
        tech: "Node.js • Express • Math.js",
        github: "#",
        demo: "#"
    },
    {
        id: "02",
        title: "Kinematics Simulator",
        category: "science",
        description: "An interactive web-based physics engine visualizing 2D projectile motion. Allows users to adjust gravity, initial velocity, and launch angle in real-time.",
        tech: "HTML Canvas • Vanilla JS",
        github: "#",
        demo: "#"
    },
    {
        id: "03",
        title: "Portfolio Architecture",
        category: "web",
        description: "A highly optimized, dependency-free developer portfolio designed with a glassmorphic aesthetic, custom canvas animations, and a strict semantic structure.",
        tech: "HTML5 • CSS3 • JS ES6+",
        github: "#",
        demo: "#"
    }
];

const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProjects(category = 'all') {
    projectsGrid.innerHTML = '';
    
    const filtered = category === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === category);
        
    if (filtered.length === 0) {
        projectsGrid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;">
            <p class="mono-text">No projects found in this category yet.</p>
        </div>`;
        return;
    }

    filtered.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card reveal active'; // Active added immediately for filtering UX
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="project-top">
                <span class="accent">${project.id}</span>
                <span style="text-transform: capitalize;">${project.category}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">${project.tech}</div>
            <div class="project-links">
                ${project.github !== '#' ? `<a href="${project.github}" target="_blank">[GitHub]</a>` : '<span class="text-muted">[GitHub Pending]</span>'}
                ${project.demo !== '#' ? `<a href="${project.demo}" target="_blank">[Live Demo]</a>` : ''}
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// Event Listeners for Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.getAttribute('data-filter'));
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => renderProjects());