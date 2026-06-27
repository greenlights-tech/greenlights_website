import { useRef } from "react";
import { Link } from "react-router-dom";
// import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import heroImage1 from "../assets/cards-1.jpg";

import { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText } from "../utils/gsap-setup";


// import { MdArrowOutward } from "react-icons/md";

export const AboutSectionObserver = ({ className }) => {
    const container = useRef();


  useGSAP(() => {
    const sections = container.current.querySelectorAll(".about-section");
    const images = container.current.querySelectorAll(".about-bg");

    const headings = gsap.utils.toArray(
      container.current.querySelectorAll(".section-heading")
    );

    const outerWrappers = gsap.utils.toArray(
      container.current.querySelectorAll(".about-outer")
    );

    const innerWrappers = gsap.utils.toArray(
      container.current.querySelectorAll(".about-inner")
    );

    const splitHeadings = headings.map(
      heading =>
        new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "clip-text",
        })
    );

    let currentIndex = -1;
    let animating = false;

function clamp(index) {
  return Math.max(0, Math.min(index, sections.length - 1));
}

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index, direction) {
       index = clamp(index);
        if (index === currentIndex) return;

      animating = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: {
          duration: 1.25,
          ease: "power1.inOut",
        },
        onComplete: () => {
          animating = false;
        },
      });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });

        tl.to(images[currentIndex], {
          yPercent: -15 * dFactor,
        }).set(sections[currentIndex], {
          autoAlpha: 0,
        });
      }

      gsap.set(sections[index], {
        autoAlpha: 1,
        zIndex: 1,
      });

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          yPercent: i =>
            i ? -100 * dFactor : 100 * dFactor,
        },
        {
          yPercent: 0,
        },
        0
      )
        .fromTo(
          images[index],
          {
            yPercent: 15 * dFactor,
          },
          {
            yPercent: 0,
          },
          0
        )
        .fromTo(
          splitHeadings[index].chars,
          {
            autoAlpha: 0,
            scale: 0,
            yPercent: (i) => (i % 2 === 0 ? -100 : 100),
            filter: "blur(4px)"
          },
          {
            autoAlpha: 1,
            scale: 1,
            yPercent: 0,
            duration: 1.2,
            filter: "blur(0px)",
            ease: "power2.out",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );

      currentIndex = index;
    }

    ScrollTrigger.observe({
        target: ".about-greenlights-observer",
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: false,

      onDown: () => {
        if (!animating) {
          gotoSection(currentIndex - 1, -1);
        }
      },

      onUp: () => {
        if (!animating) {
          gotoSection(currentIndex + 1, 1);
        }
      },
    });

    gotoSection(0, 1);
  }, { scope: container });




  return (
    <div
      id="over-greenlights-observer"
      className={`about-greenlights-observer ${className}`}
      ref={container}
    >
         <header className="about-header">
  <div>Greenlights</div>
  <div>Menu</div>
</header>
<section className="about-section about-first">
  <div className="about-outer">
    <div className="about-inner">
      <div className="about-bg about-one">
        <h2 className="section-heading">Over Greenlights  </h2>
        <p>Greenlights is een Nederlands IT-talentontwikkelingsbureau dat zich richt op het vinden, selecteren en begeleiden van gemotiveerde IT-starters.

Wij kijken verder dan cv’s of standaard traineeships. Alles draait om motivatie, leervermogen en culturele fit met het team waarin iemand terechtkomt.</p>
{/* <div className="info-image-container">
               <img className="info-image info-image1"  src={heroImage1} alt="Over Greenlights" />
               <img className="info-image info-image2"  src={heroImage1} alt="Over Greenlights" />
               <img className="info-image info-image3" data-speed="clamp(1.3)" src={heroImage1} alt="Over Greenlights" />
                <img className="info-image info-image4" data-speed="clamp(1.3)" src={heroImage1} alt="Over Greenlights" />
            </div> */}
      </div>
    </div>
  </div>

</section>
<section className="about-section about-second">
  <div className="about-outer">
    <div className="about-inner">
        
      <div className="about-bg">
        <h2 className="section-heading">Wat doen we</h2>
        <p>Wij vinden en begeleiden IT-starters die willen groeien.
Geen cv’s, geen standaardtrajecten — maar selectie op motivatie, leervermogen en teamfit.</p>
 
      </div>
    </div>
  </div>
</section>
<section className="about-section about-third">
  <div className="about-outer">
    <div className="about-inner">
      <div className="about-bg">
        <h2 className="section-heading">Wat maakt ons anders</h2>
        <p>We leiden talent op in de praktijk en begeleiden ze intensief op de werkvloer.
Zo ontstaan geen tijdelijke krachten, maar echte teamleden.</p>
      </div>
    </div>
  </div>
</section>
<section className="about-section about-fourth">
  <div className="about-outer">
    <div className="about-inner">
      <div className="about-bg">
        <h2 className="section-heading">Missie</h2>
        <p>Wij bouwen aan duurzame IT-teams.
            Niet sneller vullen, maar beter verbinden — zodat organisaties écht kunnen groeien.</p>
      </div>
    </div>
  </div>
</section>
<section className="about-section about-fifth">
  <div className="about-outer">
    <div className="about-inner">
      <div className="about-bg">
        <h2 className="section-heading">Keep scrolling</h2>
      </div>
    </div>
  </div>
</section>
      
    </div>
  );
};