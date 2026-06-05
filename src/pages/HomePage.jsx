import { useRef } from "react";
import { Link } from "react-router-dom";
// import { initSwiper } from "../utils/initSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useIntro } from "../context/IntroContext";
import rightImage from "../assets/Homepage-right.jpg";
// import rightImage from "../assets/background7-kopie.jpg";
import leftImage from "../assets/Homepage-left.jpg";
import image5 from "../assets/cards-laptop.jpg";
import { AboutSection } from "../components/AboutSection";
import { Footer } from "../components/Footer";
// import { Icon } from "../components/Icon";

import { gsap, useGSAP, ScrollTrigger, ScrollSmoother, Flip, SplitText } from "../utils/gsap-setup";

let introHasRunGlobal = false;

export const HomePage = () => {
  // const [endX, setEndX] = useState(0);
  const container = useRef();
  const tl = useRef();
  const { introFinished, setIntroFinished } = useIntro();

  useGSAP(
    (context, contextSafe) => {
      document.fonts.ready.then(() => {
        const logo = document.querySelector(".child1");
        // const logoPath = document.querySelector("#logoPath");
        // const originalContainer = container.current.querySelector(
        //   ".original-container",
        // );
        const newContainer = document.querySelector(".new-container");
        const lines = gsap.utils.toArray(".homepage-button");
        // const leftLayer = container.current.querySelector(".hover-layer-left");
        // const rightLayer =
        //   container.current.querySelector(".hover-layer-right");
        // const tagline = document.querySelector(
        //   ".new-container-wrapper .tagline-wrapper .tagline"
        // );

        // const switchBtn = container.current.querySelector(".switch");

        // MorphSVGPlugin.convertToPath("#logoPath rect, #logoPath ellipse");

        // gsap.set(logo.querySelectorAll("rect, ellipse"), {
        //   opacity: 1
        // });

        // gsap.set("#logoPath path", {
        //   drawSVG: "0%",
        //   fill: "#fff"
        // });



        // SPLIT TAGLINE
        // let splitTagline = SplitText.create(
        //   ".new-container-wrapper .tagline-wrapper .tagline",
        //   {
        //     // type: "chars, words",
        //     type: "chars",
        //     charsclassName: "char",
        //     // wordsclassName: "word",
        //     // autoSplit: true,
        //   },
        // );

        // Als je split met characters gebruikt, altijd ook words erbij zetten omdat hij anders woorden afbreekt bij schermresizing
        let splitMidTextSolli = SplitText.create(".mid-text-sollicitant", {
          type: "words",
          // charsclassName: "char",
          wordsclassName: "word",
          // autoSplit: true,
        });



        gsap.set(".child1", { visibility: "visible" });



        // gsap.set(["#color1", "#color2"], {
        //   opacity: 0.1,
        //   "stopColor": "#00450D",
        // });

        gsap.set(".bg", { opacity: 0 });

        // gsap.set(".teasers-container-swiper", {
        //   yPercent: 10,
        //   opacity: 0.9
        // });

        // const zweefTL = gsap.timeline({ repeat: -1, yoyo: true });

        // // Start de zweefanimatie (oneindig, totdat er geklikt wordt)
        // zweefTL.to(".icon2", {
        //   y: -20,
        //   rotation: 0.5,
        //   duration: 3,
        //   ease: "sine.inOut",
        //   yoyo: true,
        //   // Herhaal oneindig (-1)
        //   repeat: -1,
        //   delay: gsap.utils.random(0, 1),
        // });
        // gsap.set(whatsappButton, {
        //   opacity: 0,
        //   scale: 0.5,
        //   visibility: "hidden",
        // });

        // gsap.set(solPage, { xPercent: -100, opacity: 1 });
        // gsap.set(opdPage, { xPercent: 100, opacity: 1 });

        tl.current = gsap.timeline({
          paused: true,

          onStart: () => { ScrollSmoother.get()?.paused(true); document.body.style.overflow = "hidden"; },
          onComplete: () => {
            introHasRunGlobal = true;
            setIntroFinished(true);

            ScrollSmoother.get()?.paused(false);
            document.body.style.overflow = "";

            requestAnimationFrame(() => {
              ScrollTrigger.refresh(true);
              ScrollSmoother.get()?.refresh(true);
            });
          },
        });

        // tl.current.set(splitTagline.chars, {
        //   opacity: 0,
        //   yPercent: -100,
        // });

        tl.current.set(splitMidTextSolli.words, {
          opacity: 0,
          yPercent: 100,
          rotateX: -90,
          filter: "blur(10px)",
        });

        tl.current.set(".glyph", {
          clipPath: "inset(100% 0 0 0)", // volledig verborgen (rechts dicht)
        });

        tl.current.set(".icon", {
          opacity: 0
        })

        tl.current.set(lines, {
          x: (i) => (i % 2 === 0 ? -200 : 200),
          opacity: 0,
        });





        tl.current.set(".letter", {
          opacity: 0
        },);

        // tl.current.set(".icon", {
        //   opacity: 0
        // },);

        // tl.current.to(".icon", {
        //   opacity: 1,
        //   duration: 1,
        //   ease: "power2.inOut",
        //   stagger: {
        //     each: 0.1,
        //     from: "end"
        //   }
        // }, 0);





        tl.current.fromTo(
          ".icon",
          {
            opacity: 0,
            xPercent: -300,
            rotate: -20,
            // scale: 0.5
          },
          {
            opacity: 1,
            xPercent: 0,
            rotate: 0,
            // scale: 1,
            ease: "elastic.out",
            duration: 1.4,
          }, 0.1
        );

        tl.current.fromTo(
          ".letter",
          {
            opacity: 0,
            transformOrigin: "center center"
            // xPercent: -100,
            // rotate: -20,
            // transformOrigin: "center center"
          },
          {
            opacity: 1,

            // ease: "elastic.out(0.6, 0.8)",
            ease: "back",
            stagger: {
              each: 0.04,
              from: "end"
            }
          }, 0.37
        );

        // tl.current.fromTo(
        //   ".letterLights",
        //   {
        //     opacity: 0,
        //     scale: 2,
        //     transformOrigin: "center center"
        //   },
        //   {
        //     opacity: 0.8,
        //     scale: 1,
        //     rotate: 0,
        //     // ease: "elastic.out(0.6, 0.8)",
        //     ease: "expo.out",
        //     stagger: {
        //       each: 0.04,
        //       from: "end"
        //     }
        //   }, 0.77
        // );

        // tl.current.fromTo(
        //   ".letterLights",
        //   {
        //     opacity: 0,
        //     scale: 0.5,
        //     transformOrigin: "center center"
        //   },
        //   {
        //     opacity: 1,
        //     scale: 1,
        //     rotate: 0,
        //     // ease: "elastic.out(0.6, 0.8)",
        //     ease: "back",
        //     stagger: {
        //       each: 0.04,
        //       from: "end"
        //     }
        //   }, 0.57
        // );


        // tl.current.from(".letter", {
        //   y: -80,
        //   scale: 0.3,
        //   // transformOrigin: "center center",
        //   ease: "elastic.out(1, 0.5)",
        //   duration: 1.2,
        //   stagger: {
        //     each: 0.08,
        //     from: "end"
        //   }
        // }, 1.5);







        // tl.current.to(".letter", {
        //   yPercent: "random([-100, 100])",
        //   rotation: "random(-30, 30)",
        //   ease: "back.out",
        //   autoAlpha: 0,
        //   repeat: 2,
        //   yoyo: true,
        //   stagger: {
        //     amount: 0.5,
        //     from: "random",
        //   }
        // }, 0)




        // ---------- Intro + Switch ----------

        // tl.current.to(
        //   ".icon2",
        //   {
        //     scale: 0,
        //     duration: 0.5,
        //     ease: "none",
        //     zIndex: -1,
        //   },
        //   0,
        // );

        // const state = Flip.getState(logo);

        // (logo.parentNode === originalContainer
        //   ? newContainer
        //   : originalContainer
        // ).appendChild(logo);

        // tl.current.fromTo(
        //   logo,
        //   {
        //     // STARTWAARDEN (FROM)
        //     filter: "none", // Start zonder gloed
        //   },
        //   {
        //     // EINDWAARDEN (TO)
        //     filter: "drop-shadow(0 0 3px #00dc82)",
        //     duration: 0.3,
        //     ease: "power2.inOut",
        //   },
        //   0.5,
        // );
        // Animeer de stop-kleuren terug naar groen
        // tl.current.to(
        //   "#color1",
        //   {
        //     opacity: 1,
        //     "stopColor": "#00450D", // Groen 1
        //     duration: 0.3,
        //     ease: "power1.out",
        //   },
        //   0.5, // Start tegelijk
        // );

        // tl.current.to(
        //   "#color2",
        //   {
        //     opacity: 1,
        //     "stopColor": "#007416", // Groen 2
        //     duration: 0.3,
        //     ease: "power1.out",
        //   },
        //   0.5, // Start tegelijk
        // );

        // tl.current.to(
        //   ".child1",
        //   {
        //     filter: "drop-shadow(0 0 1px #00dc82)",
        //     duration: 1.2,
        //     ease: "power2.inOut",
        //   },
        //   1,
        // );
        // tl.current.add(
        //   Flip.from(state, {
        //     scale: true,
        //     duration: 1.2,
        //     nested: true,
        //     ease: "power2.inOut",
        //     zIndex: 1000,
        //   }),
        //   1
        // );
        // tl.current.to(
        //   ".switch",
        //   {
        //     opacity: 0,
        //     scale: 0.5,
        //     duration: 0.3,
        //     ease: "power2.out",
        //   },
        //   0.7,
        // );

        tl.current.to(
          ".bg",
          {
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
          },
          1.5,
        );
        // tl.current.to(
        //   splitTagline.chars,
        //   {
        //     opacity: 1,
        //     yPercent: 0,
        //     ease: "back",
        //     stagger: {
        //       amount: 1,
        //       from: "begin",
        //     },
        //   },
        //   2.5,
        // );

        // tl.current.to(
        //   ".tagline-wrapper",
        //   {
        //     opacity: 1,
        //     duration: 1,
        //     ease: "none",
        //   },
        //   2.5,
        // );

        tl.current.to(
          ".mid-text-container",
          {
            opacity: 1,
          },
          0.5,
        );

        tl.current.to(
          splitMidTextSolli.words,
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            // stagger: 0.01,
            duration: 2,
            ease: "power2.out",
          },
          1.5,
        );

        tl.current.to(
          ".hero-pictures",
          {
            opacity: 1,
          },
          0.5,
        );

        tl.current.to(".glyph", {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.out",
        }, 1.7);







        tl.current.to(lines, {
          x: 0,
          opacity: 1,
          stagger: 0.25,
          duration: 0.8,
          ease: "power3.out",
        }, 3);



        // tl.current.to(".teasers-container-swiper", {
        //   visibility: "visible",
        //   yPercent: 0,
        //   duration: 0.1,
        //   ease: "power3.out"
        // }, 3);



        // gsap.set(".teasers-container-swiper", {
        //   visibility: "visible",
        //   opacity: 0,
        //   scale: 0,
        // });

        // tl.current.to(
        //   ".teasers-container-swiper",
        //   {
        //     opacity: 1,
        //     scale: 1,
        //     ease: "expo.out",
        //     duration: 2,
        //   },
        //   3,
        // );

        const startIntro = contextSafe(() => {
          // FLIP LOGICA HIER:
          const state = Flip.getState(logo);

          // Verplaats fysiek
          newContainer.appendChild(logo);

          tl.current.add(
            Flip.from(state, {
              scale: true,
              duration: 1.2,
              nested: true,
              ease: "power2.inOut",
              absolute: true,
              zIndex: 1000,
            }),
            1,
          );

          // gsap.fromTo(
          //   logo,
          //   {
          //     opacity: 0,
          //   },
          //   {
          //     opacity: 1,
          //     duration: 1.2,
          //     ease: "power3.out"
          //   }
          // );

          // gsap.to("#logoPath path", {
          //   drawSVG: "100%",
          //   fill: "#00dc82",
          //   stagger: 0.05,
          //   duration: 1.2,
          //   ease: "power2.inOut"
          // });

          tl.current.play();

        });


        const skipIntro = contextSafe(() => {
          // Directe DOM verplaatsing voor terugkerende bezoekers
          if (logo.parentNode !== newContainer) {
            newContainer.appendChild(logo);
          }
          // Forceer de tijdlijn naar het eindpunt (GSAP handelt de Flip eindstand af)
          tl.current.progress(1);
          setIntroFinished(true);
          // gsap.set(switchBtn, { display: "none" });
        });

        // Uitvoering check
        if (introHasRunGlobal) {
          skipIntro();
        } else {
          startIntro();
          // if (switchBtn) {
          //   switchBtn.addEventListener("click", handleStartClick);
          // }
        }
      });
    },
    { scope: container },
  );



  // const { contextSafe } = useGSAP({ scope: container });

  // const onLeftEnter = contextSafe(() => {
  //   gsap.to(".leftSwiper", { scale: 1.1, duration: 0.4 });
  // });

  // const onLeftLeave = contextSafe(() => {
  //   gsap.to(".leftSwiper", { scale: 1, duration: 0.4 });
  // });

  // const onRightEnter = contextSafe(() => {
  //   gsap.to(".rightSwiper", { scale: 1.1, duration: 0.4 });
  // });

  // const onRightLeave = contextSafe(() => {
  //   gsap.to(".rightSwiper", { scale: 1, duration: 0.4 });
  // });

  // const handlers = {
  //   left: { handleEnter: () => {}, handleLeave: () => {} },
  //   right: { handleEnter: () => {}, handleLeave: () => {} },
  // };

  // contextSafe(() => {
  //   mm.add({ isDesktop: "(min-width: 768px)" }, (context) => {
  //     const { isDesktop } = context.conditions;

  //     handlers.left.handleEnter = () => {
  //       gsap.to(".leftSwiper", { scale: isDesktop ? 1.1 : 1, duration: 0.4 });
  //     };
  //     handlers.left.handleLeave = () => {
  //       gsap.to(".leftSwiper", { scale: isDesktop ? 1 : 1, duration: 0.4 });
  //     };

  //     handlers.right.handleEnter = () => {
  //       gsap.to(".rightSwiper", { scale: isDesktop ? 1.1 : 1, duration: 0.4 });
  //     };
  //     handlers.right.handleLeave = () => {
  //       gsap.to(".rightSwiper", { scale: isDesktop ? 1 : 1, duration: 0.4 });
  //     };
  //   });
  // })();

  //  const onLeftLeave = contextSafe(() => {
  //         gsap.to(".leftSwiper", { scale: 1, duration: 0.4 });
  //       });

  useGSAP((context, contextSafe) => {

    const section = document.querySelector(".hero-interaction-section");
    const glyphs = document.querySelectorAll(".glyph");

    if (!section || !glyphs.length) return;

    // const bases = [
    //   { x: -22, y: 5 },
    //   { x: -10, y: 35 },
    //   { x: 0, y: 0 },
    //   { x: 6, y: 20 },
    //   { x: 10, y: 10 },
    //   { x: 12, y: 40 },
    //   { x: 24, y: 40 },
    // ];



    const bases = [
      { x: -22, y: 5 },
      { x: -10, y: 35 },
      { x: 0, y: 0 },
      { x: 12, y: 15 },
      { x: 24, y: 10 },

    ];

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = contextSafe((e) => {

      const rect = section.getBoundingClientRect();

      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;

    });

    const animate = () => {

      // smooth follow
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      glyphs.forEach((glyph, index) => {

        const base = bases[index];

        const depth = index - glyphs.length / 2;

        const moveX = currentX * 70;
        const moveY = currentY * 70;

        // 🔥 UNIQUE BEHAVIOR PER GLYPH
        const intensity = 0.6 + index * 0.15;     // different strength
        const wobble = Math.sin(currentX * 3 + index) * 6; // subtle offset
        const lag = 1 - index * 0.08;             // slight response delay feel

        gsap.set(glyph, {

          x:
            base.x +
            moveX * intensity +
            depth * 7 +
            wobble * lag,

          y:
            base.y +
            moveY * (1.1 - index * 0.1) +
            depth * 7 +
            Math.cos(currentY * 3 + index) * 5,

          rotateY: currentX * (28 + index * 2),
          rotateX: -currentY * (28 + index * 2),

          transformPerspective: 1000,
          transformOrigin: "center"
        });

      });

      requestAnimationFrame(animate);
    };

    section.addEventListener("mousemove", onMove);

    animate();

    return () => {
      section.removeEventListener("mousemove", onMove);
    };

  }, { scope: container });




  // Animatie voor kleur overgang
  useGSAP(() => {

    const leftLayer =
      container.current.querySelector(".hover-layer-left");

    const rightLayer =
      container.current.querySelector(".hover-layer-right");

    const midText =
      container.current.querySelector(".homepage-hero");


    gsap.timeline({
      scrollTrigger: {
        trigger: midText,
        start: "top top",
        end: "+=400",
        scrub: true,
      }
    })

      .to(
        rightLayer,
        {
          opacity: 1,
          ease: "power1.inOut"
        },
        0
      )

      .to(
        leftLayer,
        {
          opacity: 0,
          ease: "power1.inOut"
        },
        0
      )

      .fromTo(".mid-text-sollicitant", {
        opacity: 1,
      },
        {
          color: "#ffffff",
          ease: "power1.inOut"
        }, 0
      )



  },
    { scope: container });



  // gsap.to(rightLayer, {
  //   opacity: 1,
  //   duration: 4,
  //   ease: "power1.inOut",
  // }, 5);
  // gsap.to(leftLayer, { opacity: 0, duration: 4 }, 5);

  // useGSAP(() => {

  //   const midText =
  //     container.current.querySelector(".homepage-hero");

  //   const lines = gsap.utils.toArray(".homepage-button");

  //   if (!midText || !lines.length) return;

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: midText,
  //       start: "top top",
  //       end: "+=500",
  //       scrub: true,
  //     }
  //   });

  //   tl.from(lines, {
  //     x: (i) => (i % 2 === 0 ? -200 : 200),
  //     opacity: 0,
  //     ease: "power3.out",
  //     stagger: 0.25,
  //   });

  // }, { scope: container });


  useGSAP((context, contextSafe) => {

    const buttons = container.current.querySelectorAll(".homepage-button");

    if (!buttons.length) return;

    buttons.forEach((btn) => {

      const text = btn.querySelector(".line");
      if (!text) return;

      const play = contextSafe(() => {

        gsap.killTweensOf(text);

        gsap.set(text, {
          yPercent: -25,  // start boven het element
        });

        gsap.to(text, {
          yPercent: 0,
          duration: 1.2,
          ease: "elastic.out"
        });

      });

      btn.addEventListener("mouseenter", play);

      return () => {
        btn.removeEventListener("mouseenter", play);
      };

    });

  }, { scope: container });


  useGSAP(
    (context, contextSafe) => {
      document.fonts.ready.then(() => {
        // contextSafe als 2e argument

        // Selecteer elementen binnen de scope
        const leftSwiper = container.current.querySelector(".leftSwiper");
        const rightSwiper = container.current.querySelector(".rightSwiper");
        const leftLayer = container.current.querySelector(".hover-layer-left");
        const rightLayer =
          container.current.querySelector(".hover-layer-right");
        const headerBg = document.querySelector(".header .bg");

        if (
          !leftSwiper ||
          !rightSwiper ||
          !leftLayer ||
          !rightLayer ||
          !headerBg
        )
          return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          // gsap.set(headerBg, {
          //   background:
          //     "linear-gradient(to top, rgb(219, 219, 196), rgb(196, 196, 175) 50%, rgb(180, 180, 161)",


          // });


          // {
          //   isDesktop: "(min-width: 768px)",
          // },
          // (context) => {
          //   let { isDesktop } = context.conditions;

          // LEFT HOVER IN (Context-Safe gewrapped)
          const onLeftEnter = contextSafe(() => {
            gsap.to(leftLayer, {
              opacity: 1,
              duration: 4,
              ease: "power1.inOut",
            });
            gsap.to(rightLayer, { opacity: 0, duration: 4 });
            // gsap.to(headerBg, {
            //   background:
            //     "linear-gradient(to top, #a8988c, #635a54 50%, #403a36)",
            //   duration: 1,
            //   ease: "power1.inOut",
            //   force3D: true,
            // });
            gsap.to(leftSwiper, {
              scale: 1.1,
              duration: 1,
              ease: "power4.out",
            });
            // gsap.to(rightSwiper, {
            //   scale: 0.9,
            //   duration: 0.4,
            //   ease: "power1.inOut",
            // });
          });

          // LEFT HOVER UIT (Context-Safe gewrapped)
          const onLeftLeave = contextSafe(() => {
            gsap.to([leftLayer, rightLayer], {
              opacity: 0,
              duration: 4,
              ease: "power1.inOut",
            });
            // gsap.to(headerBg, {
            //   background:
            //     // "linear-gradient(to top, rgb(219, 219, 196), rgb(196, 196, 175) 50%, rgb(180, 180, 161)",
            //     "linear-gradient(to top, rgb(219, 219, 196), rgb(187, 184, 160) 50%, rgb(126, 124, 107)",
            //   duration: 1,
            //   ease: "power1.inOut",
            // });
            gsap.to(leftSwiper, {
              scale: 1,
              duration: 1,
              ease: "power4.in",
            });
            // gsap.to(rightSwiper, {
            //   scale: 1,
            //   duration: 0.4,
            //   ease: "power1.inOut",
            // });
          });

          // RIGHT HOVER IN
          const onRightEnter = contextSafe(() => {
            gsap.to(rightLayer, {
              opacity: 1,
              duration: 4,
              ease: "power1.inOut",
            });
            gsap.to(leftLayer, { opacity: 0, duration: 4 });
            // gsap.to(headerBg, {
            //   background:
            //     "linear-gradient(to top, rgb(163, 154, 138), rgb(97, 92, 84) 50%, rgb(71, 68, 62))",
            //   duration: 1,
            //   ease: "power1.inOut",
            // });
            gsap.to(rightSwiper, {
              scale: 1.1,
              duration: 1,
              ease: "power4.out",
            });
          });

          // RIGHT HOVER UIT
          const onRightLeave = contextSafe(() => {
            gsap.to([leftLayer, rightLayer], {
              opacity: 0,
              duration: 4,
              ease: "power1.inOut",
            });
            // gsap.to(headerBg, {
            //   background:
            //     "linear-gradient(to top, rgb(219, 219, 196), rgb(196, 196, 175) 50%, rgb(180, 180, 161)",
            //   duration: 1,
            //   ease: "power1.inOut",
            // });
            gsap.to(rightSwiper, {
              scale: 1,
              duration: 1,
              ease: "power4.in",
            });
            // gsap.to(leftSwiper, {
            //   scale: 1,
            //   duration: 0.4,
            //   ease: "power1.inOut",
            // });
          });

          // ------------------------------------------------------------
          // Event Listeners TOEVOEGEN (alleen als isDesktop true is)
          // ------------------------------------------------------------

          leftSwiper.addEventListener("mouseenter", onLeftEnter);
          leftSwiper.addEventListener("mouseleave", onLeftLeave);
          rightSwiper.addEventListener("mouseenter", onRightEnter);
          rightSwiper.addEventListener("mouseleave", onRightLeave);

          return () => {
            leftSwiper.removeEventListener("mouseenter", onLeftEnter);
            leftSwiper.removeEventListener("mouseleave", onLeftLeave);
            rightSwiper.removeEventListener("mouseenter", onRightEnter);
            rightSwiper.removeEventListener("mouseleave", onRightLeave);
          };
        });
      });
    },
    { scope: container, dependencies: [] },
  );

  // useEffect(() => {
  //   const leftSwiper = document.querySelector(".leftSwiper");
  //   const rightSwiper = document.querySelector(".rightSwiper");

  //   const midTextSolli = document.querySelector(".mid-text-sollicitant");
  //   const midTextOpdr = document.querySelector(".mid-text-opdrachtgever");
  //   // Als je split met characters gebruikt, altijd ook words erbij zetten omdat hij anders woorden afbreekt bij schermresizing
  //   let splitMidTextSolli = SplitText.create(midTextSolli, {
  //     type: "chars, words",
  //     charsclassName: "char",
  //     wordsclassName: "word",
  //     // autoSplit: true,
  //   });
  //   let splitMidTextOpdr = SplitText.create(midTextOpdr, {
  //     type: "chars, words",
  //     charsclassName: "char",
  //     wordsclassName: "word",
  //     // autoSplit: true,
  //   });

  //   gsap.set(splitMidTextSolli.chars, {
  //     opacity: 0,
  //     yPercent: 100,
  //     rotateX: -90,
  //     filter: "blur(10px)",
  //   });

  //   gsap.set(splitMidTextOpdr.chars, {
  //     opacity: 0,
  //     yPercent: 100,
  //     rotateX: -90,
  //     filter: "blur(10px)",
  //   });

  //   if (!leftSwiper || !rightSwiper) return;

  //   // SplitText references
  //   // const splitMidTextSolli = container.current.querySelectorAll(
  //   //   ".mid-text-sollicitant .char"
  //   // );
  //   // const splitMidTextOpdr = container.current.querySelectorAll(
  //   //   ".mid-text-opdrachtgever .char"
  //   // );

  //   let solliTextTL = null;
  //   let opdrTextTL = null;

  //   const mm = gsap.matchMedia();

  //   mm.add("(min-width: 992px)", () => {
  //     // LEFT HOVER
  //     const onLeftEnter = () => {
  //       if (solliTextTL) solliTextTL.kill();

  //       gsap.to(leftSwiper, {
  //         scale: 1.1,
  //         duration: 0.4,
  //         ease: "power1.inOut",
  //       });

  //       solliTextTL = gsap.timeline({ defaults: { overwrite: true } });
  //       solliTextTL.to(splitMidTextSolli, {
  //         opacity: 1,
  //         yPercent: 20,
  //         rotateX: 0,
  //         filter: "blur(0px)",
  //         stagger: 0.01,
  //         duration: 1,
  //         ease: "power2.out",
  //       });
  //     };

  //     const onLeftLeave = () => {
  //       if (solliTextTL) solliTextTL.kill();

  //       gsap.to(leftSwiper, { scale: 1, duration: 0.4, ease: "power1.inOut" });

  //       solliTextTL = gsap.timeline({ defaults: { overwrite: true } });
  //       solliTextTL.to(splitMidTextSolli, {
  //         opacity: 0,
  //         yPercent: 180,
  //         rotateX: 90,
  //         filter: "blur(10px)",
  //         stagger: 0.01,
  //         duration: 0.5,
  //         ease: "power2.in",
  //       });
  //     };

  //     leftSwiper.addEventListener("pointerenter", onLeftEnter);
  //     leftSwiper.addEventListener("pointerleave", onLeftLeave);

  //     // RIGHT HOVER
  //     const onRightEnter = () => {
  //       if (opdrTextTL) opdrTextTL.kill();

  //       gsap.to(rightSwiper, {
  //         scale: 1.1,
  //         duration: 0.4,
  //         ease: "power1.inOut",
  //       });

  //       opdrTextTL = gsap.timeline({ defaults: { overwrite: true } });
  //       opdrTextTL.to(splitMidTextOpdr, {
  //         opacity: 1,
  //         yPercent: 20,
  //         rotateX: 0,
  //         filter: "blur(0px)",
  //         stagger: 0.01,
  //         duration: 1,
  //         ease: "power2.out",
  //       });
  //     };

  //     const onRightLeave = () => {
  //       if (opdrTextTL) opdrTextTL.kill();

  //       gsap.to(rightSwiper, { scale: 1, duration: 0.4, ease: "power1.inOut" });

  //       opdrTextTL = gsap.timeline({ defaults: { overwrite: true } });
  //       opdrTextTL.to(splitMidTextOpdr, {
  //         opacity: 0,
  //         yPercent: 180,
  //         rotateX: 90,
  //         filter: "blur(10px)",
  //         stagger: 0.01,
  //         duration: 0.5,
  //         ease: "power2.in",
  //       });
  //     };

  //     rightSwiper.addEventListener("pointerenter", onRightEnter);
  //     rightSwiper.addEventListener("pointerleave", onRightLeave);

  //     Cleanup bij unmount
  //     return () => {
  //       leftSwiper.removeEventListener("pointerenter", onLeftEnter);
  //       leftSwiper.removeEventListener("pointerleave", onLeftLeave);
  //       rightSwiper.removeEventListener("pointerenter", onRightEnter);
  //       rightSwiper.removeEventListener("pointerleave", onRightLeave);
  //     };
  //   });
  // }, []);

  return (
    <>
      <div ref={container} className="homepage">


        <section className="homepage-hero">
          <div className="featured-background-wrapper">
            <div className="hover-layer-left">

            </div>
            <div className="hover-layer-right">

            </div>
          </div>
          <div className="layout-wrapper">
            <div className="hero-interaction-section">
              <div className="mid-hero-section">

                <section id="flip-logo" className="header-hero">
                  {/* <Header /> */}
                  <section className="hero">
                    {!introFinished && (
                      <div className="original-container">
                        <svg
                          className="child1"
                          id="logoPath"
                          data-flip-id="image"
                          width="295" height="70" viewBox="0 0 295 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className="letter letterLights" d="M284.985 56.3841C283.193 56.3841 281.475 56.1494 279.833 55.6801C278.19 55.1894 276.867 54.5601 275.865 53.7921L277.625 49.8881C278.585 50.5707 279.715 51.1361 281.017 51.5841C282.339 52.0107 283.673 52.2241 285.017 52.2241C286.041 52.2241 286.862 52.1281 287.481 51.9361C288.121 51.7227 288.59 51.4347 288.889 51.0721C289.187 50.7094 289.337 50.2934 289.337 49.8241C289.337 49.2267 289.102 48.7574 288.633 48.4161C288.163 48.0534 287.545 47.7654 286.777 47.5521C286.009 47.3174 285.155 47.1041 284.217 46.9121C283.299 46.6987 282.371 46.4427 281.433 46.1441C280.515 45.8454 279.673 45.4614 278.905 44.9921C278.137 44.5227 277.507 43.9041 277.017 43.1361C276.547 42.3681 276.313 41.3867 276.313 40.1921C276.313 38.9121 276.654 37.7494 277.337 36.7041C278.041 35.6374 279.086 34.7947 280.473 34.1761C281.881 33.5361 283.641 33.2161 285.753 33.2161C287.161 33.2161 288.547 33.3867 289.913 33.7281C291.278 34.0481 292.483 34.5387 293.529 35.2001L291.929 39.1361C290.883 38.5387 289.838 38.1014 288.793 37.8241C287.747 37.5254 286.723 37.3761 285.721 37.3761C284.718 37.3761 283.897 37.4934 283.257 37.7281C282.617 37.9627 282.158 38.2721 281.881 38.6561C281.603 39.0187 281.465 39.4454 281.465 39.9361C281.465 40.5121 281.699 40.9814 282.169 41.3441C282.638 41.6854 283.257 41.9627 284.025 42.1761C284.793 42.3894 285.635 42.6027 286.553 42.8161C287.491 43.0294 288.419 43.2747 289.337 43.5521C290.275 43.8294 291.129 44.2027 291.897 44.6721C292.665 45.1414 293.283 45.7601 293.753 46.5281C294.243 47.2961 294.489 48.2667 294.489 49.4401C294.489 50.6987 294.137 51.8507 293.433 52.8961C292.729 53.9414 291.673 54.7841 290.265 55.4241C288.878 56.0641 287.118 56.3841 284.985 56.3841Z" fill="#00450D" />
                          <path className="letter letterLights" d="M262.64 56.0001V37.8241H255.472V33.6001H274.992V37.8241H267.824V56.0001H262.64Z" fill="#00450D" />
                          <path className="letter letterLights" d="M247.516 33.6001H252.7V56.0001H247.516V33.6001ZM237.34 56.0001H232.156V33.6001H237.34V56.0001ZM247.9 46.8161H236.956V42.4321H247.9V46.8161Z" fill="#00450D" />
                          <path className="letter letterLights" d="M218.285 56.3841C216.514 56.3841 214.882 56.1067 213.389 55.5521C211.917 54.9761 210.626 54.1654 209.517 53.1201C208.429 52.0747 207.575 50.8481 206.957 49.4401C206.359 48.0321 206.061 46.4854 206.061 44.8001C206.061 43.1147 206.359 41.5681 206.957 40.1601C207.575 38.7521 208.439 37.5254 209.549 36.4801C210.658 35.4347 211.959 34.6347 213.453 34.0801C214.946 33.5041 216.589 33.2161 218.381 33.2161C220.365 33.2161 222.146 33.5467 223.725 34.2081C225.325 34.8694 226.669 35.8294 227.757 37.0881L224.429 40.1601C223.618 39.3067 222.733 38.6774 221.773 38.2721C220.813 37.8454 219.767 37.6321 218.637 37.6321C217.549 37.6321 216.557 37.8027 215.661 38.1441C214.765 38.4854 213.986 38.9761 213.325 39.6161C212.685 40.2561 212.183 41.0134 211.821 41.8881C211.479 42.7627 211.309 43.7334 211.309 44.8001C211.309 45.8454 211.479 46.8054 211.821 47.6801C212.183 48.5547 212.685 49.3227 213.325 49.9841C213.986 50.6241 214.754 51.1147 215.629 51.4561C216.525 51.7974 217.506 51.9681 218.573 51.9681C219.597 51.9681 220.589 51.8081 221.549 51.4881C222.53 51.1467 223.479 50.5814 224.397 49.7921L227.341 53.5361C226.125 54.4534 224.706 55.1574 223.085 55.6481C221.485 56.1387 219.885 56.3841 218.285 56.3841ZM222.605 52.8641V44.4481H227.341V53.5361L222.605 52.8641Z" fill="#00450D" />
                          <path className="letter letterLights" d="M196.969 56.0001V33.6001H202.152V56.0001H196.969Z" fill="#00450D" />
                          <path className="letter letterLights" d="M177.656 56.0001V33.6001H182.84V51.7761H194.072V56.0001H177.656Z" fill="#00450D" />
                          <path className="letter" d="M151.812 56.0001V33.6001H156.1L169.316 49.7281H167.236V33.6001H172.356V56.0001H168.1L154.852 39.8721H156.932V56.0001H151.812Z" fill="#00450D" />
                          <path className="letter" d="M135.112 42.6241H145.896V46.6561H135.112V42.6241ZM135.496 51.8401H147.688V56.0001H130.344V33.6001H147.272V37.7601H135.496V51.8401Z" fill="#00450D" />
                          <path className="letter" d="M113.643 42.6241H124.427V46.6561H113.643V42.6241ZM114.027 51.8401H126.219V56.0001H108.875V33.6001H125.803V37.7601H114.027V51.8401Z" fill="#00450D" />
                          <path className="letter" d="M85.3435 56.0001V33.6001H95.0395C97.0448 33.6001 98.7728 33.9308 100.224 34.5921C101.674 35.2321 102.794 36.1601 103.584 37.3761C104.373 38.5921 104.768 40.0428 104.768 41.7281C104.768 43.3921 104.373 44.8321 103.584 46.0481C102.794 47.2428 101.674 48.1601 100.224 48.8001C98.7728 49.4401 97.0448 49.7601 95.0395 49.7601H88.2235L90.5275 47.4881V56.0001H85.3435ZM99.5835 56.0001L93.9835 47.8721H99.5195L105.184 56.0001H99.5835ZM90.5275 48.0641L88.2235 45.6321H94.7515C96.3515 45.6321 97.5462 45.2908 98.3355 44.6081C99.1248 43.9041 99.5195 42.9441 99.5195 41.7281C99.5195 40.4908 99.1248 39.5308 98.3355 38.8481C97.5462 38.1654 96.3515 37.8241 94.7515 37.8241H88.2235L90.5275 35.3601V48.0641Z" fill="#00450D" />
                          <path className="letter" d="M71.472 56.3841C69.7014 56.3841 68.0694 56.1067 66.576 55.5521C65.104 54.9761 63.8134 54.1654 62.704 53.1201C61.616 52.0747 60.7627 50.8481 60.144 49.4401C59.5467 48.0321 59.248 46.4854 59.248 44.8001C59.248 43.1147 59.5467 41.5681 60.144 40.1601C60.7627 38.7521 61.6267 37.5254 62.736 36.4801C63.8454 35.4347 65.1467 34.6347 66.64 34.0801C68.1334 33.5041 69.776 33.2161 71.568 33.2161C73.552 33.2161 75.3334 33.5467 76.912 34.2081C78.512 34.8694 79.856 35.8294 80.944 37.0881L77.616 40.1601C76.8054 39.3067 75.92 38.6774 74.96 38.2721C74 37.8454 72.9547 37.6321 71.824 37.6321C70.736 37.6321 69.744 37.8027 68.848 38.1441C67.952 38.4854 67.1734 38.9761 66.512 39.6161C65.872 40.2561 65.3707 41.0134 65.008 41.8881C64.6667 42.7627 64.496 43.7334 64.496 44.8001C64.496 45.8454 64.6667 46.8054 65.008 47.6801C65.3707 48.5547 65.872 49.3227 66.512 49.9841C67.1734 50.6241 67.9414 51.1147 68.816 51.4561C69.712 51.7974 70.6934 51.9681 71.76 51.9681C72.784 51.9681 73.776 51.8081 74.736 51.4881C75.7174 51.1467 76.6667 50.5814 77.584 49.7921L80.528 53.5361C79.312 54.4534 77.8934 55.1574 76.272 55.6481C74.672 56.1387 73.072 56.3841 71.472 56.3841ZM75.792 52.8641V44.4481H80.528V53.5361L75.792 52.8641Z" fill="#00450D" />
                          <g className="icon" filter="url(#filter0_n_2101_25)">
                            <rect x="12.0908" y="18.0867" width="13.3179" height="40.4659" rx="6.65895" transform="rotate(17.3853 12.0908 18.0867)" fill="url(#paint0_linear_2101_25)" />
                          </g>
                          <g className="icon" filter="url(#filter1_n_2101_25)">
                            <ellipse cx="22.0423" cy="8.58882" rx="6.65895" ry="6.91506" transform="rotate(17.3853 22.0423 8.58882)" fill="url(#paint1_linear_2101_25)" />
                          </g>
                          <g className="icon" filter="url(#filter2_n_2101_25)">
                            <rect x="27.6398" y="26.7122" width="13.3179" height="40.4659" rx="6.65895" transform="rotate(17.3853 27.6398 26.7122)" fill="url(#paint2_linear_2101_25)" />
                          </g>
                          <g className="icon" filter="url(#filter3_n_2101_25)">
                            <ellipse cx="37.4382" cy="17.7031" rx="6.65895" ry="6.91506" transform="rotate(17.3853 37.4382 17.7031)" fill="url(#paint3_linear_2101_25)" />
                          </g>
                          <defs>
                            <filter id="filter0_n_2101_25" x="1.68347" y="19.7703" width="21.4331" height="39.2292" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                              <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                                <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                              </feComponentTransfer>
                              <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                              <feMerge result="effect1_noise_2101_25">
                                <feMergeNode in="shape" />
                                <feMergeNode in="color1" />
                              </feMerge>
                            </filter>
                            <filter id="filter1_n_2101_25" x="15.3583" y="1.69434" width="13.368" height="13.7888" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                              <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                                <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                              </feComponentTransfer>
                              <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                              <feMerge result="effect1_noise_2101_25">
                                <feMergeNode in="shape" />
                                <feMergeNode in="color1" />
                              </feMerge>
                            </filter>
                            <filter id="filter2_n_2101_25" x="17.2324" y="28.3958" width="21.4331" height="39.2292" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                              <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                                <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                              </feComponentTransfer>
                              <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                              <feMerge result="effect1_noise_2101_25">
                                <feMergeNode in="shape" />
                                <feMergeNode in="color1" />
                              </feMerge>
                            </filter>
                            <filter id="filter3_n_2101_25" x="30.7542" y="10.8086" width="13.368" height="13.7888" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                              <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                                <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                              </feComponentTransfer>
                              <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                              <feMerge result="effect1_noise_2101_25">
                                <feMergeNode in="shape" />
                                <feMergeNode in="color1" />
                              </feMerge>
                            </filter>
                            <linearGradient id="paint0_linear_2101_25" x1="18.7498" y1="18.0867" x2="18.7498" y2="58.5526" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#3B8558" />
                              <stop offset="1" stopColor="#007416" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_2101_25" x1="22.0423" y1="1.67376" x2="22.0423" y2="15.5039" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#3B8558" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_2101_25" x1="34.2987" y1="26.7122" x2="34.2987" y2="67.1781" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#007416" />
                              <stop offset="1" stopColor="#00450D" />
                            </linearGradient>
                            <linearGradient id="paint3_linear_2101_25" x1="37.4382" y1="10.788" x2="37.4382" y2="24.6181" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#007416" />
                            </linearGradient>
                          </defs>
                        </svg>


                      </div>
                    )}




                  </section>
                </section>
                <div className="hero-container">

                  <div className="hero-pictures">
                    {/* <img className="glyph g1" data-speed="clamp(1.3)" src={leftImage} />
                       <img className="glyph g2" data-speed="clamp(1.5)" src={rightImage} />
                       <img className="glyph g3" data-speed="clamp(1.4)" src={rightImage} />
                   <img className="glyph g4" data-speed="clamp(1.7)" src={leftImage} />
                   <img className="glyph g5" data-speed="clamp(1.5)" src={rightImage} />
                    <img className="glyph g6" data-speed="clamp(1.3)" src={leftImage} />
                     <img className="glyph g7" data-speed="clamp(1.3)" src={leftImage} /> */}

                    {/* <img className="glyph g1" src={leftImage} />
                    <img className="glyph g2" src={rightImage} />
                    <img className="glyph g3" src={rightImage} />
                    <img className="glyph g4" src={leftImage} />
                    <img className="glyph g5" src={rightImage} /> */}

                    <img className="glyph skewElem g1" src={leftImage} />
                    <img className="glyph skewElem g2" src={rightImage} />
                    <img className="glyph skewElem g3" src={rightImage} />
                    <img className="glyph skewElem g4" src={leftImage} />
                    <img className="glyph skewElem g5" src={rightImage} />
                    {/* <img className="glyph g6" src={leftImage} />
                    <img className="glyph g7" src={leftImage} /> */}
                    {/* <img className="glyph g8" data-speed="1.3" src={leftImage} /> */}
                  </div>
                  <div className="mid-text-container">
                    {/* <div className="mid-text-placeholder"></div> */}
                    <div className="mid-text-sollicitant">
                      <h2>
                        "Wij versnellen digitale ambities door passend it-talent te
                        koppelen. Snel, passend IT-talent vinden."
                      </h2>
                    </div>
                    {/* <div className="mid-text-opdrachtgever">
                     <h2>
                    Wij versnellen digitale ambities door passend IT-talent te
                    koppelen
                     </h2>
                      </div> */}
                    <div className="homepage-buttons-container">

                      <Link
                        to="/talent"
                        className="homepage-button btn1"
                        aria-label="Ontdek opdrachten"
                      >

                        <div className="overlay">
                          <p className="line">
                            start je <span className="highlight">it-carrière</span>
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/opdrachtgever"
                        className="homepage-button btn2"
                        aria-label="Ontdek trainees"
                      >

                        <div className="overlay">
                          <p className="line">
                            vind <span className="highlight">it-talent</span>
                          </p>
                        </div>
                      </Link>

                    </div>
                  </div>


                </div>










              </div>


            </div>


            <AboutSection className="home-section" />





          </div>

        </section>
        {/* <div className="teasers-container-swiper">
          <Swiper
            modules={[Pagination, EffectCoverflow]}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={12}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 100,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 0,
                  modifier: 0,
                },
              },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows: false,
            }}
            className="mySwiper"
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.update();
              }, 100);
            }}
          >
            <SwiperSlide>
              <Link
                to="/talent"
                id="openSolliMobile"
                className="teaser-swiper leftSwiper left"
                aria-label="Ontdek opdrachten"
              >
                <img
                  src={leftImage}
                  alt="Opdrachten"
                  className="teaser-image teaser-image-left"
                />
                <div className="centered-text">
                  <p className="centered-subtext">
                    Ontdek <span className="highlight">opdrachten</span>
                  </p>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link
                to="/opdrachtgever"
                id="openOpdrachtgeverMobile"
                className="teaser-swiper rightSwiper right"
                aria-label="Ontdek trainees"
              >
                <img
                  src={rightImage}
                  alt="Trainees"
                  className="teaser-image teaser-image-right"
                />
                <div className="centered-text">
                  <p className="centered-subtext">
                    Ontdek <span className="highlight">trainees</span>
                  </p>
                </div>
              </Link>
            </SwiperSlide>

            <div className="swiper-pagination" aria-hidden="true"></div>
          </Swiper>
        </div> */}
        <Footer className="home-section" />
      </div>
      {/* <Footer className="client-section" /> */}
    </>
  );
};
