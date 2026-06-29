import { Outlet } from "react-router-dom";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
// import { ScrollToTop } from "./ScrollToTop";
// import { NavBar } from "./NavBar";
// import { WhatsAppButton } from "./WhatsappButton";
import { Header } from "./Header";
// import { SwitchProvider } from "../context/SwitchContext";
import {
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
} from "../utils/gsap-setup";

export const Root = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
  }, []);

  return (
    <>
      {/* <SwitchProvider> */}
      {/* <ScrollToTop /> */}
      {/* <NavBar />
      <WhatsAppButton /> */}
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* <Header /> */}

          <Outlet />


          {/* <Footer /> */}
        </div>

        {/* </SwitchProvider> */}
      </div>
    </>
  );
};
