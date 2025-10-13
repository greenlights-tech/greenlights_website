// import { blog } from "./blog.js";
gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", function () {
  // Store original URL to revert back to
  let originalUrl = window.location.pathname;

  const ticker = document.querySelector(".ticker-content");
  ticker.style.transform = `translateX(${Math.random() * 100}%)`;

  // Slides sollicitatie page in from left

  // const menuToggle = document.querySelector(".menu-toggle");
  // const megaBox = document.querySelector(".mega-box");

  // menuToggle.addEventListener("click", () => {
  //   megaBox.classList.toggle("open");
  //   menuToggle.classList.toggle("is-active");
  // });

  // 2. Initialisatie en Setup
  gsap.set(".header-container", { opacity: 0 });
  gsap.set(".homepage-main", { opacity: 0, y: -50 });
  gsap.set(".tagline-container", { opacity: 0, y: 10 });

  // 3. Maak de SplitText instantie
  const splitLogo = SplitText.create(".logo", {
    type: "chars",
    charsClass: "split-char",
  });

  // Zorg ervoor dat de letters eerst onzichtbaar zijn voordat ze in beeld schuiven
  gsap.set(splitLogo.chars, { yPercent: 100, stagger: 0.05 });

  const splitTagline = SplitText.create(".tagline", {
    type: "chars",
  });

  gsap.set(splitTagline.chars, { yPercent: 120 });
  // En de tagline zelf onzichtbaar (vooral voor de 'border' animatie)
  gsap.set(".tagline", {
    borderColor: "transparent", // Zorgt ervoor dat de border wel de dikte heeft (1px) maar onzichtbaar is
    boxShadow: "0 0 0px 0px transparent", // Een animatievriendelijke 'none' state
  });

  // 4. Maak de Timeline
  const logoAnimation = gsap.timeline({
    delay: 0.5,
  });

  // =======================================================
  // EERSTE FASE: LETTER INTRODUCTIE
  // =======================================================
  logoAnimation
    // A. Logo zichtbaar maken (op tijd 0)
    .to(
      ".logo",
      {
        duration: 0.01,
        opacity: 1,
      },
      0
    )

    // B. De letters komen in beeld (van y: 100% naar y: 0)
    .to(
      splitLogo.chars,
      {
        duration: 0.5,
        yPercent: 0,
        ease: "power2.out",
        stagger: {
          each: 0.05,
          from: "center",
        },
      },
      0.1
    ) // Start 0.1 seconde na het begin van de timeline

    .to(
      splitTagline.chars,
      {
        duration: 0.4,
        yPercent: 0,
        stagger: 0.03, // Sneller laten opvolgen dan het hoofdlogo
      },
      "+=0.1"
    )

    .to(
      ".tagline-container",
      {
        duration: 0.4,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      },
      "<"
    )

    // C3. De BORDER en BOX-SHADOW verschijnen (Start vlak nadat de letters beginnen)
    .to(
      ".tagline",
      {
        duration: 0.3,
        borderColor: "var(--color-primary)",
        boxShadow:
          "inset 0 0 15px -5px var(--color-primary), 0 0 15px -5px var(--color-primary)",
      },
      "<0.1"
    )

    // =======================================================
    // TWEEDE FASE: KRIMP EN BEWEGING NAAR DE TOP
    // =======================================================
    // Let op: 'logoAnimation.to' wordt gebruikt i.p.v. 'gsap.to'
    .to(
      ".logo-container",
      {
        duration: 3,
        ease: "power2.out",

        // Eind-positie
        left: "50%",
        xPercent: -50,
        top: "0",
        yPercent: 0,
        scale: 1,

        onComplete: () => {
          // Val terug naar de normale stroom
          gsap.set(".logo-container", {
            position: "relative",
            top: "initial",
            left: "initial",
            xPercent: 0,
            yPercent: 0,
          });
        },
      },
      "+=0.2"
    ) // Start een halve seconde nadat de letters klaar zijn

    // 5. Fade-in van de header achtergrond
    .to(
      ".header-container",
      {
        duration: 0.3,
        opacity: 1,
        ease: "power1.out",
      },
      "<"
    ) // Start op hetzelfde moment als de logo-beweging (de vorige stap)

    // 6. Homepage main content komt 'aanwaaien'
    .to(
      ".homepage-main",
      {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      },
      ">-0.4"
    ); // Start 0.4 seconden vóór het einde van de vorige stap

  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e) => {
    console.log(e);
  });

  document.getElementById("openSolli").addEventListener("click", function () {
    document.querySelector(".sol-page").classList.add("active");
    changeUrl("/sollicitatie");
  });
  // Slides sollicitatie page in from left (mobile)
  document
    .getElementById("openSolliMobile")
    .addEventListener("click", function () {
      document.querySelector(".sol-page").classList.add("active");
      changeUrl("/sollicitatie");
    });

  document
    .querySelector(".sol-home-button-container")
    .addEventListener("click", function () {
      document.querySelector(".sol-page").classList.remove("active");
      changeUrl(originalUrl);
    });

  // Slides opdrachtgever page in from right
  document
    .getElementById("openOpdrachtgever")
    .addEventListener("click", function () {
      document.querySelector(".opd-page").classList.add("active");
      changeUrl("/opdrachtgever");
    });

  // Slides opdrachtgever page in from right (mobile)
  document
    .getElementById("openOpdrachtgeverMobile")
    .addEventListener("click", function () {
      document.querySelector(".opd-page").classList.add("active");
      changeUrl("/opdrachtgever");
    });

  document
    .querySelector(".opd-home-button-container")
    .addEventListener("click", function () {
      document.querySelector(".opd-page").classList.remove("active");
      changeUrl(originalUrl);
    });

  // Intersection Observer for animations on sections
  const sections = document.querySelectorAll(
    ".section-title, .section-content, .btn2"
  );

  const observerOptions = {
    root: null,
    rootMargin: "-50px -50px -50px -50px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(section);
  });

  // Modal handling
  var modal = document.getElementById("sol-modal");
  var opdModal = document.getElementById("opd-modal");
  var span = document.getElementsByClassName("close")[0];
  var opdSpan = document.querySelector("#opd-modal .close");

  document.addEventListener("click", function (event) {
    if (
      event.target.id === "sol-signup-button" ||
      event.target.closest("#sol-signup-button")
    ) {
      modal.style.display = "flex";
    } else if (
      event.target.id === "opd-signup-button" ||
      event.target.closest("#opd-signup-button")
    ) {
      opdModal.style.display = "flex";
    }
  });

  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }

  if (opdSpan) {
    opdSpan.onclick = function () {
      opdModal.style.display = "none";
    };
  }

  let mouseDownOutside = false;

  window.onmousedown = function (event) {
    if (event.target == modal || event.target == opdModal) {
      mouseDownOutside = true;
    } else {
      mouseDownOutside = false;
    }
  };

  window.onmouseup = function (event) {
    if (event.target == modal && mouseDownOutside) {
      modal.style.display = "none";
    } else if (event.target == opdModal && mouseDownOutside) {
      opdModal.style.display = "none";
    }
    mouseDownOutside = false;
  };

  // Sol Form
  const sollicitatieForm = document.getElementById("sollicitatieForm");
  if (sollicitatieForm) {
    sollicitatieForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(this);

      fetch("./php/sendsolemail.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          sollicitatieForm.reset();
        })
        .catch((error) => {
          alert("Oops — something went wrong.");
          console.error(error);
        });
    });
  }
  // Opd Form
  const opdrachtgeverForm = document.getElementById("opdrachtgeverForm");
  if (opdrachtgeverForm) {
    opdrachtgeverForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(this);

      fetch("./php/sendopdemail.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          opdrachtgeverForm.reset();
        })
        .catch((error) => {
          alert("Oops — something went wrong.");
          console.error(error);
        });
    });
  }

  // blog.render();
});
