import { useRef } from "react";
import { Link } from "react-router-dom";
// import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import heroImage1 from "../assets/cards-1.jpg";

import { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText } from "../utils/gsap-setup";


// import { MdArrowOutward } from "react-icons/md";

export const AboutGreenlights = ({ className }) => {
    const container = useRef();


      useGSAP(() => {
    document.fonts.ready.then(() => {
  // const greenLayer = container.current.querySelector(".layer-green");
  // const contentContainer = container.current.querySelector(".content-container");
  const alineaFirst = container.current.querySelector(".first");
  const alineaSecond = container.current.querySelector(".second");

  // gsap.to(greenLayer, {
  //   scrollTrigger: {
  //     trigger: contentContainer,
  //     start: "top center",
  //     // markers: true,
  //     toggleActions: "play reverse play reverse",
  //   },
  //   opacity: 1,
  //   duration: 0.6,
  //   ease: "power1.inOut",
  // });

  // gsap.from(alineaFirst, {
  //   scrollTrigger: {
  //     trigger: alineaFirst,
  //     start: "top center",
  //     toggleActions: "play none none none",
  //   },
  //   y: 100,
  //   opacity: 0,
  //   duration: 0.6,
  //   ease: "power2.out",
  // });

  //   gsap.from(alineaSecond, {
  //   scrollTrigger: {
  //     trigger: alineaSecond,
  //     start: "top center",
  //     toggleActions: "play none none none",
  //   },
  //   y: 100,
  //   opacity: 0,
  //   duration: 0.6,
  //   ease: "power2.out",
  // });

  const split = SplitText.create(alineaFirst, { type: "words", wordsClass: "wordInfoSection++" });
  gsap.from(split.words, {
    scrollTrigger: {
      trigger: alineaFirst,
      start: "top center",
      toggleActions: "play none none none",
    },
     autoAlpha: 0,
  scale: 0, filter: "blur(4px)",
  stagger: { each: 0.03, from: "center" },
  duration: 0.5, ease: "power2.out"
  });
  const splitSecond = SplitText.create(alineaSecond, { type: "words", wordsClass: "wordInfoSection++" });
  gsap.from(splitSecond.words, {
    scrollTrigger: {
      trigger: alineaSecond,
      start: "top center",
      toggleActions: "play none none none",
    },
     autoAlpha: 0,
  scale: 0, filter: "blur(4px)",
  stagger: { each: 0.03, from: "center" },
  duration: 0.5, ease: "power2.out"
  });
requestAnimationFrame(() => {
    ScrollTrigger.refresh();

    ScrollSmoother.get()?.refresh();
})
})
}, { scope: container });


    // Animatie voor kleur overgang
  // useGSAP(() => {

  //   const leftLayer =
  //     container.current.querySelector(".hover-layer-left");

  //   const rightLayer =
  //     container.current.querySelector(".hover-layer-right");

  //   const midText =
  //     container.current.querySelector(".homepage-hero");


  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: midText,
  //       start: "top top",
  //       end: "+=400",
  //       scrub: true,
  //     }
  //   })

  //     .to(
  //       rightLayer,
  //       {
  //         opacity: 1,
  //         ease: "power1.inOut"
  //       },
  //       0
  //     )

  //     .to(
  //       leftLayer,
  //       {
  //         opacity: 0,
  //         ease: "power1.inOut"
  //       },
  //       0
  //     )

  //     .fromTo(".mid-text", {
  //       opacity: 1,
  //     },
  //       {
  //         color: "#ffffff",
  //         ease: "power1.inOut"
  //       }, 0
  //     )



  // },
  //   { scope: container });


  
//  useGSAP(() => {
//       const splitAlinea = SplitText.create(".alinea", {
//         type: "words, lines",
//         wordsClass: "word++",
//         linesClass: "line",
//         autoSplit: true,
//         mask: "lines",

//         onSplit: (self) => {
//           return gsap.from(self.lines, {
//              duration: 0.6,
//             yPercent: 100,
//             opacity: 0,
//             stagger: {
//             amount: 0.1,
//             from: "begin",
//           },
//             ease: "expo.out",
//           });
//         },
//       });

//       return splitAlinea;
//     }, container);

  return (
    <section
      id="over-ons"
      className={`about-greenlights-component ${className}`}
      ref={container}
    >
         
      <section className="info-container">
            <div className="content-container">
                <p className="alinea first">
                Greenlights is hét IT-talentontwikkelingsbureau voor
                organisaties die duurzaam willen investeren in hun team. Wij
                geloven niet in stapels cv's. 
              </p>
              <p className="alinea second">
                Onze aanpak is persoonlijk en
                doelgericht: we selecteren gemotiveerde IT-starters op basis van
                motivatie, leervermogen en culturele fit. 
              </p>
            </div>
            <div className="info-image-container">
               <img className="info-image" data-speed="clamp(1.2)" src={heroImage1} alt="Over Greenlights" />
               {/* <img className="info-image" data-speed="clamp(1.7)" src={heroImage1} alt="Over Greenlights" />
               <img className="info-image" data-speed="clamp(1.3)" src={heroImage1} alt="Over Greenlights" /> */}
            </div>
              
      </section>
    </section>
  );
};

