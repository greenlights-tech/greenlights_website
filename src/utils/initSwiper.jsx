// --------- Swiper ----------
import Swiper from "swiper/bundle";
import { Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

let swiper = null;

export function initSwiper() {
  // voorkomt dubbele init
  if (swiper) return swiper;

  swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    // grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 100,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
      },
    },
  });
  return swiper;
}
