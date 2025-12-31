import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { NavBar } from "./NavBar";
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
      <ScrollToTop />
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="layout-wrapper">
            <Header />

            <Outlet />
          </div>

          {/* <Footer /> */}
        </div>

        {/* </SwitchProvider> */}
      </div>
    </>
  );
};
