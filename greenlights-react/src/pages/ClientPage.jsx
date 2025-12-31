import { useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { AboutSection } from "../components/AboutSection";
import { BlogSection } from "../components/BlogSection";
import { Footer } from "../components/Footer";
import { GoChevronLeft } from "react-icons/go";
// import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export const ClientPage = () => {
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
      document.fonts.ready.then(() => {
        scrollToSection(hash);
      });
    }
  }, []);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".client-section");

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
    <div ref={container} className="opd-page">
      {/* <nav className="nav-bar">
        <button onClick={() => scrollToSection("#belofte")}>Belofte</button>
        <button onClick={() => scrollToSection("#over-ons")}>Over ons</button>
        <button onClick={() => scrollToSection("#blog")}>Blog</button>
        <button onClick={() => scrollToSection("#contact")}>Contact</button>
      </nav> */}
      <div className="opd-home-button-wrapper">
        <Link to="/">
          <div className="opd-home-button-container" id="closeOpdrachtgever">
            <div className="opd-home-button"></div>
            <div className="opd-home-button"></div>
          </div>
        </Link>
      </div>
      <section id="belofte" className="client-section">
        <h2 className="opd-title">Onze belofte</h2>

        <div className="opd-content">
          <p>
            Snel, passend IT-talent vinden, geselecteerd op motivatie, groei
            mind-set en passend bij uw bedrijfscultuur. Kandidaten zijn
            opgeleid, specifiek voor uw behoefte en krijgen persoonlijke
            begeleiding tot ze volledig meedraaien. Wij investeren in de
            toekomst van uw team, met intentie tot in dienst treding.
          </p>
        </div>
        <div className="opd-content">
          <h3>Waarom Greenlights?</h3>
          <p>
            Greenlights biedt het hoofd aan de hevige strijd om startend
            IT-talent te binden aan uw organisatie. In het werkveld zien we dat
            men tegen dezelfde problemen aanloopt: generieke profielen, lange
            inwerktijd en onvoldoende aansluiting op de praktijk. Wij leveren
            zorgvuldig geselecteerd talent. Een maatwerktraject, afgestemd op uw
            opdracht!
          </p>
        </div>

        {/* <!-- <div className="checkmarks-container">
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p>
                    Opdrachtgevers geven aan dat kandidaten sneller inzetbaar
                    zijn
                  </p>
                </div>
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p>
                    Selectie op basis van motivatie, leervermogen en cultuur
                  </p>
                </div>
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p>Volledige begeleiding tot inzetbaarheid</p>
                </div>
              </div> --> */}
        <div className="opd-button-wrapper">
          <div className="button-container">
            <h4>Nieuw IT-talent nodig?</h4>
            <button
              id="opd-signup-button"
              className="btn--gradient sol-signup-button"
            >
              <span className="sol-signup-button-text"> Neem contact op </span>
            </button>
          </div>
          <div className="meer-weten-container">
            <h4>Meer weten?</h4>
            <Link to="/about">
              <div className="meer-weten-pijl-container" id="meerWetenOpd">
                <div className="meer-weten-pijl"></div>
                <div className="meer-weten-pijl"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <AboutSection className="client-section" />
      <BlogSection className="client-section" />
      <Footer className="client-section" />
    </div>
  );
};
