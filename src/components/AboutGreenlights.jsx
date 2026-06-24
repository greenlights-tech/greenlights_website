import { useRef } from "react";
import { Link } from "react-router-dom";
// import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import heroImage1 from "../assets/cards-1.jpg";

import { gsap, useGSAP, ScrollTrigger, ScrollSmoother } from "../utils/gsap-setup";


// import { MdArrowOutward } from "react-icons/md";

export const AboutGreenlights = ({ className }) => {
    const container = useRef();

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

      .fromTo(".mid-text", {
        opacity: 1,
      },
        {
          color: "#ffffff",
          ease: "power1.inOut"
        }, 0
      )



  },
    { scope: container });
  

  return (
    <section
      id="over-ons"
      className={`about-greenlights-component ${className}`}
      ref={container}
    //   ref={container}
    >
<div className="info-title-container"></div>
         <h2 className="info-title">Over ons</h2>
      <section className="info-container">
            <div className="content-container">
                <div className="first alinea">
                Greenlights is hét IT-talentontwikkelingsbureau voor
                organisaties die duurzaam willen investeren in hun team. Wij
                geloven niet in stapels cv's. Onze aanpak is persoonlijk en
                doelgericht: we selecteren gemotiveerde IT-starters op basis van
                motivatie, leervermogen en culturele fit. 
              </div>
              <div className="second alinea">
                Deze toptalenten
                worden praktijkgericht opgeleid in de benodigde IT-skills en
                intensief begeleid door ervaren coaches. Door onze
                detavast-constructie groeit de starter uit tot een waardevol en
                vast teamlid snel inzetbaar, zonder te bouwen aan een flexibele
                schil. Zo maken we het aantrekken van passend IT-talent
                eenvoudiger én effectiever.
              </div>
            </div>
            <div className="info-image-container">
               <img className="info-image" src={heroImage1} alt="Over Greenlights" />
            </div>
              
      </section>
    </section>
  );
};

