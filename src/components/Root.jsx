import { Outlet } from "react-router-dom";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
// import { ScrollToTop } from "./ScrollToTop";
import { NavBar } from "./NavBar";
import { WhatsAppButton } from "./WhatsappButton";
import { Header } from "./Header";
// import { SwitchProvider } from "../context/SwitchContext";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
} from "../utils/gsap-setup";

export const Root = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
    });
  }, []);

  return (
    <>
      {/* <SwitchProvider> */}
      {/* <ScrollToTop /> */}
      <NavBar />
      <WhatsAppButton />
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
