import { Link } from "react-router-dom";
import { useRef } from "react";
import { GoChevronLeft } from "react-icons/go";
import missieVisieSvg from "../assets/missievisie.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);
// import { CustomEase } from "gsap/CustomEase";
// import Lenis from "lenis";

// import { MdArrowOutward } from "react-icons/md";

export const AboutPage = () => {
  const container = useRef();

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

  useGSAP(
    (context, contextSafe) => {
      document.fonts.ready.then(() => {
        contextSafe(() => {
          initCardSection();
        });
      });
    },
    { scope: container }
  );

  return (
    <div className="about-page" ref={container}>
      <div className="sol-home-button-wrapper">
        <Link to="/">
          <div className="sol-home-button-container" id="closeSolli">
            <div className="sol-home-button"></div>
            <div className="sol-home-button"></div>
          </div>
        </Link>
      </div>
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

      <section className="info-container-missievisie">
        <img className="info-missievisie-svg" src={missieVisieSvg} />
        {/* <!-- <div className="info-title">Missie</div>
          <div className="info-content">
            Greenlights stelt zich ten doel om gemotiveerde IT-starters duurzaam
            te verbinden aan organisaties. We doen dit door talent te selecteren
            op motivatie, leervermogen en culturele fit, hen op te leiden in de
            context van de praktijk en persoonlijk te begeleiden richting
            volwaardige inzetbaarheid. Onze missie is om de brug te slaan tussen
            ambitieus IT-talent en organisaties die vooruit willen, zodat beide
            kunnen groeien — zonder gedoe, maar mét impact.
          </div>
          <div className="info-title">Visie</div>
          <div className="info-content">
            Wij geloven in een arbeidsmarkt waarin motivatie en potentieel net
            zo zwaar wegen als ervaring en diploma's. In een snel veranderende
            digitale wereld is het essentieel dat organisaties kunnen bouwen aan
            wendbare en toekomstbestendige teams. Greenlights ziet het als haar
            rol om die ontwikkeling te versnellen door het anders te doen dan
            traditioneel recruitment of standaard traineeships. Wij zetten in op
            kwaliteit boven kwantiteit, op duurzame relaties in plaats van
            tijdelijke oplossingen, en op mensen die écht passen. Zo creëren we
            waarde — voor talent, voor teams en voor de toekomst.Waar zijn wij
            goed in?
          </div> --> */}
      </section>

      <section className="info-container-hoe">
        <div className="container">
          {/* <!-- <div className="info-title-test">
              <div className="pin">
                <h2>Hoe het werkt</h2>
              </div>
            </div> --> */}
          <div className="cards">
            <div className="card card1">
              <div className="card-content">
                <h3>Selectie op Motivatie & Fit</h3>
                <p>
                  Onze selectie focust op de menselijke factor: we screenen
                  kandidaten primair op motivatie, leervermogen en teamfit,
                  waardoor we sneller een duurzame match garanderen.
                </p>
                {/* <!-- <span>1</span> --> */}
              </div>
            </div>
            <div className="card card2">
              <div className="card-content">
                <h3>Praktijkgerichte Opleiding</h3>
                <p>
                  Uw behoeften staan centraal. De kandidaten doorlopen een op
                  maat gemaakte, praktijkgerichte training in de exacte
                  IT-skills die zij direct in hun toekomstige rol nodig hebben.
                </p>
                {/* <!-- <span>2</span> --> */}
              </div>
            </div>
            <div className="card card3">
              <div className="card-content">
                <h3>Persoonlijke Begeleiding</h3>
                <p>
                  Onze coaches bieden holistische begeleiding, zowel op
                  technische vaardigheden als op cruciale soft skills
                  (communicatie, probleemoplossing). Dit zorgt voor
                  professionele én persoonlijke groei.
                </p>
                {/* <!-- <span>3</span> --> */}
              </div>
            </div>
            <div className="card card4">
              <div className="card-content">
                <h3>Directe Inzet op Maat</h3>
                <p>
                  Dankzij de gerichte selectie en training zijn de starters
                  sneller inzetbaar. Ze dragen direct bij aan uw projecten en
                  werkzaamheden, zonder lange inwerktrajecten.
                </p>
                {/* <!-- <span>4</span> --> */}
              </div>
            </div>
            <div className="card card5">
              <div className="card-content">
                <h3>Duurzame Detavast-constructie</h3>
                <p>
                  Bouwen aan slagkracht, geen flexibele schil. De
                  detavast-formule geeft zowel u als de IT-starter de zekerheid
                  om na een proefperiode over te gaan naar een vast
                  dienstverband, wat leidt tot continuïteit en kennisbehoud.
                </p>
                {/* <!-- <span>5</span> --> */}
              </div>
            </div>

            {/* <!-- Deze aanpak van Greenlights zorgt ervoor dat organisaties zonder
                         gedoe geschikt IT-talent kunnen vinden en behouden, terwijl
                     IT-starters de kans krijgen om zich te ontwikkelen en een
                     waardevolle bijdrage te leveren aan hun nieuwe werkomgeving. --> */}
          </div>
        </div>
        <div className="container2"></div>
      </section>
    </div>
  );
};
