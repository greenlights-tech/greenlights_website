import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
// import { SwitchProvider } from "../context/SwitchContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export const Root = () => {
  return (
    <>
      {/* <SwitchProvider> */}

      {/* <Header /> */}
      <ScrollToTop />
      <Outlet />
      {/* <Footer /> */}

      {/* </SwitchProvider> */}
    </>
  );
};
