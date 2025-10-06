import { blog } from "./blog.js";

document.addEventListener("DOMContentLoaded", function () {
  // Store original URL to revert back to
  let originalUrl = window.location.pathname;

  // Slides sollicitatie page in from left
  document.getElementById("openSolli").addEventListener("click", function () {
    document.querySelector(".sol-page").classList.add("active");
    changeUrl("/sollicitatie");
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const megaBox = document.querySelector(".mega-box");

  menuToggle.addEventListener("click", () => {
    // 1. Schakelen tussen de 'open' klasse op het menu
    megaBox.classList.toggle("open");

    // 2. Schakelen tussen de 'is-active' klasse op de toggle-knop
    // Dit zorgt ervoor dat de CSS (.menu-toggle.is-active img) wordt toegepast
    menuToggle.classList.toggle("is-active");
  });

  particlesJS.load("particles-js", "particles.json", function () {
    console.log("callback - particles.js config loaded");
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

  blog.render();
});
