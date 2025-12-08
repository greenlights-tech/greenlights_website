import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
// import { MdArrowOutward } from "react-icons/md";

export const AboutPage = () => {
  return (
    <div className="information-page">
      <div className="nav-terug-wrapper">
        {" "}
        <Link to="/">
          <div className="nav-terug">
            <GoChevronLeft />
            <p>Terug</p>
          </div>
        </Link>
      </div>
      <h1> Contact</h1>

      <p>
        Heb je vragen, opmerkingen of wil je in contact komen met{" "}
        <strong>Qquest</strong>? Hieronder vind je onze gegevens en het
        contactformulier.
      </p>

      <ul>
        <li>
          <strong>Adres:</strong> Arthur van Schendelstraat 650, 3511 MJ Utrecht
        </li>
        <li>
          <strong>Telefoon:</strong> +31 (0)85 401 1700
        </li>
        <li>
          <strong>E-mail:</strong>{" "}
          <a className="mailLink" href="mailto:info@qquest.nl">
            info@qquest.nl
          </a>
        </li>
      </ul>

      {/* <p>
        Je kunt ook ons contactformulier gebruiken. Wij streven ernaar binnen 2
        werkdagen te reageren.
      </p>
      <div className="btn-contactpage-wrapper">
        <a
          href="https://www.qquest.nl/sales-contact/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn--gradient-contact btn-contact"
        >
          <span className="btn-text">Contact</span>
          <MdArrowOutward className="icon" />
        </a>
      </div>
      <p>
        Wil je op de hoogte blijven van onze Qquest projecten en andere leuke
        updates? Meld je dan aan voor onze nieuwsbrief!{" "}
      </p>
      <div className="btn-contactpage-wrapper">
        <a
          href="https://www.qquest.nl/blijf-op-de-hoogte/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn--gradient-more-info btn-more-info"
        >
          <span className="btn-text">Aanmelden</span>
          <MdArrowOutward className="icon" />
        </a>
      </div> */}
    </div>
  );
};
