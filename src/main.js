// import { blog } from "./blog.js";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import Swiper from "swiper/bundle";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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

  // const ticker = document.querySelector(".ticker-content");
  // ticker.style.transform = `translateX(${Math.random() * 100}%)`;

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

  document.fonts.ready.then(() => {
    // ---------- Globale variabelen ----------
    let swiper;
    let solliTextTL = null; // Timeline voor linker teaser (Solli) tekst
    let opdrTextTL = null; // Timeline voor rechter teaser (Opdr) tekst

    // ---------- DOM elementen ----------
    const bg = document.querySelector(".header .container .bg");
    const logo = document.querySelector(".child1");
    const originalContainer = document.querySelector(".original-container");
    const newContainer = document.querySelector(".new-container");
    const midTextSolli = document.querySelector(".mid-text-sollicitant");
    const midTextOpdr = document.querySelector(".mid-text-opdrachtgever");
    const swiperContainer = document.querySelector(".teasers-container-swiper");
    const leftSwiper = document.querySelector(".leftSwiper");
    const rightSwiper = document.querySelector(".rightSwiper");
    const tagline = document.querySelector(
      ".new-container-wrapper .tagline-wrapper .tagline"
    );
    const solPage = document.querySelector(".sol-page");
    const opdPage = document.querySelector(".opd-page");
    const infoContainerEffect = document.querySelector(
      ".info-container-effect"
    );
    const infoContainerMV = document.querySelector(
      ".info-container-missievisie"
    );
    const infoContainerHoe = document.querySelector(".info-container-hoe");
    const footerContainer = document.querySelector(".footer-container");
    const color1 = document.querySelector("#color1");
    const color2 = document.querySelector("#color2");
    const icon2 = document.querySelector(".hero .icon2");
    const switchButton = $(".switch");
    const whatsappButton = document.querySelector(".container-whatsapp-knop");

    // ---------- Split text voor tagline en mid texts ----------
    const splitTagline = SplitText.create(tagline, {
      type: "chars",
      charsClass: "char",
      autoSplit: true,
    });
    const splitMidTextSolli = SplitText.create(midTextSolli, {
      type: "chars",
      charsClass: "char",
      // autoSplit: true,
    });
    const splitMidTextOpdr = SplitText.create(midTextOpdr, {
      type: "chars",
      charsClass: "char",
      // autoSplit: true,
    });

    // --------- Init GSAP States ----------

    gsap.set(
      [
        solPage,
        opdPage,
        infoContainerEffect,
        infoContainerMV,
        infoContainerHoe,
        footerContainer,
      ],
      {
        opacity: 0,
        visibility: "hidden",
      }
    );
    gsap.set(logo, { visibility: "visible" });
    gsap.set(color1, {
      opacity: 0.1,
      "stop-color": "#00000057",
    });
    gsap.set(color2, {
      opacity: 0.1,
      "stop-color": "#00000057",
    });
    gsap.set(splitTagline.chars, {
      opacity: 0,
    });
    gsap.set(midTextSolli, { visibility: "visible" });
    gsap.set(splitMidTextSolli.chars, {
      opacity: 0,
      yPercent: 100,
      rotateX: -90,
      filter: "blur(10px)",
    });
    gsap.set(midTextOpdr, { visibility: "visible" });
    gsap.set(splitMidTextOpdr.chars, {
      opacity: 0,
      yPercent: 100,
      rotateX: -90,
      filter: "blur(10px)",
    });
    // gsap.set([splitMidTextSolli.chars, splitMidTextOpdr.chars],  {
    //   opacity: 0,
    //   yPercent: 100,
    //   rotateX: -90,
    //   filter: "blur(10px)",
    // });
    gsap.set(swiperContainer, {
      scale: 0,
      opacity: 0,
      visibility: "hidden",
    });

    gsap.set(whatsappButton, {
      opacity: 0,
      scale: 0.5,
      visibility: "hidden",
    });

    gsap.set(solPage, { xPercent: -100, opacity: 1 });
    gsap.set(opdPage, { xPercent: 100, opacity: 1 });

    // --------- Swiper ----------
    function initSwiper() {
      // voorkomt dubbele init
      if (swiper) return swiper;

      swiper = new Swiper(".mySwiper", {
        // grabCursor: true,
        // centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 24,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          992: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        },
      });
    }

    // swiper.on("resize", () => swiper.update());
    // window.addEventListener("resize", () => swiper.update());

    // return swiper;

    // --------- Intro Animatie ----------
    function startIntroAnimation() {
      const tl = gsap.timeline();

      const zweefTL = gsap.timeline({ repeat: -1, yoyo: true });

      // Start de zweefanimatie (oneindig, totdat er geklikt wordt)
      zweefTL.to(icon2, {
        y: -20,
        rotation: 0.5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        // Herhaal oneindig (-1)
        repeat: -1,
        delay: gsap.utils.random(0, 1),
      });

      switchButton.one("change", function () {
        // Stop de oneindige zweefanimatie
        zweefTL.kill();

        tl.to(
          icon2,
          {
            scale: 0,
            duration: 0.5,
            ease: "none",
            zIndex: -1,
          },
          0
        );

        const state = Flip.getState(logo);

        (logo.parentNode === originalContainer
          ? newContainer
          : originalContainer
        ).appendChild(logo);

        tl.fromTo(
          logo,
          {
            // STARTWAARDEN (FROM)
            filter: "none", // Start zonder gloed
          },
          {
            // EINDWAARDEN (TO)
            filter: "drop-shadow(0 0 3px #00dc82)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.5 // Start direct
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
          0.5 // Start tegelijk
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
          0.5 // Start tegelijk
        );

        tl.to(
          logo,
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

        tl.to(
          bg,
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          2
        ),
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
        );

        gsap.set(swiperContainer, {
          visibility: "visible",
          opacity: 0,
          scale: 0,
        });

        tl.to(
          swiperContainer,
          {
            opacity: 1,
            scale: 1,
            ease: "expo.out",
            duration: 2,
          },
          3
        );

        // tl.eventCallback("onComplete", () => {
        //   setupSwiperEffects();
        //   // introAnimationCompleted = true;
        //   // Koppelt de hover-events pas als de intro-animatie klaar is
        // });
      });
    }

    // --------- Swiper Effects ----------
    function setupSwiperEffects() {
      if (!swiper) {
        return; // Stop de uitvoering van de functie als swiper null is
      }

      // Event listener om de pagina te openen bij klik op een slide
      swiper.slides.forEach((slide, index) => {
        const teaserElement = slide.querySelector(".teaser-swiper");

        teaserElement.addEventListener("click", function () {
          if (lenis) lenis.stop();

          // Slide 0 → solPage openen
          if (index === 0) {
            gsap.to(solPage, {
              xPercent: 0,
              visibility: "visible",
              duration: 1.5,
              ease: "power3.inOut",
              onStart: () => solPage.classList.add("active"),
              onComplete: () => {
                showBounceButton(whatsappButton);
                revealHiddenContent();
                if (lenis) lenis.start();
              },
            });
          }

          // Slide 1 → opdPage openen
          else if (index === 1) {
            gsap.to(opdPage, {
              xPercent: 0,
              visibility: "visible",
              duration: 1.5,
              ease: "power3.inOut",
              onStart: () => opdPage.classList.add("active"),
              onComplete: () => {
                showBounceButton(whatsappButton);
                revealHiddenContent();
                if (lenis) lenis.start();
              },
            });
          }
        });
      });
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      // LEFT HOVER IN
      leftSwiper.addEventListener("pointerenter", () => {
        // if (solliTextTL) solliTextTL.kill();

        // scale
        gsap.to(leftSwiper, {
          scale: 1.1,
          duration: 0.4,
          ease: "power1.inOut",
        });

        // midtext in
        solliTextTL = gsap.timeline({ defaults: { overwrite: true } });
        solliTextTL.to(splitMidTextSolli.chars, {
          opacity: 1,
          yPercent: 20,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: 0.01,
          duration: 1,
          ease: "power2.out",
        });
      });

      // LEFT HOVER OUT
      leftSwiper.addEventListener("pointerleave", () => {
        if (solliTextTL) solliTextTL.kill();

        gsap.to(leftSwiper, {
          scale: 1,
          duration: 0.4,
          ease: "power1.inOut",
        });

        solliTextTL = gsap.timeline({ defaults: { overwrite: true } });
        solliTextTL.to(splitMidTextSolli.chars, {
          opacity: 0,
          yPercent: 180,
          rotateX: 90,
          filter: "blur(10px)",
          stagger: 0.01,
          duration: 0.5,
          ease: "power2.in",
        });
      });

      // RIGHT HOVER IN
      rightSwiper.addEventListener("mouseover", () => {
        // if (opdrTextTL) opdrTextTL.kill();

        gsap.to(rightSwiper, {
          scale: 1.1,
          duration: 0.4,
          ease: "power1.inOut",
        });

        opdrTextTL = gsap.timeline({ defaults: { overwrite: true } });
        opdrTextTL.to(splitMidTextOpdr.chars, {
          opacity: 1,
          yPercent: 20,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: 0.01,
          duration: 1,
          ease: "power2.out",
        });
      });

      // RIGHT HOVER OUT
      rightSwiper.addEventListener("mouseout", () => {
        if (opdrTextTL) opdrTextTL.kill();

        gsap.to(rightSwiper, {
          scale: 1,
          duration: 0.4,
          ease: "power1.inOut",
        });

        opdrTextTL = gsap.timeline({ defaults: { overwrite: true } });
        opdrTextTL.to(splitMidTextOpdr.chars, {
          opacity: 0,
          yPercent: 180,
          rotateX: 90,
          filter: "blur(10px)",
          stagger: 0.01,
          duration: 0.5,
          ease: "power2.in",
        });
      });
    });

    // tl.eventCallback("onComplete", () => {
    //   leftSwiper.addEventListener("mouseenter", () => handleHoverIn(leftSwiper));
    //   leftSwiper.addEventListener("mouseleave", () => handleHoverOut(leftSwiper));

    //   rightSwiper.addEventListener("mouseenter", () => handleHoverIn(rightSwiper));
    //   rightSwiper.addEventListener("mouseleave", () => handleHoverOut(rightSwiper));
    // });

    // const isLargeScreen = window.innerWidth >= 992;
    // if (!isLargeScreen) {
    //   gsap.set([splitMidTextSolli.chars, splitMidTextOpdr.chars], {
    //     opacity: 0,
    //     yPercent: 180,
    //     rotateX: 90,
    //     filter: "blur(10px)",
    //   });
    //   // de slideChange event listener koppelen (Tekst animatie)
    //   swiper.on("slideChange", function () {
    //     const activeIndex = swiper.activeIndex;
    //     const solliChars = splitMidTextSolli.chars;
    //     const opdrChars = splitMidTextOpdr.chars;

    //     // Stop en vernietig de lopende timeline van de vorige animatie
    //     if (textAnimationTL) {
    //       textAnimationTL.kill();
    //     }

    //     // Maak een nieuwe Timeline
    //     textAnimationTL = gsap.timeline({ defaults: { overwrite: true } });

    //     let prevCharsToAnimate;
    //     let currentCharsToAnimate;

    //     // Logica voor de VERDWIJNENDE tekst
    //     if (prevIndex !== -1 && prevIndex !== activeIndex) {
    //       prevCharsToAnimate = prevIndex === 0 ? solliChars : opdrChars;

    //       // Voeg de verdwijn-animatie toe
    //       textAnimationTL.to(
    //         prevCharsToAnimate,
    //         {
    //           opacity: 0,
    //           yPercent: 180,
    //           rotateX: 90,
    //           filter: "blur(10px)",
    //           stagger: {
    //             each: 0.01,
    //             from: "start",
    //           },
    //           duration: 0.5,
    //           ease: "power2.in",
    //         },
    //         0
    //       );
    //     }

    //     // Logica voor de verschijnende tekst
    //     currentCharsToAnimate = activeIndex === 0 ? solliChars : opdrChars;

    //     // Zorgt dat de verschijnende tekst klaar staat voor de animatie
    //     gsap.set(currentCharsToAnimate, {
    //       opacity: 0,
    //       yPercent: 180,
    //       rotateX: 90,
    //       filter: "blur(10px)",
    //     });

    //     // Voegt de verschijn-animatie toe
    //     textAnimationTL.to(
    //       currentCharsToAnimate,
    //       {
    //         opacity: 1,
    //         yPercent: 20,
    //         rotateX: 0,
    //         filter: "blur(0px)",
    //         stagger: 0.01,
    //         duration: 1,
    //         ease: "power2.out",
    //       },
    //       prevIndex !== -1 ? 0.1 : 0
    //     );

    //     // Update de vorige index
    //     prevIndex = activeIndex;
    //   });

    //   swiper.emit("slideChange");
    // } else {
    //   // DESKTOP HOVER INSTELLING
    //   swiper.off("slideChange");

    //   // Roep de functie aan die de HOVER events koppelt
    //   setupHoverEffects();

    //   // Nu moet de tekst, die eventueel zichtbaar was op mobiel,
    //   // direct gereset worden naar de verborgen GSAP 'set' staat.
    //   gsap.set([splitMidTextSolli.chars, splitMidTextOpdr.chars], {
    //     opacity: 0,
    //     yPercent: 100, // of de waarde die je in je GSAP.set hebt
    //     rotateX: -90,
    //     filter: "blur(10px)",
    //   });
    // }

    // --------- Hover Animaties ----------
    // function setupHoverEffects() {
    //   // We koppelen de hover-events aan de Swiper slides
    //   // const slideSolli = swiper.slides[0];
    //   // const slideOpdr = swiper.slides[1];

    //   const teaserSolli = document.querySelector(".left");
    //   const teaserOpdr = document.querySelector(".right");

    //   // Voeg de listeners toe aan de slides
    //   teaserSolli.addEventListener("mouseover", () =>
    //     handleHoverIn(teaserSolli, 0)
    //   );
    //   teaserSolli.addEventListener("mouseout", () =>
    //     handleHoverOut(teaserSolli, 0)
    //   );

    //   teaserOpdr.addEventListener("mouseover", () =>
    //     handleHoverIn(teaserOpdr, 1)
    //   );
    //   teaserOpdr.addEventListener("mouseout", () =>
    //     handleHoverOut(teaserOpdr, 1)
    //   );
    // }

    // // Functie voor schaalvergroting bij HOVER IN
    // function handleHoverIn(element, index) {
    //   // 'element' is nu de Swiper slide
    //   // 'index' is de slide index (0 of 1)

    //   // Bepaal welke midText-karakters geanimeerd moeten worden
    //   let charsToAnimate;
    //   let targetTL;

    //   if (index === 0) {
    //     // Slide 0 (Solli)
    //     charsToAnimate = splitMidTextSolli.chars;
    //     targetTL = solliTextTL;
    //   } else if (index === 1) {
    //     // Slide 1 (Opdrachtgever)
    //     charsToAnimate = splitMidTextOpdr.chars;
    //     targetTL = opdrTextTL;
    //   } else {
    //     return; // Mocht er een onverwachte slide zijn
    //   }

    //   // Stop de vorige timeline
    //   if (targetTL) {
    //     targetTL.kill();
    //   }

    //   // Maak een nieuwe timeline aan
    //   targetTL = gsap.timeline({ defaults: { overwrite: true } });

    //   // Animatie voor de teaser (schaal vergroting)
    //   gsap.to(element, {
    //     scale: 1.1,
    //     duration: 0.4,
    //     ease: "power1.inOut",
    //     // overwrite: true,
    //   });

    //   // Animatie voor de tekst (verschijnen)
    //   targetTL.to(
    //     charsToAnimate,
    //     {
    //       opacity: 1,
    //       yPercent: 20,
    //       rotateX: 0,
    //       filter: "blur(0px)",
    //       stagger: 0.01,
    //       duration: 1,
    //       ease: "power2.out",
    //       // overwrite: true,
    //     },
    //     0
    //   );

    //   // De nieuwe timeline opslaan
    //   if (index === 0) {
    //     solliTextTL = targetTL;
    //   } else {
    //     opdrTextTL = targetTL;
    //   }
    // }

    // // Functie voor schaalverkleining bij HOVER UIT
    // function handleHoverOut(element, index) {
    //   // 'element' is de Swiper slide (bijv. swiper.slides[0])
    //   // 'index' is de slide index (0 of 1)

    //   // Bepaal welke midText-karakters geanimeerd moeten worden
    //   let charsToAnimate;
    //   let targetTL;

    //   if (index === 0) {
    //     // Slide 0 (Solli)
    //     charsToAnimate = splitMidTextSolli.chars;
    //     targetTL = solliTextTL;
    //   } else if (index === 1) {
    //     // Slide 1 (Opdrachtgever)
    //     charsToAnimate = splitMidTextOpdr.chars;
    //     targetTL = opdrTextTL;
    //   } else {
    //     return;
    //   }

    //   // Stop de vorige timeline
    //   if (targetTL) {
    //     targetTL.kill();
    //   }

    //   // Maak een nieuwe timeline aan
    //   targetTL = gsap.timeline({ defaults: { overwrite: true } });

    //   // Animatie voor de teaser (schaal verkleining)
    //   gsap.to(element, {
    //     scale: 1,
    //     duration: 0.4,
    //     ease: "power1.inOut",
    //     overwrite: true,
    //   });

    //   // Animatie voor de Tekst (verdwijnen)
    //   targetTL.to(
    //     charsToAnimate,
    //     {
    //       opacity: 0,
    //       yPercent: 180,
    //       rotateX: 90,
    //       filter: "blur(10px)",
    //       stagger: {
    //         each: 0.01,
    //         from: "start", // START de animatie vanaf het eerste karakter
    //       },
    //       duration: 0.5,
    //       ease: "power2.in",
    //       overwrite: true,
    //     },
    //     0
    //   );

    //   // Sla de nieuwe timeline op
    //   if (index === 0) {
    //     solliTextTL = targetTL;
    //   } else {
    //     opdrTextTL = targetTL;
    //   }
    // }

    // -------------------------- Open / Close Pages --------------------------

    /**
     * Functie om de extra scrollbare secties te onthullen na een klik.
     */
    function revealHiddenContent() {
      gsap.to(
        [
          infoContainerEffect,
          infoContainerMV,
          infoContainerHoe,
          footerContainer,
        ],
        {
          opacity: 1,
          visibility: "visible",
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.2,
        }
      );
    }

    // Functie om de knop met een bounce-animatie zichtbaar te maken

    function showBounceButton(element) {
      // Stop eventuele lopende animaties op het element
      gsap.killTweensOf(element);

      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.5,
          y: 50, // Begin iets lager
          visibility: "visible", // Zorg dat het zichtbaar wordt
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4, // Snelle animatie
          ease: "power2.in",
        }
      );
    }

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

      // Verberg de WhatsApp-knop terwijl de pagina wegschuift
      hideButton(whatsappButton);

      // Schuif de pagina uit beeld
      gsap.to(pageElement, {
        xPercent: targetX,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          // Verwijder de 'active' class na de animatie
          pageElement.classList.remove("active");
          // ✅ STOP LENIS NU (OF EERDER) OM DE HOMEPAGE STATISCH TE MAKEN
          if (lenis) {
            // Stop de scroll op de homepage nadat de overgang klaar is
            lenis.stop();
          }
        },
      });
    }

    // Listener voor de solPage home button
    document
      .getElementById("closeSolli")
      .addEventListener("click", function (event) {
        event.preventDefault();
        closePage(solPage, -100); // SOL pagina schuift naar links (-100%)
      }); // Listener voor de opdPage home button

    document
      .getElementById("closeOpdrachtgever")
      .addEventListener("click", function (event) {
        event.preventDefault();
        closePage(opdPage, 100);
      });

    /**
     * Functie om de knop vloeiend te verbergen
     * @param {HTMLElement} element - De WhatsApp knop container
     */
    function hideButton(element) {
      // zweefWhatsappTL.pause(0);

      // Stop eventuele lopende animaties op het element
      gsap.killTweensOf(element);

      // Fade out en schaal de knop omlaag
      gsap.to(element, {
        opacity: 0,
        scale: 0.5,
        y: 50, // Schuif de knop iets naar beneden terwijl hij verdwijnt
        duration: 0.4, // Snelle animatie
        ease: "power2.in",
        onComplete: () => {
          // Maak de knop helemaal onzichtbaar na de animatie
          gsap.set(element, { visibility: "hidden" });
        },
      });
    }

    //  const infoContent = document.querySelector(
    //     ".info-container-effect .info-container .alineas .first"
    //   );
    //   const splitInfoPage2 = SplitText.create(infoContent, {
    //     type: "lines",
    //     linesClass: "line",
    //     mask: "lines",
    //   });

    //   gsap.set(infoContent, { visibility: "visible" });
    //   gsap.set(splitInfoPage2.lines, {
    //     yPercent: 100,
    //     opacity: 0,
    //   });

    //  tlInfo.to(splitInfoPage.lines, {
    //     yPercent: 0,
    //     opacity: 1,
    //     duration: 0.75,
    //     stagger: 0.1,
    //     ease: "power1.out",
    //   });

    // -------------------------- ScrollTrigger Secties --------------------------

    function initInfoSection() {
      const root = document.querySelector(".homepage .info-container-effect");
      const pinHeight = root.querySelector(
        ".info-container-effect .pin-height"
      );
      const infoContainer = document.querySelector(".info-container");

      if (window.innerWidth >= 992) {
        const alinea = document.querySelectorAll(".alinea");
        const splitInfoPage = SplitText.create(alinea, {
          type: "words",
          wordsClass: "word",
          mask: "words",
          // autoSplit: true,
        });
        gsap.set(splitInfoPage.words, {
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

        tlInfo.to(splitInfoPage.words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.5,
          ease: "power1.out",
        });
      } else {
        const infoContent = document.querySelectorAll(".alinea-mobile");
        infoContent.forEach((el) => {
          // Split in lines
          SplitText.create(el, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => {
              // Animatie per regel
              gsap.from(self.lines, {
                yPercent: 100,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                },
              });
            },
          });
        });
      }
    }

    function initCardSection() {
      const cards = gsap.utils.toArray(".card");
      const cardsContainer = document.querySelector(".info-container-hoe");

      cards.forEach((card, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: () => `top bottom-=100`,
            end: () => `top top-=100`,
            scrub: true,
            // markers: true,
            invalidateOnRefresh: true,
          },
          ease: "power1.in",
          scale: () => 1 - (cards.length - index) * 0.025,
        });

        ScrollTrigger.create({
          trigger: card,
          start: "center center",
          pin: true,
          pinSpacing: false,
          // markers: true,
          endTrigger: cardsContainer,
          end: "bottom bottom",
          invalidateOnRefresh: true,
        });
      });
    }

    initSwiper();
    startIntroAnimation();
    setupSwiperEffects();
    initInfoSection();
    initCardSection();
  });
});

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

