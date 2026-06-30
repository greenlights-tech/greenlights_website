import { Link } from "react-router-dom";
import { useRef } from "react";
// import { GoChevronLeft } from "react-icons/go";
// import missieVisieSvg from "../assets/missievisie.svg";
import cardImage1 from "../assets/cards-1.jpg";
import cardImage2 from "../assets/cards-2.jpg";
import cardImage3 from "../assets/cards-3.jpg";
import cardImage4 from "../assets/cards-4.jpg";
import cardImage5 from "../assets/cards-5.jpg";


import { gsap, useGSAP, ScrollTrigger, ScrollSmoother } from "../utils/gsap-setup";


// import { MdArrowOutward } from "react-icons/md";

export const AboutHoriz = ({ className }) => {
  const container = useRef();

 useGSAP(() => {


    // Horizontal galleries
    const horizontalSections = gsap.utils.toArray(
      ".horiz-gallery-wrapper", container.current
    );

    horizontalSections.forEach((sec) => {
      const pinWrap = sec.querySelector(".horiz-gallery-strip");

      let pinWrapWidth;
      let horizontalScrollLength;

      function refresh() {
        pinWrapWidth = pinWrap.scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      }

      refresh();
      

      gsap.to(pinWrap, {
      scrollTrigger: {
        scrub: true,
        trigger: sec,
        pin: sec,
        start: "center center",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true
      },
      x: () => -horizontalScrollLength,
      ease: "none"
    });

      ScrollTrigger.addEventListener("refreshInit", refresh);
    });

    ScrollTrigger.refresh();
  }, { scope: container });

  return (
    <section
      id="over-ons"
      className={`about-horizontal ${className}`}
      ref={container}
    >
       <section className="panel plain">
      <h3></h3>
    </section>

    <section id="portfolio">
      <div className="container-fluid">
        <div className="horiz-gallery-wrapper">
          <div className="horiz-gallery-strip">
            <div className="project-wrap">
              <div className="content-container">
                 
                <h3 className="card-horiz-title">Selectie op Motivatie & Fit</h3>
                  <p className="card-horiz-text">Onze selectie focust op de menselijke factor: 
                    we screenen kandidaten primair op motivatie, leervermogen en teamfit, waardoor we sneller een duurzame match garanderen.</p>
                    <p className="card-horiz-nr">01</p>
              </div>
            
            </div>
           
           <div className="project-wrap">
              <div className="content-container">
                <h3 className="card-horiz-title">Praktijkgerichte Opleiding</h3>
                  <p className="card-horiz-text">Uw behoeften staan centraal. De kandidaten doorlopen een op maat gemaakte, 
                    praktijkgerichte training in de exacte IT-skills die zij direct in hun toekomstige rol nodig hebben.</p>
                     <p className="card-horiz-nr">02</p>
              </div>
            
            </div>
            
              <div className="project-wrap">
              <img src={cardImage3} alt="" />
            </div>
             <div className="project-wrap">
              <div className="content-container">
                 <h3 className="card-horiz-title">Persoonlijke Begeleiding</h3>
                  <p className="card-horiz-text">Onze coaches bieden holistische begeleiding, zowel op technische vaardigheden als op cruciale soft skills 
                    (communicatie, probleemoplossing). Dit zorgt voor professionele én persoonlijke groei.</p>
                     <p className="card-horiz-nr">03</p>
              </div>
            </div>
            <div className="project-wrap">
             <div className="content-container">
                 <h3 className="card-horiz-title">Directe Inzet op Maat</h3>
                  <p className="card-horiz-text">Dankzij de gerichte selectie en training zijn de starters sneller inzetbaar. 
                    Ze dragen direct bij aan uw projecten en werkzaamheden, zonder lange inwerktrajecten.</p>
                     <p className="card-horiz-nr">04</p>
             </div>
            </div>
           
          
            
           
              <div className="project-wrap">
              <img src={cardImage2} alt="" />
            </div>
            <div className="project-wrap">
             <div className="content-container">
                 <h3 className="card-horiz-title">Duurzame Detavast-constructie</h3>
                  <p className="card-horiz-text">Bouwen aan slagkracht, geen flexibele schil. 
                    De detavast-formule geeft zowel u als de IT-starter de zekerheid om na een proefperiode over te gaan naar een vast dienstverband, 
                    wat leidt tot continuïteit en kennisbehoud.</p>
                     <p className="card-horiz-nr">05</p>
             </div>
            </div>
            {/* <div className="project-wrap">
              <img src={cardImage5} alt="" />
            </div> */}
          </div>
        </div>

      </div>
    </section>

    <section className="panel plain">
      <h3>That's it!</h3>
    </section>
    </section>
  );
};