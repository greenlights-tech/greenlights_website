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


 useGSAP(() => {
      const splitAlinea = SplitText.create(".alinea", {
        type: "words, lines",
        wordsClass: "word++",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",

        onSplit: (self) => {
          return gsap.from(self.lines, {
             duration: 0.6,
            yPercent: 100,
            opacity: 0,
            stagger: {
            amount: 0.1,
            from: "begin",
          },
            ease: "expo.out",
          });
        },
      });

      return splitAlinea;
    }, container);

  return (
    <section
      id="over-ons"
      className={`about-greenlights-component ${className}`}
      ref={container}
    >
         
      <section className="info-container">
            <div className="content-container">
                <p className="alinea">
                Greenlights is hét IT-talentontwikkelingsbureau voor
                organisaties die duurzaam willen investeren in hun team. Wij
                geloven niet in stapels cv's. Onze aanpak is persoonlijk en
                doelgericht: we selecteren gemotiveerde IT-starters op basis van
                motivatie, leervermogen en culturele fit. 
              </p>
              <p className="alinea">
                Deze toptalenten
                worden praktijkgericht opgeleid in de benodigde IT-skills en
                intensief begeleid door ervaren coaches. Door onze
                detavast-constructie groeit de starter uit tot een waardevol en
                vast teamlid snel inzetbaar, zonder te bouwen aan een flexibele
                schil. Zo maken we het aantrekken van passend IT-talent
                eenvoudiger én effectiever.
              </p>
            </div>
            <div className="info-image-container">
               <img className="info-image" data-speed="clamp(1.2)" src={heroImage1} alt="Over Greenlights" />
            </div>
              
      </section>
    </section>
  );
};