// const half = content.clientWidth / 2;
// const wrap = gsap.utils.wrap(-half, 0);

// const sentence1 = document.querySelector(
//   ".checkmark-container .paragraph-first"
// );

// gsap.to(sentence1, {
//   x: -sentence1.clientWidth / 2,
//   ease: "none",
//   duration: 3,
//   repeat: -1,
// });

//   let splitCheckmarks;
// SplitText.create(".checkmark-container p", {
//   type: "words, lines",
//   linesClass: "line",
//   autoSplit: true,
//   mask: "lines",
//   onSplit: (self) => {
//     splitCheckmarks = gsap.from(self.lines, {
//       duration: 0.6,
//       yPercent: 100,
//       opacity: 0,
//       stagger: 0.1,
//       ease: "expo.out",
//     });
//     return splitCheckmarks;
//   },
// });

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
//   leftSwiper,
//   {
//     y: 300,
//     ease: "power3.inOut",
//   },
//   0
// );

// 2. TEASER RIGHT: Start van een andere positie (100px omlaag) en komt omhoog
// tlScroll.from(
//   rightSwiper,
//   {
//     y: 100,
//     ease: "power3.inOut",
//   },
//   0
// );

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

// tl.to(midText, {
//   opacity: 0,
//   ease: "power2.inOut",
//   duration: 3,
// });

// const zweefWhatsappTL = gsap.timeline({
//   paused: true,
//   repeat: -1,
//   yoyo: true,
// });

// 2. Definieer de zweefanimatie voor de whatsappButton
// zweefWhatsappTL.to(whatsappButton, {
//   y: -5,
//   rotation: 0.5,
//   duration: 3,
//   ease: "sine.inOut",
//   delay: gsap.utils.random(0, 1),
// });

// function startFloatingAnimation(element) {

//   gsap.to(element, {
//     y: -40,
//     rotation: 0.5,
//     duration: 2,
//     ease: "sine.inOut",
//     yoyo: true,
//     repeat: -1,
//   });
// }
