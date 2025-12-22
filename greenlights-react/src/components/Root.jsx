import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { Header } from "./Header";
// import { SwitchProvider } from "../context/SwitchContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Root = () => {
  return (
    <>
      {/* <SwitchProvider> */}

      <div className="layout-wrapper">
        <Header />
        <ScrollToTop />
        <Outlet />
      </div>

      {/* <Footer /> */}

      {/* </SwitchProvider> */}
    </>
  );
};
