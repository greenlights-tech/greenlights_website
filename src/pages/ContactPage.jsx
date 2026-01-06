import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";

export const ContactPage = () => {
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
    </div>
  );
};
