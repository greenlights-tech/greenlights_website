import { useRef } from "react";
import { useIntro } from "../context/IntroContext";
import { useLocation } from "react-router-dom";

import { gsap, useGSAP } from "../utils/gsap-setup";

export const Header = () => {
  const { introFinished } = useIntro();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const headerRef = useRef(null);
  const reactLogoRef = useRef(null);

  // Deze ref zorgt ervoor dat we per pagina-wissel maar ÉÉN keer animeren
  const hasAnimatedRef = useRef("");

  useGSAP(
    () => {
      const container = document.querySelector(".new-container");
      if (!container) return;
      const logos = container.querySelectorAll(".child1");

      if (!isHome) {
        logos.forEach((logo) => {
          if (logo !== reactLogoRef.current) logo.remove();
        });

        // ALLEEN animeren als dit pad nog niet geanimeerd is
        // ÉN als de intro klaar is (of we niet op home zijn)
        const shouldAnimate = hasAnimatedRef.current !== location.pathname;

        if (shouldAnimate && headerRef.current) {
          hasAnimatedRef.current = location.pathname;

          // // Gebruik van kill() om eventuele lopende animaties op dit element te stoppen
          gsap.killTweensOf(headerRef.current);

          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              overwrite: "auto", // Zorgt dat nieuwe animaties oude overschrijven
            }
          );

          // if (reactLogoRef.current) {
          //   gsap.fromTo(
          //     reactLogoRef.current,
          //     { opacity: 0 },
          //     { opacity: 1, duration: 0.5, delay: 0.2 }
          //   );
          // }
        }
      } else if (isHome && introFinished) {
        // // Op home: Alleen opruimen
        if (logos.length > 1) {
          logos[0].remove();
        }
        hasAnimatedRef.current = "/"; // Reset voor als je  terugkomt
      }
    },
    { dependencies: [location.pathname, introFinished] }
  );
  // De dependencies zorgen ervoor dat de animatie alleen start als de pagina echt verandert

  const showHeader = !isHome || introFinished;
  const shouldRenderLogo = !isHome || introFinished;
  return (
    <>
      <header
        ref={headerRef}
        className={`header ${showHeader ? "show" : ""}`}
      // style={{ opacity: isHome ? 1 : 0 }}
      >
        <div className="container">
          <div className="bg"></div>
          <div className="new-container-wrapper">
            <div className="new-container" data-flip-id="image">
              {shouldRenderLogo && (
                <svg
                  ref={reactLogoRef}
                  className="child1"
                  data-flip-id="image"
                  // style={{
                  //   filter: "drop-shadow(0 0 1px #00dc82)",
                  // }}
                  width="296" height="70" viewBox="0 0 296 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M71.472 56.384C69.7013 56.384 68.0693 56.1067 66.576 55.552C65.104 54.976 63.8133 54.1653 62.704 53.12C61.616 52.0747 60.7627 50.848 60.144 49.44C59.5467 48.032 59.248 46.4853 59.248 44.8C59.248 43.1147 59.5467 41.568 60.144 40.16C60.7627 38.752 61.6267 37.5253 62.736 36.48C63.8453 35.4347 65.1467 34.6347 66.64 34.08C68.1333 33.504 69.776 33.216 71.568 33.216C73.552 33.216 75.3333 33.5467 76.912 34.208C78.512 34.8693 79.856 35.8293 80.944 37.088L77.616 40.16C76.8053 39.3067 75.92 38.6773 74.96 38.272C74 37.8453 72.9547 37.632 71.824 37.632C70.736 37.632 69.744 37.8027 68.848 38.144C67.952 38.4853 67.1733 38.976 66.512 39.616C65.872 40.256 65.3707 41.0133 65.008 41.888C64.6667 42.7627 64.496 43.7333 64.496 44.8C64.496 45.8453 64.6667 46.8053 65.008 47.68C65.3707 48.5547 65.872 49.3227 66.512 49.984C67.1733 50.624 67.9413 51.1147 68.816 51.456C69.712 51.7973 70.6933 51.968 71.76 51.968C72.784 51.968 73.776 51.808 74.736 51.488C75.7173 51.1467 76.6667 50.5813 77.584 49.792L80.528 53.536C79.312 54.4533 77.8933 55.1573 76.272 55.648C74.672 56.1387 73.072 56.384 71.472 56.384ZM75.792 52.864V44.448H80.528V53.536L75.792 52.864ZM85.3435 56V33.6H95.0395C97.0448 33.6 98.7728 33.9307 100.224 34.592C101.674 35.232 102.794 36.16 103.584 37.376C104.373 38.592 104.768 40.0427 104.768 41.728C104.768 43.392 104.373 44.832 103.584 46.048C102.794 47.2427 101.674 48.16 100.224 48.8C98.7728 49.44 97.0448 49.76 95.0395 49.76H88.2235L90.5275 47.488V56H85.3435ZM99.5835 56L93.9835 47.872H99.5195L105.184 56H99.5835ZM90.5275 48.064L88.2235 45.632H94.7515C96.3515 45.632 97.5462 45.2907 98.3355 44.608C99.1248 43.904 99.5195 42.944 99.5195 41.728C99.5195 40.4907 99.1248 39.5307 98.3355 38.848C97.5462 38.1653 96.3515 37.824 94.7515 37.824H88.2235L90.5275 35.36V48.064ZM113.643 42.624H124.427V46.656H113.643V42.624ZM114.027 51.84H126.219V56H108.875V33.6H125.803V37.76H114.027V51.84ZM135.112 42.624H145.896V46.656H135.112V42.624ZM135.496 51.84H147.688V56H130.344V33.6H147.272V37.76H135.496V51.84ZM151.812 56V33.6H156.1L169.316 49.728H167.236V33.6H172.356V56H168.1L154.852 39.872H156.932V56H151.812ZM177.656 56V33.6H182.84V51.776H194.072V56H177.656ZM196.969 56V33.6H202.153V56H196.969ZM218.285 56.384C216.514 56.384 214.882 56.1067 213.389 55.552C211.917 54.976 210.626 54.1653 209.516 53.12C208.429 52.0747 207.575 50.848 206.957 49.44C206.359 48.032 206.061 46.4853 206.061 44.8C206.061 43.1147 206.359 41.568 206.957 40.16C207.575 38.752 208.439 37.5253 209.549 36.48C210.658 35.4347 211.959 34.6347 213.453 34.08C214.946 33.504 216.589 33.216 218.381 33.216C220.365 33.216 222.146 33.5467 223.725 34.208C225.325 34.8693 226.669 35.8293 227.757 37.088L224.429 40.16C223.618 39.3067 222.733 38.6773 221.773 38.272C220.813 37.8453 219.767 37.632 218.637 37.632C217.549 37.632 216.557 37.8027 215.661 38.144C214.765 38.4853 213.986 38.976 213.325 39.616C212.685 40.256 212.183 41.0133 211.821 41.888C211.479 42.7627 211.309 43.7333 211.309 44.8C211.309 45.8453 211.479 46.8053 211.821 47.68C212.183 48.5547 212.685 49.3227 213.325 49.984C213.986 50.624 214.754 51.1147 215.629 51.456C216.525 51.7973 217.506 51.968 218.573 51.968C219.597 51.968 220.589 51.808 221.549 51.488C222.53 51.1467 223.479 50.5813 224.397 49.792L227.341 53.536C226.125 54.4533 224.706 55.1573 223.085 55.648C221.485 56.1387 219.885 56.384 218.285 56.384ZM222.605 52.864V44.448H227.341V53.536L222.605 52.864ZM247.516 33.6H252.7V56H247.516V33.6ZM237.34 56H232.156V33.6H237.34V56ZM247.9 46.816H236.956V42.432H247.9V46.816ZM262.64 56V37.824H255.472V33.6H274.992V37.824H267.824V56H262.64ZM284.985 56.384C283.193 56.384 281.475 56.1493 279.833 55.68C278.19 55.1893 276.867 54.56 275.865 53.792L277.625 49.888C278.585 50.5707 279.715 51.136 281.017 51.584C282.339 52.0107 283.673 52.224 285.017 52.224C286.041 52.224 286.862 52.128 287.481 51.936C288.121 51.7227 288.59 51.4347 288.889 51.072C289.187 50.7093 289.337 50.2933 289.337 49.824C289.337 49.2267 289.102 48.7573 288.633 48.416C288.163 48.0533 287.545 47.7653 286.777 47.552C286.009 47.3173 285.155 47.104 284.217 46.912C283.299 46.6987 282.371 46.4427 281.433 46.144C280.515 45.8453 279.673 45.4613 278.905 44.992C278.137 44.5227 277.507 43.904 277.017 43.136C276.547 42.368 276.313 41.3867 276.313 40.192C276.313 38.912 276.654 37.7493 277.337 36.704C278.041 35.6373 279.086 34.7947 280.473 34.176C281.881 33.536 283.641 33.216 285.753 33.216C287.161 33.216 288.547 33.3867 289.913 33.728C291.278 34.048 292.483 34.5387 293.529 35.2L291.929 39.136C290.883 38.5387 289.838 38.1013 288.793 37.824C287.747 37.5253 286.723 37.376 285.721 37.376C284.718 37.376 283.897 37.4933 283.257 37.728C282.617 37.9627 282.158 38.272 281.881 38.656C281.603 39.0187 281.465 39.4453 281.465 39.936C281.465 40.512 281.699 40.9813 282.169 41.344C282.638 41.6853 283.257 41.9627 284.025 42.176C284.793 42.3893 285.635 42.6027 286.553 42.816C287.491 43.0293 288.419 43.2747 289.337 43.552C290.275 43.8293 291.129 44.2027 291.897 44.672C292.665 45.1413 293.283 45.76 293.753 46.528C294.243 47.296 294.489 48.2667 294.489 49.44C294.489 50.6987 294.137 51.8507 293.433 52.896C292.729 53.9413 291.673 54.784 290.265 55.424C288.878 56.064 287.118 56.384 284.985 56.384Z" fill="#00450D" />
                  <g filter="url(#filter0_n_2019_130)">
                    <rect x="12.0908" y="18.0865" width="13.3179" height="40.4659" rx="6.65895" transform="rotate(17.3853 12.0908 18.0865)" fill="url(#paint0_linear_2019_130)" />
                  </g>
                  <g filter="url(#filter1_n_2019_130)">
                    <ellipse cx="22.0425" cy="8.58882" rx="6.65895" ry="6.91506" transform="rotate(17.3853 22.0425 8.58882)" fill="url(#paint1_linear_2019_130)" />
                  </g>
                  <g filter="url(#filter2_n_2019_130)">
                    <rect x="27.6396" y="26.7122" width="13.3179" height="40.4659" rx="6.65895" transform="rotate(17.3853 27.6396 26.7122)" fill="url(#paint2_linear_2019_130)" />
                  </g>
                  <g filter="url(#filter3_n_2019_130)">
                    <ellipse cx="37.438" cy="17.7032" rx="6.65895" ry="6.91506" transform="rotate(17.3853 37.438 17.7032)" fill="url(#paint3_linear_2019_130)" />
                  </g>
                  <defs>
                    <filter id="filter0_n_2019_130" x="1.68359" y="19.7703" width="21.4331" height="39.2292" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                      </feComponentTransfer>
                      <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                      <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect1_noise_2019_130">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                    <filter id="filter1_n_2019_130" x="15.3584" y="1.69446" width="13.3682" height="13.7888" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                      </feComponentTransfer>
                      <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                      <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect1_noise_2019_130">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                    <filter id="filter2_n_2019_130" x="17.2324" y="28.3959" width="21.4331" height="39.2292" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                      </feComponentTransfer>
                      <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                      <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect1_noise_2019_130">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                    <filter id="filter3_n_2019_130" x="30.7539" y="10.8088" width="13.3682" height="13.7888" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="7313" />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                      </feComponentTransfer>
                      <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                      <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect1_noise_2019_130">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                    <linearGradient id="paint0_linear_2019_130" x1="18.7498" y1="18.0865" x2="18.7498" y2="58.5524" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B8558" />
                      <stop offset="1" stopColor="#007416" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_2019_130" x1="22.0425" y1="1.67376" x2="22.0425" y2="15.5039" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B8558" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_2019_130" x1="34.2986" y1="26.7122" x2="34.2986" y2="67.1781" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#007416" />
                      <stop offset="1" stopColor="#00450D" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_2019_130" x1="37.438" y1="10.7881" x2="37.438" y2="24.6183" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#007416" />
                    </linearGradient>
                  </defs>
                </svg>

              )}
            </div>
            {/* <div className="tagline-wrapper">
              <p className="tagline">Slimme instroom, blijvend resultaat</p>
            </div> */}
          </div>
        </div>
      </header>
    </>
  );
};
