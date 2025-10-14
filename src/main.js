// import { blog } from "./blog.js";
import { gsap } from "gsap";
import { Flip } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(Flip, ScrollTrigger);

let rainbow = 0;
window.addEventListener("click", (e) => {
  const particle = document.createElement("part");
  document.body.appendChild(particle);

  rainbow += 2;

  const size = Math.random() * 120 + 30;
  gsap.set(particle, {
    x: e.clientX - size / 2,
    y: e.clientY - size / 2,
    width: size,
    height: size,
    filter: `blur(${(1 - (size - 30) / 120) * 10}px)`,
    backgroundColor: `hsl(${rainbow}, 70%, 50%)`,
  });

  gsap.to(particle, {
    x: "+=random(-200, 200)",
    y: "+=random(-200, 200)",
    opacity: 0,
    duration: "random(4, 7)",
    ease: "power2.out",
    onComplete: () => {
      particle.remove();
    },
  });
});

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

  console.clear();

  window.addEventListener("load", () => {
    const flip = Flip.fit("#headerLogo", "#heroLogo", {
      scale: true,
      duration: 1,
      ease: "none",
    });
    flip.pause(1);

    ScrollTrigger.create({
      trigger: ".header",
      start: "top top",
      end: "top top",
      endTrigger: "#heroLogo",
      markers: true,
      onUpdate: (s) => {
        flip.progress(1 - s.progress);
      },
    });

    const headerTween = gsap
      .to(".header", {
        yPercent: -100,
        ease: "power1.inOut",
        paused: true,
      })
      .reverse();

    ScrollTrigger.create({
      trigger: "#heroLogo",
      start: "top top",
      end: "+=" + document.body.clientHeight,
      markers: {
        indent: 200,
      },
      onUpdate: (s) => {
        console.log(s.direction > 0);
        headerTween.reversed(s.direction < 0);
      },
    });
  });

  // const lenis = new Lenis({
  //   autoRaf: true,
  // });

  // lenis.on("scroll", (e) => {
  //   console.log(e);
  // });

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
