window.heroSwiper = new Swiper(".heroSwiper", {
  loop: true,
  speed: 1200,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});

if (document.querySelector(".mySwiper-mobile")) {
  window.swiperMobile = new Swiper(".mySwiper-mobile", {
    loop: true,
    slidesPerView: 1,
    autoplay: { delay: 3000, disableOnInteraction: false },
    speed: 1500,
    effect: "slide",
  });
}
window.swiperSpecialOffers = new Swiper(".specialOffersSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  loop: true,
  speed: 800,
  grabCursor: true,
  watchOverflow: true,
  effect: "slide",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  navigation: {
    nextEl: ".special-offers-next",
    prevEl: ".special-offers-prev",
  },

  pagination: {
    el: ".special-offers-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  
  on: {
    slideChangeTransitionEnd: function () {
      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    },
  },
});