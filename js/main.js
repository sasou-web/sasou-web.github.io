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
  
    // Gestion du mode clair/sombre
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
  
    // Vérifier le mode sauvegardé dans localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }
  
    // Basculer entre les modes
    themeToggle.addEventListener("click", () => {
      const isLightMode = document.documentElement.getAttribute("data-theme") === "light";
      if (isLightMode) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
      }
    });
  
    // Logger les visites avec Firebase
    const logData = {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct"
    };
  
    db.collection("logs").add(logData)
      .then(() => console.log("Log enregistré !"))
      .catch(error => console.error("Erreur Firebase :", error));
  });