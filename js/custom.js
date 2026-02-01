(function ($) {
  let $navbar = $(".navbar");
  let navbar_offset = $navbar.innerHeight();

  function fixScrollspy() {
    let $body = $("body");
    let data = $body.data("bs.scrollspy");
    if (data) {
      data._config.offset = navbar_offset;
      $body.data("bs.scrollspy", data);
      $body.scrollspy("refresh");
    }
  }

  function scrollToAnchor(target) {
    target =
      typeof target === "undefined" || typeof target === "object"
        ? window.location.hash
        : target;

    target = target.replace(/:/g, "\\:");
    if ($(target).length) {
      $("html, body").animate(
        { scrollTop: $(target).offset().top - navbar_offset },
        600
      );
    }
  }

  // Smooth scroll: nav links + brand
  $(document).on(
    "click",
    "#navbar-main a.nav-link, #navbar-main a.navbar-brand",
    function (event) {
      let hash = this.hash;
      if (hash && $(hash).length) {
        event.preventDefault();
        $("html, body").animate(
          { scrollTop: $(hash).offset().top - navbar_offset },
          800
        );
      }
    }
  );

  // Back to top
  $("#back_to_top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800, function () {
      window.location.hash = "";
    });
  });

  // Collapse mobile nav after clicking a link
  $(document).on("click", ".navbar-collapse.show", function (e) {
    let $t = $(e.target).is("a") ? $(e.target) : $(e.target).parent();
    if ($t.is("a") && $t.attr("class") != "dropdown-toggle") {
      $(this).collapse("hide");
    }
  });

  // Handle manual hash change (e.g., back button)
  window.addEventListener("hashchange", scrollToAnchor);

  // Init
  $(window).on("load", function () {
    $("body").scrollspy({ offset: navbar_offset });

    let resizeTimer;
    $(window).resize(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        navbar_offset = $navbar.innerHeight();
        fixScrollspy();
      }, 200);
    });

    if (window.location.hash) {
      scrollToAnchor();
    }
  });
})(jQuery);
