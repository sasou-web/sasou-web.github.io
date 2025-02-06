document.addEventListener('DOMContentLoaded', function () {
    // Sélection de toutes les sections pour l'effet de fondu
    const sections = document.querySelectorAll('section');

    // Options de l'observer : lancer l'animation dès que 10% de la section est visible
    const observerOptions = {
        threshold: 0.1
    };

    // Création de l'observer qui ajoute la classe 'fade-in'
    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer chaque section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Panneaux coulissants pour les projets
    const projectItems = document.querySelectorAll('.project-item h2');

    projectItems.forEach(item => {
        item.addEventListener('click', function () {
            const parent = this.parentElement;

            // Basculer l'état du panneau (ouvrir/fermer)
            parent.classList.toggle('open');

            // Fermer les autres panneaux ouverts
            projectItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.parentElement.classList.remove('open');
                }
            });
        });
    });

    // Effet smooth sur les ancres de navigation (sans bloquer la redirection des pages)
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Vérifier si c'est une ancre interne
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
