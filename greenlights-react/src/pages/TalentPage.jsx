import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
// import { MdArrowOutward } from "react-icons/md";

export const TalentPage = () => {
  return (
    <section className="sol-page">
      <div className="sol-home-button-wrapper">
        <Link to="/">
          <div className="sol-home-button-container" id="closeSolli">
            <div className="sol-home-button"></div>
            <div className="sol-home-button"></div>
          </div>
        </Link>
      </div>

      <h2 className="sol-title">Onze belofte</h2>

      <div className="sol-content">
        <p>
          Greenlights gelooft in de potentie van het individu. Wij bieden
          maatwerk en de juiste ondersteuning. De belofte is helder: duurzame
          inzetbaarheid door begeleiding, feedback en ruimte om te groeien,
          zowel voor starters en professionals met ervaring.
        </p>
      </div>
      <div className="sol-content">
        <h3>Waarom Greenlights?</h3>
        <p>
          De wereld veranderd in rap tempo. Organisaties worstelen met verloop
          en toekomstbestendige vaardigheden van werknemers. Greenlights
          begeleid je met aandacht, biedt zelfinzicht en helpt de regie te nemen
          over je loopbaan. Zo versterken we zowel het individu als de
          organisatie.
        </p>
      </div>
      {/* <!-- <img className="photo-solpage" src="images/foto1.jpg" alt="" /> -->

            <!-- <div className="checkmarks-container">
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p className="paragraph paragraph-first">
                    Deelnemers ervaren meer werkplezier na begeleiding via
                    Greenlights
                  </p>
                </div>
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p className="paragraph paragraph-second">
                    Greenlighters nemen sneller concrete vervolgstappen in hun
                    loopbaan.
                  </p>
                </div>
                <div className="checkmark-container">
                  <span className="checkmark"></span>
                  <p className="paragraph paragraph-third">
                    Samenwerkende organisaties ervaren minder ziekteverzuim en
                    hoge tevredenheid van medewerkers!
                  </p>
                </div>
                </div> --> */}
      <div className="sol-button-wrapper">
        <div className="button-container">
          <h4>Klaar voor je IT-start?</h4>
          <button
            id="sol-signup-button"
            className="btn--gradient sol-signup-button"
          >
            <span className="sol-signup-button-text"> Ik doe mee! </span>
          </button>
        </div>

        <div className="meer-weten-container">
          <h4>Meer weten?</h4>
          <Link to="/about">
            <div className="meer-weten-pijl-container" id="meerWetenSol">
              <div className="meer-weten-pijl"></div>
              <div className="meer-weten-pijl"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
