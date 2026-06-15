import { Link } from "react-router-dom";
// import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);


// import { MdArrowOutward } from "react-icons/md";

export const AboutGreenlights = ({ className }) => {
  

  return (
    <section
      id="over-ons"
      className={`about-component ${className}`}
    //   ref={container}
    >
      <section className="info-container-effect">
        <div className="pin-height">
          <div className="info-container">
            <div className="info-title-wie">Over ons</div>
            <div className="alineas">
              <div className="first alinea-mobile"></div>
              <div className="second alinea alinea-mobile">
                Greenlights is hét IT-talentontwikkelingsbureau voor
                organisaties die duurzaam willen investeren in hun team. Wij
                geloven niet in stapels cv's. Onze aanpak is persoonlijk en
                doelgericht: we selecteren gemotiveerde IT-starters op basis van
                motivatie, leervermogen en culturele fit. Deze toptalenten
                worden praktijkgericht opgeleid in de benodigde IT-skills en
                intensief begeleid door ervaren coaches. Door onze
                detavast-constructie groeit de starter uit tot een waardevol en
                vast teamlid snel inzetbaar, zonder te bouwen aan een flexibele
                schil. Zo maken we het aantrekken van passend IT-talent
                eenvoudiger én effectiever.
              </div>
              <div className="third alinea alinea-mobile"></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

