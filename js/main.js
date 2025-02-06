document.addEventListener("DOMContentLoaded", () => {
    // Gestion du menu de navigation
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Retirer la classe active des liens
            navLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");
            
            // Afficher la bonne section
            const sectionId = link.getAttribute("data-section");
            sections.forEach(section => section.classList.remove("active"));
            document.getElementById(sectionId).classList.add("active");
        });
    });
    
    // Effet de scrolling fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Effet d'apparition des sections au scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fadeInUp");
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
    
    // Mode nuit toggle
    const toggleDarkMode = document.createElement("button");
    toggleDarkMode.textContent = "Mode Nuit";
    toggleDarkMode.classList.add("dark-mode-toggle");
    document.body.appendChild(toggleDarkMode);
    
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
    
    // Ajout du style pour le mode nuit
    const darkModeStyle = document.createElement("style");
    darkModeStyle.innerHTML = `
        .dark-mode {
            background: #121212;
            color: #f5f5f5;
        }
        .dark-mode header, .dark-mode footer {
            background: #222;
        }
        .dark-mode .project-item {
            background: linear-gradient(90deg, #444, #666);
        }
    `;
    document.head.appendChild(darkModeStyle);
});
