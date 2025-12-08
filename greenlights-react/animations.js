import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import Swiper, { Pagination } from "swiper";

gsap.registerPlugin(SplitText, Flip);
Swiper.use([Pagination]);

export function initAnimations({ elements }) {
  document.fonts.ready.then(() => {
    const {
      bg,
      logo,
      originalContainer,
      newContainer,
      midTextSolli,
      midTextOpdr,
      swiperContainer,
      icon2,
      switchButton,
      tagline,
      solPage,
      opdPage,
      infoContainers = [],
      footerContainer,
      color1,
      color2,
      whatsappButton,
    } = elements;

    // ---------- Split Text (veilig, alleen als elementen bestaan) ----------
    const splitTagline = tagline
      ? SplitText.create(tagline, {
          type: "chars",
          charsclassName: "char",
          autoSplit: true,
        })
      : null;

    const splitMidTextSolli = midTextSolli
      ? SplitText.create(midTextSolli, {
          type: "chars, words",
          charsclassName: "char",
          wordsclassName: "word",
        })
      : null;

    const splitMidTextOpdr = midTextOpdr
      ? SplitText.create(midTextOpdr, {
          type: "chars, words",
          charsclassName: "char",
          wordsclassName: "word",
        })
      : null;

    // ---------- Init GSAP States ----------
    if (solPage) gsap.set(solPage, { xPercent: -100, opacity: 1 });
    if (opdPage) gsap.set(opdPage, { xPercent: 100, opacity: 1 });

    gsap.set([...infoContainers, footerContainer].filter(Boolean), {
      opacity: 0,
      visibility: "hidden",
    });
    if (logo) gsap.set(logo, { visibility: "visible" });
    gsap.set([color1, color2].filter(Boolean), {
      opacity: 0.1,
      "stop-color": "#00000057",
    });
    if (splitTagline) gsap.set(splitTagline.chars, { opacity: 0 });
    if (midTextSolli && splitMidTextSolli)
      gsap.set(splitMidTextSolli.chars, {
        opacity: 0,
        yPercent: 100,
        rotateX: -90,
        filter: "blur(10px)",
      });
    if (midTextOpdr && splitMidTextOpdr)
      gsap.set(splitMidTextOpdr.chars, {
        opacity: 0,
        yPercent: 100,
        rotateX: -90,
        filter: "blur(10px)",
      });
    if (swiperContainer)
      gsap.set(swiperContainer, { scale: 0, opacity: 0, visibility: "hidden" });
    if (whatsappButton)
      gsap.set(whatsappButton, {
        opacity: 0,
        scale: 0.5,
        visibility: "hidden",
      });

    // ---------- Init Swiper ----------
    let swiper;
    function initSwiper() {
      if (swiper || !swiperContainer) return swiper;
      swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 24,
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: { 992: { slidesPerView: 2, spaceBetween: 50 } },
      });
    }

    // ---------- Intro Animatie ----------
    function startIntroAnimation() {
      if (!icon2 || !switchButton) return;

      const tl = gsap.timeline();
      const zweefTL = gsap.timeline({ repeat: -1, yoyo: true });

      // Zweefanimatie
      zweefTL.to(icon2, {
        y: -20,
        rotation: 0.5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: gsap.utils.random(0, 1),
      });

      switchButton.one("change", () => {
        zweefTL.kill();

        if (icon2)
          tl.to(
            icon2,
            { scale: 0, duration: 0.5, ease: "none", zIndex: -1 },
            0
          );

        if (logo && originalContainer && newContainer) {
          const state = Flip.getState(logo);
          (logo.parentNode === originalContainer
            ? newContainer
            : originalContainer
          ).appendChild(logo);

          tl.fromTo(
            logo,
            { filter: "none" },
            {
              filter: "drop-shadow(0 0 3px #00dc82)",
              duration: 0.3,
              ease: "power2.inOut",
            },
            0.5
          );

          tl.add(
            Flip.from(state, {
              scale: true,
              duration: 1.2,
              nested: true,
              ease: "power2.inOut",
              zIndex: 1000,
            }),
            1
          );
        }

        // Kleuren animatie
        if (color1)
          tl.to(
            color1,
            {
              opacity: 1,
              "stop-color": "#20FF85",
              duration: 0.3,
              ease: "power1.out",
            },
            0.5
          );
        if (color2)
          tl.to(
            color2,
            {
              opacity: 1,
              "stop-color": "#00D661",
              duration: 0.3,
              ease: "power1.out",
            },
            0.5
          );

        // Tagline animatie
        if (bg) tl.to(bg, { opacity: 1, duration: 1, ease: "power2.inOut" }, 2);
        if (splitTagline)
          tl.to(
            splitTagline.chars,
            { opacity: 1, duration: 1, ease: "power2.out", stagger: 0.05 },
            2
          );
        if (tagline)
          tl.to(
            ".tagline-wrapper",
            { opacity: 1, duration: 1, ease: "none" },
            2
          );

        // Swiper animatie
        if (swiperContainer) {
          gsap.set(swiperContainer, {
            visibility: "visible",
            opacity: 0,
            scale: 0,
          });
          tl.to(
            swiperContainer,
            { opacity: 1, scale: 1, ease: "expo.out", duration: 2 },
            3
          );
        }

        // Switch button animatie
        tl.to(
          switchButton,
          { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.out" },
          0.7
        );
      });
    }

    return { initSwiper, startIntroAnimation };
  });
}
