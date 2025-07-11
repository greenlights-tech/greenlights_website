(function (window, document) {
    document.addEventListener('DOMContentLoaded', function () {

        // Slides sollicitatie page in from left
        document.getElementById('openSolli').addEventListener('click', function () {
            document.querySelector('.sol-page').classList.add('active');
        });

        document.querySelector('.sol-close-button').addEventListener('click', function () {
            document.querySelector('.sol-page').classList.remove('active');
        });

        // Slides opdrachtgever page in from right
        document.getElementById('openOpdrachtgever').addEventListener('click', function () {
            document.querySelector('.opd-page').classList.add('active');
        });

        document.querySelector('.opd-close-button').addEventListener('click', function () {
            document.querySelector('.opd-page').classList.remove('active');
        });

        // Animation for sections when they come into view
        const sections = document.querySelectorAll('.section-title, .section-content, .btn2');

        const observerOptions = {
            root: null,
            rootMargin: '-50px -50px -50px -50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';

                    // Stop observing this element after animation has run once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(section);
        });

        // Improved hamburger menu toggle with smooth animations
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');
        let isMenuOpen = false;

        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            isMenuOpen = !isMenuOpen;

            navLinks.classList.toggle('active', isMenuOpen);
            hamburger.classList.toggle('toggle', isMenuOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on a link
        const navLinksElements = navLinks.querySelectorAll('a');
        navLinksElements.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    isMenuOpen = false;
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('toggle');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
            }
        });
    });
})(window, document);

