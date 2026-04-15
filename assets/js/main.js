(function ($) {
  "use strict";

  /*=============================
      Loader
  =============================*/
  const loader = () => {
    $(window).on("load", () => {
      $(".loading").addClass("loaded").delay(600).fadeOut();
    });
  };
  loader();

  $(function () {
    /*=============================
        Cached Selectors
    =============================*/
    const $window = $(window);
    const $document = $(document);
    const $backTopDiv = $(".back-to-top");
    const $progressBar = $backTopDiv.find(".progress-bar");
    const $nav = $(".header");
    let navHeight = $nav.outerHeight() || 0;
    const hasInitialFixedTop = $nav.hasClass("fixed-top");
    let isNavFixed = false;
    const $hero = $("#hero-pages");
    const $navLinks = $(".navbar-nav .nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    /*=============================
        Back To Top Button
    =============================*/
    const refreshAndUpdate = () => {
      navHeight = $nav.outerHeight() || navHeight || 0;
      document.documentElement.style.setProperty("--header-height", `${navHeight}px`);
    
      const scrollTop = $window.scrollTop();
      const shouldFix = scrollTop > Math.max(60, navHeight);
    
      if (!hasInitialFixedTop && shouldFix === isNavFixed) return;
      isNavFixed = shouldFix;
    
      $nav.toggleClass("fixed", shouldFix);
      if (!hasInitialFixedTop) $("body").toggleClass("header-is-fixed", shouldFix);
    };
    
    $window.on("scroll", function () {
      const scrollTop = $window.scrollTop();
      const scrollPercent = ($document.height() - $window.height()) > 0
        ? (scrollTop / ($document.height() - $window.height())) * 30 : 0;
    
      $backTopDiv.css("display", scrollTop > 100 ? "flex" : "none");
      $progressBar.css("height", `${Math.min(Math.max(scrollPercent, 0), 100)}%`);
    
      refreshAndUpdate();
    });
    
    [0, 120, 350, 800].forEach(d => setTimeout(refreshAndUpdate, d));
    $window.on("resize", refreshAndUpdate);
    // Smooth scroll to top on click
    $backTopDiv.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
    });

    // Run once on page load
    refreshHeaderMetrics();
    $window.trigger("scroll");


    /*=============================
        Active Navigation Link
    =============================*/
    $navLinks.each(function () {
      const linkPage = $(this).attr("href").replace("./", "");
      $(this).toggleClass("active", linkPage === currentPage);
    });

    /*=============================
        Hero Title + Breadcrumb
    =============================*/
    if ($hero.length) {
      const title = $hero.data("title");
      const breadcrumb = $hero.data("breadcrumb");

      if (title) $hero.find("h1").text(title);
      if (breadcrumb) $hero.find(".breadcrumb-item.active").text(breadcrumb);
    }
  });
})(jQuery);
