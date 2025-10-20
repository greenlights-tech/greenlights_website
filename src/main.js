// import { blog } from "./blog.js";
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  MorphSVGPlugin
);

let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true,
  normalizeScroll: true,
});

document.addEventListener("DOMContentLoaded", function () {
  // Store original URL to revert back to
  let originalUrl = window.location.pathname;

  (async () => {
    try {
      await loadFirePreset(tsParticles);

      // De code in het 'try' blok gaat hier verder nadat de preset is geladen
      tsParticles.load({
        id: "tsparticles",
        options: {
          particles: {
            color: {
              value: ["rgb(0, 230, 104)", "rgb(0, 230, 104)"],
            },

            number: {
              value: 0, // Dit zorgt ervoor dat er geen deeltjes te zien zijn bij het laden
              density: { enable: false },
            },

            size: {
              value: 3,
            },
            move: {
              enable: true, // Zorg ervoor dat beweging is ingeschakeld
              speed: 1, // PAS DEZE WAARDE AAN: Lagere waarde = langzamer, Hogere waarde = sneller
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: false,
              },
            },
          },
          preset: "fire",
          detectsOn: "canvas",

          IHoverEvent: {
            enable: false,
          },

          onClick: {
            enable: true,
            mode: "push",
          },
          resize: true,

          background: {
            color: {
              value: "#303847",
            },

            image: " #303847",
          },
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
        },
      });
    } catch (error) {
      // Als er een probleem is met het laden van de preset
      console.error("Fout bij het laden van de Firefly preset:", error);
    }
  })();

  // const flip = Flip.fit("#headerLogo", "#heroLogo", {
  //   scale: true,
  //   duration: 1,
  //   fitChild: ".child1",
  //   ease: "power1.inOut",
  // });
  // flip.pause(1);

  // ScrollTrigger.create({
  //   trigger: ".header",
  //   start: "top top",
  //   end: "top top",
  //   scrub: true,
  //   endTrigger: "#heroLogo",

  //   markers: true,
  //   onUpdate: (s) => {
  //     flip.progress(1 - s.progress);
  //   },
  // });

  // const headerTween = gsap
  //   .to(".header", {
  //     yPercent: -100,
  //     ease: "power1.inOut",
  //     paused: true,
  //   })
  //   .reverse();

  // ScrollTrigger.create({
  //   trigger: "#heroLogo",
  //   start: "top top",
  //   end: () => `+=${document.body.clientHeight}`,
  //   markers: {
  //     indent: 200,
  //   },
  //   onUpdate: (s) => {
  //     console.log(s.direction > 0);
  //     headerTween.reversed(s.direction < 0);
  //   },
  // });

  // const lenis = new Lenis({
  //   autoRaf: true,
  // });

  // lenis.on("scroll", (e) => {
  //   console.log(e);
  // });

  const ticker = document.querySelector(".ticker-content");
  ticker.style.transform = `translateX(${Math.random() * 100}%)`;

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
  const bg = document.querySelector(".header .container .bg");
  const logo = document.querySelector(".logo"),
    originalContainer = document.querySelector(".original-container"),
    newContainer = document.querySelector(".new-container");
  const hero = document.querySelector(".hero");
  const midText = document.querySelector(".mid-text");
  // De twee vormen die je wilt morphen: de ene is de vorm van het logo, de andere het icoon.
  // const logoPath = document.querySelector("#logoPath");
  // const rectShape = document.querySelector("#rectId");
  // const ellipseShape = document.querySelector("#ellipseId");
  // const rect2Shape = document.querySelector("#rect2Id");
  // const ellip2seShape = document.querySelector("#ellipse2Id");
  // const logoGlow = document.querySelector(".logo-glow");

  // MorphSVGPlugin.convertToPath("rect, ellipse");

  // gsap.to("#logoPath", {
  //   duration: 10,
  //   morphSVG: ellipseShape,
  //   repeat: 1,
  //   yoyo: true,
  //   repeatDelay: 0.2,
  // });

  const split = SplitText.create(midText, {
    type: "chars, words",
    charsClass: "char",
    wordsClass: "word",
  });

  gsap.set(midText, { visibility: "visible" });
  gsap.set(split.chars, {
    opacity: 0,
    yPercent: 100,
    rotateX: -90,
    filter: "blur(10px)",
  });

  const state = Flip.getState(logo, ".hero");

  (logo.parentNode === originalContainer
    ? newContainer
    : originalContainer
  ).appendChild(logo);

  const tl = gsap.timeline();

  tl.add(
    Flip.from(state, {
      scale: true,
      duration: 1.2,
      delay: 0.5,
      nested: true,
      ease: "power2.inOut",
      zIndex: 100,
    }),
    0
  );

  tl.to(
    hero,
    {
      // backgroundColor: "#303847",
      backgroundColor: "transparent",
      duration: 1.2,
      delay: 0.5,
      ease: "power2.inOut",
    },
    0 // Start op hetzelfde moment als de Flip animatie
  );

  tl.to(
    bg,
    {
      delay: 0.5,
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut",
    },
    0
  );

  tl.to(
    split.chars,
    {
      opacity: 1,
      yPercent: 20,
      rotateX: 0,
      filter: "blur(0px)",
      stagger: 0.02, // bepaalt snelheid van na elkaar
      duration: 1,
      ease: "power2.inOut",
    },
    ">-0.6"
  );

  const teasersContainer = document.querySelector(".teasers-container");

  const headerHero = document.querySelector(".header-hero");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: teasersContainer,
        start: "top bottom", // Start wanneer de top van de teasers de bodem van de viewport raakt
        end: "top top", // Einde wanneer de top van de teasers de top van de viewport raakt
        scrub: true,
        markers: true,
        pin: headerHero,
        pinSpacing: false,
      },
    })

    .to(
      teasersContainer,
      {
        y: 0,
        ease: "none",
      },
      0
    )
    .to(
      midText,
      {
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.3,
      },
      0
    );

  // .to(morphAnimation, { time: 1 }, 0);

  // ScrollTrigger.create({
  //   trigger: ".hero",
  //   start: "clamp(bottom bottom)",
  //   end: "clamp(bottom top)",
  //   scrub: true,
  //   pin: ".header-hero",
  //   pinSpacing: false,
  //   markers: true,
  // });

  // gsap.defaults({
  //   stagger: {
  //     each: 1,
  //     repeat: -1,
  //     from: "random",
  //   },
  //   ease: "none",
  // });

  // gsap.to(".box:nth-child(even)", {
  //   y: -hero.offsetHeight,
  //   duration: 20,
  // });

  // gsap.to(".box:nth-child(odd)", {
  //   y: -hero.offsetHeight,
  //   duration: 30,
  // });
});
