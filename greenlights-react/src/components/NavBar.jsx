import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const NavBar = () => {
  const { pathname } = useLocation();

  const showNav = pathname === "/opdrachtgever" || pathname === "/talent";

  const handleScroll = (id) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(id, true, "top top");
    }
  };

  if (!showNav) return null;

  return (
    <nav className="nav-bar">
      <button onClick={() => handleScroll("#belofte")}>Belofte</button>
      <button onClick={() => handleScroll("#over-ons")}>Over ons</button>
      <button onClick={() => handleScroll("#blog")}>Blog</button>
      <button onClick={() => handleScroll("#contact")}>Contact</button>
    </nav>
  );
};
