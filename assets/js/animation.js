// ===== Lenis Smooth Scroll =====
window.lenis = new Lenis({
  duration: 0.5,
  easing: (t) => t,
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 1.2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== GSAP & ScrollTrigger =====
gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Swiper Animation
window.swiperInstance = window.swiper;
window.swiperInstanceMobile = window.swiperMobile;

function animateSlide(slide) {
  slide
    ?.querySelectorAll(".text-box h2, .text-box p")
    .forEach((text, index) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.08,
        },
      );
    });

  slide?.querySelectorAll("img").forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
    );
  });
}

// Desktop slider
if (swiperInstance) {
  animateSlide(swiperInstance.slides[swiperInstance.activeIndex]);
  swiperInstance.on("slideChangeTransitionStart", () => {
    animateSlide(swiperInstance.slides[swiperInstance.activeIndex]);
  });
}

// Mobile slider
if (swiperInstanceMobile) {
  animateSlide(swiperInstanceMobile.slides[swiperInstanceMobile.activeIndex]);
  swiperInstanceMobile.on("slideChangeTransitionStart", () => {
    animateSlide(swiperInstanceMobile.slides[swiperInstanceMobile.activeIndex]);
  });
}
// ===== Animate generic sections =====
function animateAllSections() {
  const sections = document.querySelectorAll(".animate-section");

  sections.forEach((section) => {
    const items = section.querySelectorAll(
      ".header-section,li,p,h2,h3,h4,.btn-send,.project-card ,.project-card img h5 .btn-send,.mission p li ,.vision p li,.bg-counter,.service-card .btn-send .service-icon,form,.contact-map,.contact-info-card,.contact-social",
    );

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.01,
          scrollTrigger: {
            trigger: item,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    // === IMAGE ANIMATIONS ===
    const imgOne = section.querySelector(".img-one");
    const imgTwo = section.querySelector(".img-two");

    if (imgOne) {
      gsap.from(imgOne, {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgOne,
          start: "top 80%",
          toggleActions: "play none none none",
          scroller: "body",
        },
      });
    }

    if (imgTwo) {
      gsap.from(imgTwo, {
        x: -120,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgTwo,
          start: "top 80%",
          toggleActions: "play none none none",
          scroller: "body",
        },
      });
    }

    // ========= COUNTER =============
    const counters = document.querySelectorAll(".counter");
    const counterGrid = document.querySelector(".counter-grid");
    let started = false;

    if (counterGrid) {
      ScrollTrigger.create({
        trigger: counterGrid,
        start: "top 100%",
        once: true,
        scroller: "body",
        onEnter: () => {
          if (!started) {
            counters.forEach((counter) => {
              let target = +counter.dataset.target;
              let count = 0;
              let speed = target / 100;

              let updateCounter = setInterval(() => {
                count += speed;
                if (count >= target) {
                  counter.innerText = target;
                  clearInterval(updateCounter);
                } else {
                  counter.innerText = Math.floor(count);
                }
              }, 20);
            });
            started = true;
          }
        },
      });
    }
  });
}

animateAllSections();

ScrollTrigger.refresh();
