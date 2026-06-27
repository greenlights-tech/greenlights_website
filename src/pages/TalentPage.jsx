import { useRef } from "react";
import { Link } from "react-router-dom";
import { AboutSectionObserver } from "../components/AboutSectionObserver";

// import { BlogSection } from "../components/BlogSection";
// import { Footer } from "../components/Footer";
// import { SollicitatieModal } from "../components/SollicitatieModal";
// import { MdArrowOutward } from "react-icons/md";

import {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  useGSAP,
} from "../utils/gsap-setup";

export const TalentPage = () => {
  const container = useRef();
  // const { pathname, hash } = useLocation();
  // const navigate = useNavigate();

  // const scrollToSection = (id) => {
  //   const smoother = ScrollSmoother.get();
  //   if (smoother) {
  //     smoother.scrollTo(id, true, "top top");
  //   }
  // };

  // // Dit is voor als je een link doorstuurt
  // // Alleen als je de pagina vers opent, kijkt hij of er een #hash is en scrollt hij daarheen
  // useEffect(() => {
  //   if (hash) {
  //     const timer = setTimeout(() => {
  //       document.fonts.ready.then(() => {
  //         // // Forceer GSAP om alle hoogtes opnieuw te berekenen
  //         ScrollTrigger.refresh();

  //         // // Scroll nu pas naar de sectie
  //         scrollToSection(hash);
  //       });
  //     }, 200);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  // useGSAP(
  //   () => {
  //     const sections = gsap.utils.toArray(".talent-section");

  //     sections.forEach((section) => {
  //       ScrollTrigger.create({
  //         trigger: section,
  //         start: "top 5%",
  //         end: "bottom 5%",
  //         onToggle: (self) => {
  //           if (self.isActive) {
  //             navigate(`${pathname}#${section.id}`, { replace: true });
  //           }
  //         },
  //       });
  //     });

  //     ScrollTrigger.create({
  //       start: 0,
  //       end: "top 10%",
  //       trigger: sections[0],
  //       onLeaveBack: () => navigate(pathname, { replace: true }),
  //     });
  //   },
  //   { scope: container }
  // );

  return (
    <div ref={container} className="sol-page">
      <AboutSectionObserver />
      
     


      {/* <BlogSection className="talent-section" /> */}
      {/* <Footer className="talent-section" /> */}
    </div>
  );
};
