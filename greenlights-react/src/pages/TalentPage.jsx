import { useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { AboutSection } from "../components/AboutSection";
import { BlogSection } from "../components/BlogSection";
import { Footer } from "../components/Footer";
// import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export const TalentPage = () => {
  const container = useRef();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(id, true, "top top");
    }
  };

  // Dit is voor als je een link doorstuurt
  // Alleen als je de pagina vers opent, kijkt hij of er een #hash is en scrollt hij daarheen
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.fonts.ready.then(() => {
          // // Forceer GSAP om alle hoogtes opnieuw te berekenen
          ScrollTrigger.refresh();

          // // Scroll nu pas naar de sectie
          scrollToSection(hash);
        });
      }, 200); // // 200ms is genoeg voor de Header-check en de Smoother

      return () => clearTimeout(timer);
    }
  }, []);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".talent-section");

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 5%",
          end: "bottom 5%",
          onToggle: (self) => {
            if (self.isActive) {
              navigate(`${pathname}#${section.id}`, { replace: true });
            }
          },
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "top 10%",
        trigger: sections[0],
        onLeaveBack: () => navigate(pathname, { replace: true }),
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="sol-page">
      {/* <nav className="nav-bar">
        <button onClick={() => scrollToSection("#belofte")}>Belofte</button>
        <button onClick={() => scrollToSection("#over-ons")}>Over ons</button>
        <button onClick={() => scrollToSection("#blog")}>Blog</button>
        <button onClick={() => scrollToSection("#contact")}>Contact</button>
      </nav> */}
      <div className="sol-home-button-wrapper">
        <Link to="/">
          <div className="sol-home-button-container" id="closeSolli">
            <div className="sol-home-button"></div>
            <div className="sol-home-button"></div>
          </div>
        </Link>
      </div>
      <section id="belofte" className="talent-section">
        <h2 className="sol-title">Onze belofte</h2>

        <div className="sol-content">
          <p>
            Greenlights gelooft in de potentie van het individu. Wij bieden
            maatwerk en de juiste ondersteuning. De belofte is helder: duurzame
            inzetbaarheid door begeleiding, feedback en ruimte om te groeien,
            zowel voor starters en professionals met ervaring.
          </p>
        </div>
        <div className="sol-content">
          <h3>Waarom Greenlights?</h3>
          <p>
            De wereld veranderd in rap tempo. Organisaties worstelen met verloop
            en toekomstbestendige vaardigheden van werknemers. Greenlights
            begeleid je met aandacht, biedt zelfinzicht en helpt de regie te
            nemen over je loopbaan. Zo versterken we zowel het individu als de
            organisatie.
          </p>
        </div>
        {/* <!-- <img className="photo-solpage" src="images/foto1.jpg" alt="" /> -->

            <!-- <div className="checkmarks-container">
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p className="paragraph paragraph-first">
                    Deelnemers ervaren meer werkplezier na begeleiding via
                    Greenlights
                  </p>
                </div>
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p className="paragraph paragraph-second">
                    Greenlighters nemen sneller concrete vervolgstappen in hun
                    loopbaan.
                  </p>
                </div>
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p className="paragraph paragraph-third">
                    Samenwerkende organisaties ervaren minder ziekteverzuim en
                    hoge tevredenheid van medewerkers!
                  </p>
                </div>
                </div> --> */}
        <div className="sol-button-wrapper">
          <div className="button-container">
            <h4>Klaar voor je IT-start?</h4>
            <button
              id="sol-signup-button"
              className="btn--gradient sol-signup-button"
            >
              <span className="sol-signup-button-text"> Ik doe mee! </span>
            </button>
          </div>

          <div className="meer-weten-container">
            <h4>Meer weten?</h4>
            <Link to="/about">
              <div className="meer-weten-pijl-container" id="meerWetenSol">
                <div className="meer-weten-pijl"></div>
                <div className="meer-weten-pijl"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <AboutSection className="talent-section" />
      <BlogSection className="talent-section" />
      <Footer className="talent-section" />
    </div>
  );
};
