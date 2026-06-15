import { Link } from "react-router-dom";
// import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage1 from "../assets/cards-1.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);


// import { MdArrowOutward } from "react-icons/md";

export const AboutGreenlights = ({ className }) => {
  

  return (
    <section
      id="over-ons"
      className={`about-greenlights-component ${className}`}
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
               <img className="card-image" src={heroImage1} alt="Over Greenlights" />
            </div>
              
      </section>
    </section>
  );
};

