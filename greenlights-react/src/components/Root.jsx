import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
// import { ScrollToTop } from "./ScrollToTop";
import { Header } from "./Header";
// import { SwitchProvider } from "../context/SwitchContext";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export const Root = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2, // Iets hogere waarde voor dat 'premium' gevoel
      effects: true,
    });
  }, []);

  return (
    <>
      {/* <SwitchProvider> */}

      <div id="smooth-wrapper" className="layout-wrapper">
        <div id="smooth-content">
          <Header />
          {/* <ScrollToTop /> */}
          <Outlet />
        </div>

        {/* <Footer /> */}
      </div>

      {/* </SwitchProvider> */}
    </>
  );
};
