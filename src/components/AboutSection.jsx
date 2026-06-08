import { Link } from "react-router-dom";
import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cardImage1 from "../assets/cards-1.jpg";
import cardImage2 from "../assets/cards-2.jpg";
import cardImage3 from "../assets/cards-3.jpg";
import cardImage4 from "../assets/cards-4.jpg";
import cardImage5 from "../assets/cards-5.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);


// import { MdArrowOutward } from "react-icons/md";

export const AboutSection = ({ className }) => {
  const container = useRef();
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);

    if (!cards.length) return;

    cards.forEach((card, i) => {
      const pin = card.querySelector(".card-pin");
      const inner = card.querySelector(".card-content");


      // 1. MAIN ANIMATION (transform)
      gsap.to(inner, {
        scale: 0.65,
        // rotationX: 20,
        // rotationZ: i % 2 === 0 ? 4 : -4,
        rotationX: 0,
        rotationZ: 0,
        y: -40,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: '+=' + window.innerHeight,
          scrub: true,
          pin: pin,
          invalidateOnRefresh: true,
        },
      });

      // 2. FADE OUT
      gsap.to(inner, {
        autoAlpha: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: card,
          start: "top -80%",
          end: "top -100%",
          scrub: true,
        },
      });
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

  }, { scope: container });

  const data = [
    {
      title: "Selectie op Motivatie & Fit",
      text: "Onze selectie focust op de menselijke factor: we screenen kandidaten primair op motivatie, leervermogen en teamfit, waardoor we sneller een duurzame match garanderen.",
      image: cardImage1,
    },
    {
      title: "Praktijkgerichte Opleiding",
      text: "Uw behoeften staan centraal. De kandidaten doorlopen een op maat gemaakte, praktijkgerichte training in de exacte IT-skills die zij direct in hun toekomstige rol nodig hebben.",
      image: cardImage2,
    },
    {
      title: "Persoonlijke Begeleiding",
      text: "Onze coaches bieden holistische begeleiding, zowel op technische vaardigheden als op cruciale soft skills (communicatie, probleemoplossing). Dit zorgt voor professionele én persoonlijke groei.",
      image: cardImage3,
    },
    {
      title: "Directe Inzet op Maat",
      text: "Dankzij de gerichte selectie en training zijn de starters sneller inzetbaar. Ze dragen direct bij aan uw projecten en werkzaamheden, zonder lange inwerktrajecten.",
      image: cardImage4,
    },
    {
      title: "Duurzame Detavast-constructie",
      text: " Bouwen aan slagkracht, geen flexibele schil. De detavast-formule geeft zowel u als de IT-starter de zekerheid om na een proefperiode over te gaan naar een vast dienstverband, wat leidt tot continuïteit en kennisbehoud.",
      image: cardImage5,
    },
  ];

  return (
    <section
      id="over-ons"
      className={`about-component ${className}`}
      ref={container}
    >
      <section className="cards-container">
        {data.map((card, i) => (
          <div
            key={i}
            className={`card card-${i}`}
            ref={(el) => (cardsRef.current[i] = el)}
          >

            <div className="card-pin">
              <div className="card-content">

                <img className="card-image" src={card.image} alt={card.title} />




                <div className="card-text-wrapper">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{card.text}</p>
                </div>

              </div>
            </div>

          </div>
        ))}
      </section>
    </section>
  );
};