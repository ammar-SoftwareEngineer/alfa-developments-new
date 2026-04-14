// ===== Lenis Smooth Scroll =====
window.lenis = new Lenis({
  duration: 1,
  easing: (t) => t,
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 1.2,
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== GSAP & ScrollTrigger =====
gsap.registerPlugin(ScrollTrigger);

// ===== Animation Config =====
const CONFIG = {
  sectionStart: "top 88%",
  reveal: { y: 34, duration: 0.9, stagger: 0.08, ease: "power2.out" },
  image: { scale: 1.14, duration: 1.5, ease: "power3.out" },
  hero: {
    imageScale: 1.15,
    imageDuration: 1.9,
    textY: 34,
    textDuration: 1,
    textStagger: 0.12,
  },
};

function makeTimeline(trigger, start = CONFIG.sectionStart) {
  if (!trigger) return null;
  return gsap.timeline({
    defaults: { ease: CONFIG.reveal.ease },
    scrollTrigger: {
      trigger,
      start,
      // Play on scroll down, reverse on scroll up.
      toggleActions: "play reverse play reverse",
    },
  });
}

function once(elements) {
  return Array.from(elements || [])
    .filter(Boolean)
    .filter((el) => {
      if (el.dataset.animDone === "true") return false;
      el.dataset.animDone = "true";
      return true;
    });
}

function fadeUp(tl, elements, vars = {}, position) {
  const targets = once(elements);
  if (!tl || !targets.length) return;
  tl.fromTo(
    targets,
    { autoAlpha: 0, y: vars.y ?? CONFIG.reveal.y, scale: vars.scale ?? 1 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: vars.duration ?? CONFIG.reveal.duration,
      stagger: vars.stagger ?? CONFIG.reveal.stagger,
      ease: vars.ease ?? CONFIG.reveal.ease,
    },
    position,
  );
}

function imageReveal(tl, elements, vars = {}, position) {
  const targets = once(elements);
  if (!tl || !targets.length) return;
  tl.fromTo(
    targets,
    {
      autoAlpha: 0.3,
      y: vars.y ?? 18,
      scale: vars.scale ?? CONFIG.image.scale,
    },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: vars.duration ?? CONFIG.image.duration,
      stagger: vars.stagger ?? 0.08,
      ease: vars.ease ?? CONFIG.image.ease,
    },
    position,
  );
}

// ===== Hero slider animation =====
function animateSlide(slide) {
  if (!slide) return;
  const image = slide.querySelector("img");
  const texts = slide.querySelectorAll(
    ".text-box h2, .text-box p, .text-box a, .text-box .btn",
  );

  gsap.killTweensOf([slide, image, ...texts]);

  if (image) {
    gsap.fromTo(
      image,
      { scale: CONFIG.hero.imageScale, autoAlpha: 0.45, y: 22 },
      {
        scale: 1,
        autoAlpha: 1,
        y: 0,
        duration: CONFIG.hero.imageDuration,
        ease: "power3.out",
      },
    );
  }

  if (texts.length) {
    gsap.fromTo(
      texts,
      { autoAlpha: 0, y: CONFIG.hero.textY },
      {
        autoAlpha: 1,
        y: 0,
        duration: CONFIG.hero.textDuration,
        stagger: CONFIG.hero.textStagger,
        ease: "power2.out",
      },
    );
  }
}

function initHeroSwiper() {
  const desktop = window.swiper;
  const mobile = window.swiperMobile;

  if (desktop) {
    animateSlide(desktop.slides[desktop.activeIndex]);
    desktop.on("slideChangeTransitionStart", function onDesktopSlide() {
      animateSlide(this.slides[this.activeIndex]);
    });
  }

  if (mobile) {
    animateSlide(mobile.slides[mobile.activeIndex]);
    mobile.on("slideChangeTransitionStart", function onMobileSlide() {
      animateSlide(this.slides[this.activeIndex]);
    });
  }
}

function initHeroParallax() {
  const heroImages = document.querySelectorAll(
    ".hero .swiper-slide img, .hero-mobile .swiper-slide img",
  );
  if (!heroImages.length) return;

  gsap.to(heroImages, {
    yPercent: 12,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero, .hero-mobile",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
}

// ===== Sections =====
function animateAbout() {
  const section = document.querySelector(".about-section");
  if (!section) return;

  const description = section.querySelectorAll(".lh-lg");
  const aboutCounters = section.querySelectorAll(".about-counter-card");
  const counterValues = section.querySelectorAll(
    ".about-counter-card .counter",
  );
  const cta = section.querySelectorAll(".btn-send");
  const tl = makeTimeline(section);
  fadeUp(tl, section.querySelectorAll(".header-section h2"), {
    y: 24,
    duration: 0.85,
    stagger: 0,
  });
  fadeUp(tl, description, { y: 24, duration: 0.9, stagger: 0 }, "-=0.45");
  imageReveal(
    tl,
    section.querySelectorAll(".img-one, .img-two"),
    { y: 16, duration: 0.5 },
    "-=0.55",
  );
  fadeUp(tl, cta, { y: 14, duration: 0.5, stagger: 0 }, "-=0.2");
  fadeUp(tl, aboutCounters, { y: 12, duration: 0.45, stagger: 0.04 }, "-=0.15");
  tl.call(
    () => {
      counterValues.forEach((counter) => {
        const target = Number(counter.dataset.target || 0);
        const suffix = counter.dataset.suffix || "";
        if (!target) return;

        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: () => {
              counter.textContent = `${Math.floor(counter.innerText)}${suffix}`;
            },
            onComplete: () => {
              counter.textContent = `${target}${suffix}`;
            },
          },
        );
      });
    },
    null,
    ">+=0.2",
  );
}

function animateProjects() {
  const section = document.querySelector(".projects-section");
  if (!section) return;

  const tl = makeTimeline(section);
  fadeUp(tl, section.querySelectorAll(".header-section h2"), {
    y: 24,
    duration: 0.85,
    stagger: 0,
  });
  fadeUp(
    tl,
    section.querySelectorAll(".header-section p"),
    { y: 22, duration: 0.85, stagger: 0 },
    "-=0.45",
  );
  fadeUp(
    tl,
    section.querySelectorAll(".btn-send"),
    { y: 14, duration: 0.65, stagger: 0 },
    "-=0.45",
  );
  fadeUp(
    tl,
    section.querySelectorAll(".project-card"),
    { y: 28, scale: 0.96, duration: 0.92, stagger: 0.1 },
    "-=0.35",
  );
  imageReveal(
    tl,
    section.querySelectorAll(".project-card img"),
    { y: 14, scale: 1.12, duration: 1.2, stagger: 0.08 },
    "<",
  );
}

function animatePastProjects() {
  const section = document.querySelector(".past-projects-section");
  if (!section) return;

  const tl = makeTimeline(section);
  fadeUp(tl, section.querySelectorAll(".header-section h2"), {
    y: 24,
    duration: 0.85,
    stagger: 0,
  });
  fadeUp(
    tl,
    section.querySelectorAll(".header-section p"),
    { y: 20, duration: 0.8, stagger: 0 },
    "-=0.45",
  );
  fadeUp(
    tl,
    section.querySelectorAll(".past-projects-tabs .nav-item"),
    { y: 16, duration: 0.75, stagger: 0.05 },
    "-=0.45",
  );
  fadeUp(
    tl,
    section.querySelectorAll(".tab-pane.show.active .past-project-card"),
    { y: 24, scale: 0.97, duration: 0.85, stagger: 0.08 },
    "-=0.4",
  );

  const tabButtons = section.querySelectorAll('[data-bs-toggle="tab"]');
  tabButtons.forEach((button) => {
    button.addEventListener("shown.bs.tab", (event) => {
      const targetSelector = event.target.getAttribute("data-bs-target");
      const pane = targetSelector ? document.querySelector(targetSelector) : null;
      if (!pane) return;

      const cards = pane.querySelectorAll(".past-project-card");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 20, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
        },
      );
    });
  });
}

