import React from "react";

export const ClientModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("./php/sendopdemail.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      alert(data);
      e.target.reset();
      onClose();
    } catch (error) {
      alert("Oops — something went wrong.");
      console.error(error);
    }
  };

  return (
    <div id="opd-modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            ✖
          </span>
          <h2>Invulformulier</h2>
        </div>
        <div className="modal-body">
          <form
            className="opd-form"
            id="opdrachtgeverForm"
            onSubmit={handleSubmit}
            method="post"
          >
            <input
              type="text"
              id="naam"
              name="naam"
              maxLength="100"
              placeholder="Naam*"
              required
            />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mailadres*"
              maxLength="50"
              required
            />
            <br />
            <input
              type="tel"
              id="tel"
              name="tel"
              placeholder="Mobiele telefoonummer"
              maxLength="12"
            />
            <br />
            <textarea
              id="opmerkingen"
              name="opmerkingen"
              className="big-textbox"
              placeholder="Opmerkingen..."
              maxLength="400"
            ></textarea>
            <br />
            <label>
              <input
                type="checkbox"
                id="voorwaarden"
                name="voorwaarden"
                value="voorwaarden"
                required
              />
              Ik ga akkoord met de{" "}
              <a href="./privacyverklaring.html" target="_blank">
                privacy verklaring
              </a>{" "}
              van Greenlights*
            </label>
            <br />
            <br />
            <input id="opd-versturen" type="submit" value="Versturen" />
          </form>
        </div>
      </div>
    </div>
  );
};
