// --------- Swiper ----------
import Swiper from "swiper/bundle";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

let swiper = null;

export function initSwiper() {
  // voorkomt dubbele init
  if (swiper) return swiper;

  swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 24,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 100,
      },
    },
  });
  return swiper;
}
