import { useState, useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother);

export const NavBar = () => {
  const { pathname, hash } = useLocation();
  const navRef = useRef();
  const [selectedHash, setSelectedHash] = useState(null);

  const handleScroll = (id) => {
    setSelectedHash(id); // Tekst wordt direct groen
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(id, true, "top top");
    }
  };

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const marker = navRef.current.querySelector(".marker");
    // HIER GEBEURT HET: De balk zoekt de button die 'active' is (door de scroll)
    const activeItem = navRef.current.querySelector(".active");

    if (marker && activeItem) {
      const state = Flip.getState(marker);

      // Verplaats de balk fysiek naar de actieve button
      activeItem.appendChild(marker);

      Flip.from(state, {
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  }, [hash]); // De balk 'flipt' alleen als de HASH verandert (de scroll)

  const showNav = pathname === "/opdrachtgever" || pathname === "/talent";
  if (!showNav) return null;

  return (
    <nav className="nav-bar" ref={navRef}>
      {/* De balk die we gaan verschuiven */}
      <div className="marker"></div>

      <button
        onClick={() => handleScroll("#belofte")}
        className={`${hash === "#belofte" ? "active" : ""} ${
          selectedHash === "#belofte" ? "selected" : ""
        }`}
      >
        <span className="button-text">Belofte</span>
      </button>

      <button
        onClick={() => handleScroll("#over-ons")}
        className={`${hash === "#over-ons" ? "active" : ""} ${
          selectedHash === "#over-ons" ? "selected" : ""
        }`}
      >
        <span className="button-text">Over ons</span>
      </button>

      <button
        onClick={() => handleScroll("#blog")}
        className={`${hash === "#blog" ? "active" : ""} ${
          selectedHash === "#blog" ? "selected" : ""
        }`}
      >
        <span className="button-text">Blog</span>
      </button>

      <button
        onClick={() => handleScroll("#contact")}
        className={`${hash === "#contact" ? "active" : ""} ${
          selectedHash === "#contact" ? "selected" : ""
        }`}
      >
        <span className="button-text">Contact</span>
      </button>
    </nav>
  );
};
