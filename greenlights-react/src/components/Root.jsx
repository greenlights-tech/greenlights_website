import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { SwitchProvider } from "../context/SwitchContext";

export const Root = () => {
  return (
    <>
      <SwitchProvider>
        <div className="layout-wrapper">
          <Header />
          <ScrollToTop />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </SwitchProvider>
    </>
  );
};
