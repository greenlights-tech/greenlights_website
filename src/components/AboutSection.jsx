import { Link } from "react-router-dom";
import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
// import { CustomEase } from "gsap/CustomEase";
// import Lenis from "lenis";

// import { MdArrowOutward } from "react-icons/md";

export const AboutSection = ({ className }) => {
  const container = useRef();
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);

    if (!cards.length) return;

    cards.forEach((card, i) => {
      const inner = card.querySelector(".card-content");

      // 1. MAIN ANIMATION (transform)
      gsap.to(inner, {
        scale: 0.75,
        rotation: i % 2 === 0 ? 4 : -4,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: "+=" + window.innerHeight,
          scrub: true,
          pin: inner,   // 👈 belangrijk: PIN INNER, niet card
        },
      });

      // 2. FADE OUT
      gsap.to(inner, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top -60%",
          end: "top -100%",
          scrub: true,
        },
      });
    });
  }, { scope: container });

  const data = [
    {
      title: "Selectie op Motivatie & Fit",
      text: "Onze selectie focust op de menselijke factor...",
    },
    {
      title: "Praktijkgerichte Opleiding",
      text: "Uw behoeften staan centraal...",
    },
    {
      title: "Persoonlijke Begeleiding",
      text: "Onze coaches bieden holistische begeleiding...",
    },
    {
      title: "Directe Inzet op Maat",
      text: "Dankzij de gerichte selectie...",
    },
    {
      title: "Duurzame Detavast-constructie",
      text: "Bouwen aan slagkracht...",
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
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};