import { useRef } from "react";
import { Link } from "react-router-dom";
// import { AboutSection } from "../components/AboutSection";
// import { AboutGreenlights } from "../components/AboutGreenlights";
import { AboutSectionObserver } from "../components/AboutSectionObserver";
// import { BlogSection } from "../components/BlogSection";
// import { Footer } from "../components/Footer";
// import { ClientModal } from "../components/ClientModal";
// import { MdArrowOutward } from "react-icons/md";

import {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  useGSAP,
} from "../utils/gsap-setup";

export const ClientPage = () => {
  const container = useRef();


 

  return (
    <div ref={container} className="about-page">
      <AboutSectionObserver />

      
    </div>
  );
};