function animateContact() {
  const section = document.querySelector(".contact-section");
  if (!section) return;

  const tl = makeTimeline(section);
  fadeUp(tl, section.querySelectorAll(".section-header h2, .form-header h3"), {
    y: 20,
    duration: 0.82,
    stagger: 0.06,
  });
  fadeUp(
    tl,
    section.querySelectorAll(".section-header p, .form-header p"),
    { y: 20, duration: 0.86, stagger: 0.05 },
    "-=0.45",
  );
  fadeUp(
    tl,
    section.querySelectorAll(".contact-form-wrapper, .contact-map-side"),
    { y: 24, duration: 0.9, stagger: 0.1 },
    "-=0.35",
  );
  fadeUp(
    tl,
    section.querySelectorAll(".form-group, .btn-send"),
    { y: 14, duration: 0.7, stagger: 0.04 },
    "-=0.55",
  );
}

function animateBlogs() {
  const section = document.querySelector(".blogs-section");
  if (!section) return;

  const tl = makeTimeline(section);
  fadeUp(tl, section.querySelectorAll(".header-section h2"), {
    y: 22,
    duration: 0.82,
    stagger: 0,
  });
  fadeUp(
    tl,
    section.querySelectorAll(".header-section p, .header-section .btn-send"),
    { y: 18, duration: 0.75, stagger: 0.06 },
    "-=0.45",
  );
  fadeUp(
    tl,
    section.querySelectorAll(".blog-card"),
    { y: 24, scale: 0.97, duration: 0.9, stagger: 0.1 },
    "-=0.35",
  );
  imageReveal(
    tl,
    section.querySelectorAll(".blog-card__thumb img"),
    { y: 14, scale: 1.1, duration: 1.1, stagger: 0.08 },
    "<",
  );
}

function animateGenericSections() {
  const sections = document.querySelectorAll(".animate-section");
  sections.forEach((section) => {
    if (
      section.classList.contains("about-section") ||
      section.classList.contains("counter-section") ||
      section.classList.contains("past-projects-section") ||
      section.classList.contains("projects-section") ||
      section.classList.contains("blogs-section") ||
      section.classList.contains("contact-section")
    ) {
      return;
    }

    const tl = makeTimeline(section);
    fadeUp(
      tl,
      section.querySelectorAll(
        ".header-section, h2, h3, h4, p, li, .service-card, .project-card, .btn-send, form",
      ),
      { y: 22, duration: 0.82, stagger: 0.06 },
    );
  });
}

// ===== Init =====
function initAnimations() {
  initHeroSwiper();
  initHeroParallax();
  animateAbout();
  animatePastProjects();
  animateProjects();
  animateBlogs();
  animateContact();
  animateGenericSections();
  ScrollTrigger.refresh();
}

initAnimations();
