import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, Flip, ScrollSmoother);

export const NavBar = () => {
  const { pathname, hash } = useLocation();
  const navRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: navRef });

  const handleScroll = contextSafe((e) => {
    const targetId = e.currentTarget.getAttribute("data-id");
    if (!targetId) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      // Element buiten de scope zoeken omdat de secties ergens anders in de DOM staan
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        smoother.scrollTo(targetElement, true, "top top");
      }
    }
  });

  // Flip animatie voor de marker
  useGSAP(
    () => {
      if (!navRef.current) return;

      const marker = document.querySelector(".marker");
      const activeItem = document.querySelector(".active");

      if (marker && activeItem) {
        const state = Flip.getState(marker);
        activeItem.appendChild(marker);
        Flip.from(state, {
          duration: 0.5,
          ease: "power1.inOut",
          overwrite: "auto",
        });
      }
    },
    { dependencies: [hash], scope: navRef }
  );

  const showNav = pathname === "/opdrachtgever" || pathname === "/talent";
  if (!showNav) return null;

  return (
    <nav className="nav-bar" ref={navRef}>
      <div className="marker"></div>

      <button
        data-id="#belofte"
        onClick={handleScroll}
        className={hash === "#belofte" ? "active" : ""}
      >
        <span className="button-text">Belofte</span>
      </button>

      <button
        data-id="#over-ons"
        onClick={handleScroll}
        className={hash === "#over-ons" ? "active" : ""}
      >
        <span className="button-text">Over ons</span>
      </button>

      <button
        data-id="#blog"
        onClick={handleScroll}
        className={hash === "#blog" ? "active" : ""}
      >
        <span className="button-text">Blog</span>
      </button>

      <button
        data-id="#contact"
        onClick={handleScroll}
        className={hash === "#contact" ? "active" : ""}
      >
        <span className="button-text">Contact</span>
      </button>
    </nav>
  );
};
