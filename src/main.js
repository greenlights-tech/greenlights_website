import { blog } from "./blog.js";
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase);

function changeUrl(path, title = null) {
  window.history.pushState(null, title, path);
}

// let smoother = ScrollSmoother.create({
//   wrapper: "#smooth-wrapper",
//   content: "#smooth-content",
//   smooth: 2,
//   effects: true,
//   normalizeScroll: true,
// });

document.addEventListener("DOMContentLoaded", function () {
  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  lenis.stop();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  // Store original URL to revert back to
  let originalUrl = window.location.pathname;

  (async () => {
    try {
      await loadFirePreset(tsParticles);

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
              enable: true,
              speed: 1,
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
              value: "#333a47ff",
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

  document.fonts.ready.then(() => {
    // const ticker = document.querySelector(".ticker-content");
    // ticker.style.transform = `translateX(${Math.random() * 100}%)`;

    // Slides sollicitatie page in from left (mobile)
    // document
    //   .getElementById("openSolliMobile")
    //   .addEventListener("click", function () {
    //     document.querySelector(".sol-page").classList.add("active");
    //     changeUrl("/sollicitatie");
    //   });

    // Slides opdrachtgever page in from right (mobile)
    // document
    //   .getElementById("openOpdrachtgeverMobile")
    //   .addEventListener("click", function () {
    //     document.querySelector(".opd-page").classList.add("active");
    //     changeUrl("/opdrachtgever");
    //   });

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
    const logo = document.querySelector(".logo");
    const originalContainer = document.querySelector(".original-container");
    const newContainer = document.querySelector(".new-container");
    const hero = document.querySelector(".hero");
    const midTextSolli = document.querySelector(".mid-text-sollicitant");
    const midTextOpdr = document.querySelector(".mid-text-opdrachtgever");
    const teaserLeft = document.querySelector(
      ".teasers-container .buttons .left"
    );
    const teaserRight = document.querySelector(
      ".teasers-container .buttons .right"
    );
    const tagline = document.querySelector(
      ".new-container-wrapper .tagline-wrapper .tagline"
    );
    const textLeft = teaserLeft.querySelector(".centered");
    const textRight = teaserRight.querySelector(".centered");
    const color1 = document.querySelector("#color1");
    const color2 = document.querySelector("#color2");
    const logoSVG = document.querySelector(".child1"); // De hoofds-SVG

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

    const icon2 = document.querySelector(".icon2");

    // Maak een oneindige 'zweef'-animatie
    gsap.to(icon2, {
      // Beweeg het 10 pixels omhoog en omlaag
      y: 10,

      // Voeg een kleine draaiing toe voor een organischer effect (optioneel)
      rotation: 0.5,

      // Duur van de beweging (van boven naar beneden, of vice versa)
      duration: 3,

      // Zorgt voor een vloeiende, zachte beweging
      ease: "sine.inOut",

      // Laat de animatie heen en weer gaan (yoyo-effect)
      yoyo: true,

      // Herhaal oneindig (-1)
      repeat: -1,

      // Start de animatie met een lichte willekeurige vertraging om meerdere iconen te desynchroniseren (optioneel)
      delay: gsap.utils.random(0, 1),
    });

    // Initialisatie: Logo op 0.2 opacity
    gsap.set(logoSVG, { visibility: "visible", opacity: 0.4 });

    // Initialisatie: Zet de Gradiënt op Zwart (bijv. #333 en #000)
    // gsap.set(color1, {
    //   opacity: 0.1,
    //   "stop-color": "#000",
    // });
    // gsap.set(color2, {
    //   opacity: 0.1,
    //   "stop-color": "#000000",
    // });

    const splitTagline = SplitText.create(tagline, {
      type: "chars",
      charsClass: "char",
    });

    // de mid-text-sollicitant splitsen in woorden en characters

    const splitMidTextSolli = SplitText.create(midTextSolli, {
      type: "chars, words",
      charsClass: "char",
      wordsClass: "word",
    });

    gsap.set(midTextSolli, { visibility: "visible" });
    gsap.set(splitMidTextSolli.chars, {
      opacity: 0,
      yPercent: 100,
      rotateX: -90,
      filter: "blur(10px)",
    });

    // de mid-text-opdrachtgever splitsen in woorden en characters

    const splitMidTextOpdr = SplitText.create(midTextOpdr, {
      type: "chars, words",
      charsClass: "char",
      wordsClass: "word",
    });

    gsap.set(midTextOpdr, { visibility: "visible" });
    gsap.set(splitMidTextOpdr.chars, {
      opacity: 0,
      yPercent: 100,
      rotateX: -90,
      filter: "blur(10px)",
    });

    gsap.set([teaserLeft, teaserRight], {
      scale: 0,
      opacity: 0,
      visibility: "hidden", // Zorgt dat ze onzichtbaar zijn bij het laden
    });

    const switchButton = $(".switch");

    const tl = gsap.timeline();

    switchButton.one("change", function () {
      const state = Flip.getState(logo, ".hero");

      (logo.parentNode === originalContainer
        ? newContainer
        : originalContainer
      ).appendChild(logo);

      tl.fromTo(
        logoSVG,
        {
          // STARTWAARDEN (FROM)
          opacity: 0.1, // Start Onzichtbaar
          filter: "none", // Start zonder gloed
        },
        {
          // EINDWAARDEN (TO)
          opacity: 1,
          filter: "drop-shadow(0 0 3px #00dc82)",
          duration: 0.3,
          ease: "power2.inOut",
        },
        0 // Start direct
      );
      // Animeer de stop-kleuren terug naar groen
      tl.to(
        color1,
        {
          opacity: 1,
          "stop-color": "#20FF85", // Groen 1
          duration: 0.3,
          ease: "power1.out",
        },
        0 // Start tegelijk
      );

      tl.to(
        color2,
        {
          opacity: 1,
          ease: "power2.out",
          "stop-color": "#00D661", // Groen 2
          duration: 0.3,
          ease: "power1.out",
        },
        0 // Start tegelijk
      );

      tl.to(
        logoSVG,
        {
          filter: "drop-shadow(0 0 1px #00dc82)",
          duration: 1.2,
          ease: "power2.inOut",
        },
        1 // Start op tijdstip 1, tegelijk met de Flip-animatie
      );
      tl.add(
        Flip.from(state, {
          scale: true,
          duration: 1.2,
          nested: true,
          ease: "power2.inOut",
          zIndex: 1000,
        }),
        1
      ),
        tl.to(
          switchButton,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            ease: "power2.out",
          },
          0.7 // Start tegelijk met de Flip
        );
      // tl.to(
      //   hero,
      //   {
      //     backgroundColor: "transparent",
      //     duration: 1,
      //     ease: "power2.inOut",
      //   },
      //   1.5
      // );

      tl.to(
        bg,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        2
      ),
        // gsap.set(tagline, { visibility: "visible" });
        gsap.set(splitTagline.chars, {
          opacity: 0,
        });
      tl.to(
        splitTagline.chars,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.05,
        },
        2
      );

      tl.to(
        ".tagline-wrapper",
        {
          opacity: 1,
          duration: 1,
          ease: "none",
        },
        2
      ),
        // tl.to(
        //   split.chars,
        //   {
        //     opacity: 1,
        //     yPercent: 20,
        //     rotateX: 0,
        //     filter: "blur(0px)",
        //     stagger: 0.01,
        //     duration: 1,
        //     ease: "power2.out",
        //   },
        //   0.6
        // );

        gsap.set([teaserLeft, teaserRight], {
          visibility: "visible",
          opacity: 1,
        });

      tl.fromTo(
        teaserLeft,
        {
          scale: 0,
        },
        {
          scale: 1,
          ease: "expo.out",
          duration: 2,
        },
        3
      );

      tl.fromTo(
        teaserRight,
        {
          scale: 0,
        },
        {
          scale: 1,
          ease: "expo.out",
          duration: 2,
        },
        3
      );

      // Functie voor schaalvergroting bij HOVER IN
      function handleHoverIn(element) {
        // 1. Bepaal welke midText-karakters geanimeerd moeten worden
        let charsToAnimate;

        if (element === teaserLeft) {
          // Als we over de linker teaser hooveren, gebruik Solli tekst
          charsToAnimate = splitMidTextSolli.chars;
        } else if (element === teaserRight) {
          // Als we over de rechter teaser hooveren, gebruik Opdr tekst
          charsToAnimate = splitMidTextOpdr.chars;
        } else {
          // Valbeveiliging
          return;
        }
        gsap.to(element, {
          scale: 1.1,
          duration: 0.4,
          ease: "power1.inOut",
        });
        // Animeer de midText karakters zichtbaar bij hover
        gsap.to(charsToAnimate, {
          opacity: 1,
          yPercent: 20,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: 0.01,
          duration: 1,
          ease: "power2.out",
          overwrite: true,
        });
      }

      // Functie voor schaalverkleining bij HOVER UIT
      function handleHoverOut(element) {
        // 1. Bepaal welke midText-karakters geanimeerd moeten worden
        let charsToAnimate;

        if (element === teaserLeft) {
          // Als we van de linker teaser afgaan, gebruik Solli tekst
          charsToAnimate = splitMidTextSolli.chars;
        } else if (element === teaserRight) {
          // Als we van de rechter teaser afgaan, gebruik Opdr tekst
          charsToAnimate = splitMidTextOpdr.chars;
        } else {
          return;
        }
        gsap.to(element, {
          scale: 1,
          duration: 0.4,
          ease: "power1.inOut",
        });
        // MidText karakters animatie: 'Van Boven naar Beneden'
        gsap.to(charsToAnimate, {
          opacity: 0,
          yPercent: 180,
          rotateX: 90,
          filter: "blur(10px)",
          stagger: {
            each: 0.01,
            from: "start", // START de animatie vanaf het eerste karakter
          },
          duration: 0.5,
          ease: "power2.in",
          overwrite: true,
        });
      }

      tl.eventCallback("onComplete", () => {
        // Koppelt de hover-events pas als de intro-animatie klaar is

        teaserLeft.addEventListener("mouseover", () =>
          handleHoverIn(teaserLeft)
        );
        teaserLeft.addEventListener("mouseout", () =>
          handleHoverOut(teaserLeft)
        );

        teaserRight.addEventListener("mouseover", () =>
          handleHoverIn(teaserRight)
        );
        teaserRight.addEventListener("mouseout", () =>
          handleHoverOut(teaserRight)
        );
      });
    });

    // tl.to(midText, {
    //   opacity: 0,
    //   ease: "power2.inOut",
    //   duration: 3,
    // });

    const solPage = document.querySelector(".sol-page");

    gsap.set(solPage, { xPercent: -100, visibility: "visible" });

    document
      .getElementById("openSolli")
      .addEventListener("click", function (event) {
        if (lenis) {
          lenis.start();
        }

        gsap.to(solPage, {
          xPercent: 0, // Schuift de pagina naar 0% (zichtbaar)
          duration: 1.5,
          ease: "power3.inOut",
          onStart: () => {
            solPage.classList.add("active");
          },
        });
      });

    const opdPage = document.querySelector(".opd-page");

    gsap.set(opdPage, { xPercent: 100, visibility: "visible" });

    document
      .getElementById("openOpdrachtgever")
      .addEventListener("click", function (event) {
        if (lenis) {
          lenis.start();
        }

        gsap.to(opdPage, {
          xPercent: 0, // Schuift de pagina naar 0% (zichtbaar)
          duration: 1.5,
          ease: "power3.inOut",
          onStart: () => {
            opdPage.classList.add("active");
          },
        });
      });

    newContainer.addEventListener("click", function () {
      // Stop de Lenis scroll direct
      if (lenis) {
        lenis.stop();
      }

      // Controleer en sluit de solpage
      if (solPage && solPage.classList.contains("active")) {
        closePage(solPage, -100);
      }

      // Controleer en sluit de opdpage
      if (opdPage && opdPage.classList.contains("active")) {
        closePage(opdPage, 100);
      }
    });

    // Functie om de navigatie naar Home af te handelen
    function closePage(pageElement, targetX) {
      // Blokkeer de scroll terwijl de overgang plaatsvindt
      if (lenis) {
        lenis.stop();
      }

      // Schuif de pagina uit beeld
      gsap.to(pageElement, {
        xPercent: targetX,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          // Verwijder de 'active' class na de animatie
          pageElement.classList.remove("active");
        },
      });
    }

    // Listener voor de solPage home button
    document
      .getElementById("closeSolli")
      .addEventListener("click", function (event) {
        event.preventDefault();
        closePage(solPage, -100); // SOL pagina schuift naar links (-100%)
      });

    // Listener voor de opdPage home button
    document
      .getElementById("closeOpdrachtgever")
      .addEventListener("click", function (event) {
        event.preventDefault();
        closePage(opdPage, 100); // OPD pagina schuift naar rechts (100%)
      });

    // const tlScroll = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: teasersContainer,
    //     start: "clamp(top bottom)",
    //     end: "clamp(center center)",
    //     scrub: true,
    //     pin: pin,
    //     pinSpacing: false,
    //   },
    // });

    // tlScroll.to(
    //   midText,
    //   {
    //     opacity: 0,
    //     ease: "power2.inOut",
    //     duration: 3,
    //   },
    //   0
    // );

    // tlScroll.from(
    //   teaserLeft,
    //   {
    //     y: 300,
    //     ease: "power3.inOut",
    //   },
    //   0
    // );

    // 2. TEASER RIGHT: Start van een andere positie (100px omlaag) en komt omhoog
    // tlScroll.from(
    //   teaserRight,
    //   {
    //     y: 100,
    //     ease: "power3.inOut",
    //   },
    //   0
    // );

    // tlScroll.to(teaserLeft, { scale: 1 });
    // tlScroll.to(teaserLeft, { scale: 1.1 });

    // tlScroll.to(teaserRight, { scale: 1 });
    // tlScroll.to(teaserRight, { scale: 1.1 });

    // gsap.to(teaserRight, {
    //   rotation: 5,
    //   ease: "none",
    //   duration: 4,
    //   repeat: +1,
    // });

    // const half = content.clientWidth / 2
    // const wrap = gsap.utils.wrap(-half, 0);

    // const sentence1 = document.querySelector(
    //   ".container-mid-text .sentence1 p"
    // );

    // const sentence2 = document.querySelector(
    //   ".container-mid-text .sentence2 p"
    // );

    // gsap.to(sentence1, {
    //   x: -sentence1.offsetWidth / 2,
    //   ease: "none",
    //   duration: 120,
    //   repeat: -1,
    // });

    // gsap.to(sentence2, {
    //   x: +sentence1.offsetWidth / 2,
    //   ease: "none",
    //   duration: 120,
    //   repeat: -1,
    // });

    // const infoContent = document.querySelector(
    //   ".info-container .info-title .info-content"
    // );

    // let skewSetter = gsap.quickTo(infoContent, "skewY"),
    //   clamp = gsap.utils.clamp(-20, 20);

    // ScrollSmoother.create({
    //   wrapper: "#wrapper",
    //   content: "#content",
    //   smooth: 2,
    //   speed: 3,
    //   effects: true,
    //   onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -50)),
    //   onStop: () => skewSetter(0),
    // });

    // let splitFooter;
    // SplitText.create(".secRow ul li a", {
    //   type: "words, lines",
    //   linesClass: "line",
    //   autoSplit: true,
    //   mask: "lines",
    //   onSplit: (self) => {
    //     splitFooter = gsap.from(self.lines, {
    //       duration: 0.6,
    //       yPercent: 100,
    //       opacity: 0,
    //       stagger: 0.1,
    //       ease: "expo.out",
    //     });
    //     return splitFooter;
    //   },
    // });

    const root = document.querySelector(".homepage .info-container-effect");
    const pinHeight = root.querySelector(".info-container-effect .pin-height");
    const infoContainer = document.querySelector(".info-container");
    const alinea = document.querySelectorAll(".alinea");

    const splitInfoPagee = SplitText.create(alinea, {
      type: "words",
      wordsClass: "word",
      mask: "words",
    });

    // gsap.set(infoContent, { visibility: "visible" });
    gsap.set(splitInfoPagee.words, {
      yPercent: 100,
      opacity: 0,
    });

    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: infoContainer,
      pinSpacing: false,
    });

    const tlInfo = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tlInfo.to(splitInfoPagee.words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.5,
      ease: "power1.out",
    });

    const container = document.querySelector(".info-container-hoe .container");
    const cardsContainer = container.querySelector(".cards");
    const cards = document.querySelectorAll(".card");
    const distance = cardsContainer.clientWidth - window.innerWidth;

    // HORIZONTALE SCROLL TWEEN (CONTAINER)
    const scrollTween = gsap.to(cardsContainer, {
      x: -distance, // Schuif de container de berekende afstand naar links
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=" + distance,
      },
    });

    // STAGGER EFFECT VOOR ELKE KAART
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          x: 100,
        },
        {
          // Eindpositie: hun normale positie
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 120%",
            end: "right -20%",
            scrub: true,
          },
        }
      );
    });
  });
});

// const infoContent = document.querySelector(".first-alinea");

// const splitInfoPage = SplitText.create(infoContent, {
//   type: "lines",
//   linesClass: "line",
//   mask: "lines",
// });

// gsap.set(infoContent, { visibility: "visible" });
// gsap.set(splitInfoPage.lines, {
//   yPercent: 100,
//   opacity: 0,
// });

// gsap.to(splitInfoPage.lines, {
//   yPercent: 0,
//   opacity: 1,
//   duration: 0.75,
//   stagger: 0.1,
//   ease: "power1.out",
// });

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
