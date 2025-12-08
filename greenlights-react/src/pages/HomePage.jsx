export const HomePage = () => {
  return (
    <section className="teasers-container-swiper">
      <div className="mid-text-container">
        <div className="mid-text-sollicitant">
          <h2>
            Jij hebt de skills, zij de uitdaging, wij zorgen voor de match
          </h2>
        </div>
        <div className="mid-text-opdrachtgever">
          <h2>
            Wij versnellen digitale ambities door passend IT-talent te koppelen
          </h2>
        </div>
      </div>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div
              id="openSolliMobile"
              className="teaser-swiper leftSwiper left"
              aria-label="Ontdek opdrachten"
            >
              <div className="centered-text">
                <p className="centered-subtext">
                  Ontdek <span className="highlight">opdrachten</span>
                </p>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div
              id="openOpdrachtgeverMobile"
              className="teaser-swiper rightSwiper right"
              aria-label="Ontdek trainees"
            >
              <div className="centered-text">
                <p className="centered-subtext">
                  Ontdek <span className="highlight">trainees</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-pagination" aria-hidden="true"></div>
      </div>
    </section>
  );
};
