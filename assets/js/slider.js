
// Main Swiper
window.swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 1,
  autoplay: { delay: 4000 },
  speed: 1000,
  effect: "fade",
});

// Mobile Swiper
window.swiperMobile = new Swiper(".mySwiper-mobile", {
  loop: true,
  slidesPerView: 1,
  autoplay: { delay: 4000 },
  speed: 1000,
  effect: "fade",
});

// Clients Swiper
window.clientsSwiper = new Swiper(".clientsSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: { slidesPerView: 1 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 5 },
  },
});
