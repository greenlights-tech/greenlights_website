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
  const imageRefs = useRef([]);

  useGSAP(
    () => {
      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-container",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        const position = i;
        if (!currentImage || !nextImage) continue;

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );
  return (
    <section
      id="over-ons"
      className={`about-component ${className}`}
      ref={container}
    >
      <section className="cards-container">
        <div className="cards">
          {[
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
          ].map((card, i) => (
            <div
              key={i}
              className={`card card${i + 1}`}
              ref={(el) => (imageRefs.current[i] = el)}
            >
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
