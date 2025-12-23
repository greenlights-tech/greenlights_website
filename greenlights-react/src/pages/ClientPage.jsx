import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
// import { MdArrowOutward } from "react-icons/md";

export const ClientPage = () => {
  return (
    <section class="opd-page">
      <div class="opd-home-button-wrapper">
        <Link to="/">
          <div class="opd-home-button-container" id="closeOpdrachtgever">
            <div class="opd-home-button"></div>
            <div class="opd-home-button"></div>
          </div>
        </Link>
      </div>
      <h2 class="opd-title">Onze belofte</h2>

      <div class="opd-content">
        <p>
          Snel, passend IT-talent vinden, geselecteerd op motivatie, groei
          mind-set en passend bij uw bedrijfscultuur. Kandidaten zijn opgeleid,
          specifiek voor uw behoefte en krijgen persoonlijke begeleiding tot ze
          volledig meedraaien. Wij investeren in de toekomst van uw team, met
          intentie tot in dienst treding.
        </p>
      </div>
      <div class="opd-content">
        <h3>Waarom Greenlights?</h3>
        <p>
          Greenlights biedt het hoofd aan de hevige strijd om startend IT-talent
          te binden aan uw organisatie. In het werkveld zien we dat men tegen
          dezelfde problemen aanloopt: generieke profielen, lange inwerktijd en
          onvoldoende aansluiting op de praktijk. Wij leveren zorgvuldig
          geselecteerd talent. Een maatwerktraject, afgestemd op uw opdracht!
        </p>
      </div>

      {/* <!-- <div class="checkmarks-container">
                <div class="checkmark-container">
                  <span class="checkmark"></span>
                  <p>
                    Opdrachtgevers geven aan dat kandidaten sneller inzetbaar
                    zijn
                  </p>
                </div>
                <div class="checkmark-container">
                  <span class="checkmark"></span>
                  <p>
                    Selectie op basis van motivatie, leervermogen en cultuur
                  </p>
                </div>
                <div class="checkmark-container">
                  <span class="checkmark"></span>
                  <p>Volledige begeleiding tot inzetbaarheid</p>
                </div>
              </div> --> */}
      <div class="opd-button-wrapper">
        <div class="button-container">
          <h4>Nieuw IT-talent nodig?</h4>
          <button
            id="opd-signup-button"
            class="btn--gradient sol-signup-button"
          >
            <span class="sol-signup-button-text"> Neem contact op </span>
          </button>
        </div>
        <div class="meer-weten-container">
          <h4>Meer weten?</h4>
          <div class="meer-weten-pijl-container" id="meerWetenOpd">
            <div class="meer-weten-pijl"></div>
            <div class="meer-weten-pijl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
