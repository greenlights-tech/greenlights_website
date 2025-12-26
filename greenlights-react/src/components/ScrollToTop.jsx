import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      // // De 'true' forceert een directe sprong naar boven zonder 'smooth' animatie
      smoother.scrollTop(0, true);
    } else {
      window.scrollTo(0, 0);
    }

    // // Belangrijk: Refresh ScrollTriggers zodat de nieuwe pagina
    // // de juiste start/end posities berekent
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
};
