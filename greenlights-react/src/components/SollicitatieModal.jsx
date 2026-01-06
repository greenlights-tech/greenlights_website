import React from "react";

export const SollicitatieModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Als hij niet open is, teken dan niks

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("./php/sendsolemail.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      alert(data);
      e.target.reset();
      onClose(); // Sluit modal na verzenden
    } catch (error) {
      alert("Oops — something went wrong.");
      console.error(error);
    }
  };

  return (
    <div id="sol-modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            ✖
          </span>
          <h2>Invulformulier</h2>
        </div>
        <div className="modal-body">
          <form
            className="sol-form"
            id="sollicitatieForm"
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <input
              type="text"
              id="naam"
              name="naam"
              maxLength="50"
              placeholder="naam*"
              required
            />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mailadres*"
              maxLength="100"
              required
            />
            <br />
            <input
              type="tel"
              id="tel"
              name="tel"
              placeholder="Mobiel telefoonummer"
              maxLength="20"
            />
            <br />
            <label htmlFor="cv">
              <b>Upload CV:</b>
            </label>
            <input type="file" id="cv" name="cv" accept=".pdf" />
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
            <input id="Sol-versturen" type="submit" value="Versturen" />
          </form>
        </div>
      </div>
    </div>
  );
};
