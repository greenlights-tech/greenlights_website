document.addEventListener('DOMContentLoaded', function () {

    // Store original URL to revert back to
    let originalUrl = window.location.pathname;

    // Slides sollicitatie page in from left
    document.getElementById('openSolli').addEventListener('click', function () {
        document.querySelector('.sol-page').classList.add('active');
        changeUrl('/sollicitatie');
    });

    document.querySelector('.sol-home-button-container').addEventListener('click', function () {
        document.querySelector('.sol-page').classList.remove('active');
        changeUrl(originalUrl);
    });

    // Slides opdrachtgever page in from right
    document.getElementById('openOpdrachtgever').addEventListener('click', function () {
        document.querySelector('.opd-page').classList.add('active');
        changeUrl('/opdrachtgever');
    });

    document.querySelector('.opd-home-button-container').addEventListener('click', function () {
        document.querySelector('.opd-page').classList.remove('active');
        changeUrl(originalUrl);
    });

    // function sendEmail() {
    //     var link = document.getElementById('Sol-versturen');
    //     var voornaam = document.getElementById('voornaam').value;
    //     var achternaam = document.getElementById('achternaam').value;
    //     var message = "Hallo, ik ben " + voornaam + achternaam;
    //     var email = "c.nanninga@qquest.nl";
    //     var href = "mailto:" + email + "?subject=" + voornaam + achternaam + "&body=" + message;
    //     console.log(href);
    //     link.setAttribute("href", href);
    // }

    // Intersection Observer for animations on sections
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

    // Hamburger menu toggle
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

        document.addEventListener('click', (e) => {
            if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
            }
        });

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

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Modal handling
    var modal = document.getElementById("sol-modal");
    var opdModal = document.getElementById("opd-modal");
    var span = document.getElementsByClassName("close")[0];
    var opdSpan = document.querySelector("#opd-modal .close");

    document.addEventListener('click', function (event) {
        if (event.target.id === 'sol-signup-button' || event.target.closest('#sol-signup-button')) {
            modal.style.display = "flex";
        } else if (event.target.id === 'opd-signup-button' || event.target.closest('#opd-signup-button')) {
            opdModal.style.display = "flex";
        }
    });

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
    
    // URL management functions
    //     function changeUrl(path) {
    //         history.pushState(null, '', path);
    //         updatePathDisplay();
    //         window.dispatchEvent(new CustomEvent('urlchange', { detail: { path } }));
    //     }

    //     function updatePathDisplay() {
    //         const urlElement = document.getElementById('urlDisplay');
    //         if (urlElement) {
    //             urlElement.textContent = window.location.href;
    //         }
    //     }

    //     updatePathDisplay();
    //     window.addEventListener('popstate', updatePathDisplay);

    //     window.changeUrl = changeUrl;

});
