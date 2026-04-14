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
    const $backTopLink = $("#back-top");
    const $nav = $(".header");
    const navHeight = $nav.outerHeight();
    const $hero = $("#hero-pages");
    const $navLinks = $(".navbar-nav .nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    /*=============================
        Back To Top Button
    =============================*/
    $(window).on("scroll", function () {
      var scrollTop = $(window).scrollTop();
      var scrollHeight = $(document).height() - $(window).height();
      var scrollPercent = (scrollTop / scrollHeight) * 30; // Adjust progress scale if needed

      // Show/hide back-to-top button
      if (scrollTop > 100) $backTop.css("display", "flex");
      else $backTop.css("display", "none");

      // Update vertical progress bar height
      $progressBar.css("height", scrollPercent + "%");

      // Add fixed class to nav when scrolling past its height
      $nav.toggleClass("fixed", scrollTop > navHeight);
    });

    // Smooth scroll to top on click
    $backTop.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
    });


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
