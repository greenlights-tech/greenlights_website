import { useIntro } from "../context/IntroContext";
import { useLocation } from "react-router-dom";
export const Header = () => {
  const { introFinished } = useIntro();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // De header is onzichtbaar op Home zolang de intro niet klaar is.
  // Op alle andere pagina's (!isHome) is hij ALTIJD zichtbaar.
  const showHeader = !isHome || introFinished;
  return (
    <>
      <header className={`header flicker ${showHeader ? "show" : ""}`}>
        <div className="container">
          <div className="bg"></div>
          <div className="new-container-wrapper">
            <div className="new-container" data-flip-id="image"></div>
            <div className="tagline-wrapper">
              <p className="tagline">Slimme instroom, blijvend resultaat</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
