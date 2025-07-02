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

    // 27-06-2025 | Mark K. | Event listener aangemaakt
    document.getElementById('sollicitatieForm').addEventListener('submit', sendSollicitatieDataToServer);

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

    if (hamburger && navLinks) {
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
    }

    // Modal handling with event delegation
    var modal = document.getElementById("soll-modal");
    var opdModal = document.getElementById("opd-modal");
    var span = document.getElementsByClassName("close")[0];
    var opdSpan = document.querySelector("#opd-modal .close"); // Assuming opd-modal also has a close button

    // Use event delegation to handle button clicks
    document.addEventListener('click', function (event) {
        // Check which button was clicked and open corresponding modal
        if (event.target.id === 'sol-signup-button' || event.target.closest('#sol-signup-button')) {
            modal.style.display = "flex";
        } else if (event.target.id === 'opd-signup-button' || event.target.closest('#opd-signup-button')) {
            opdModal.style.display = "flex";
        }
    });

    // When the user clicks on <span> (x), close the respective modal
    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    if (opdSpan) {
        opdSpan.onclick = function () {
            opdModal.style.display = "none";
        }
    }

    // When the user clicks anywhere outside of the modals, close them
    let mouseDownOutside = false;

    window.onmousedown = function (event) {
        if (event.target == modal || event.target == opdModal) {
            mouseDownOutside = true;
        } else {
            mouseDownOutside = false;
        }
    }

    window.onmouseup = function (event) {
        if (event.target == modal && mouseDownOutside) {
            modal.style.display = "none";
        } else if (event.target == opdModal && mouseDownOutside) {
            opdModal.style.display = "none";
        }
        mouseDownOutside = false;
    }
    // 27-06-2025 | Mark K. | Verzending van from data naar server.js
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    const API_URL = isLocal
        ? 'http://localhost:5000'
        : 'https://greenlights.tech'
        ;

    async function sendSollicitatieDataToServer(e) {
        e.preventDefault();

        const sollicitatieFromData = new FormData(e.target);

        try {
            const response = await fetch(`${API_URL}/submit`, {
                method: 'POST',
                body: sollicitatieFromData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.error('Fout bij verzenden:', err);
        }

    };

})(window, document);