(function () {
  "use strict";

  /* -----------------------------------------------------
     Header: transparente -> creme ao rolar
  ----------------------------------------------------- */
  var header = document.getElementById("site-header");
  function onScrollHeader() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* -----------------------------------------------------
     Menu mobile
  ----------------------------------------------------- */
  var menuBtn = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  var menuIconOpen = document.getElementById("icon-menu");
  var menuIconClose = document.getElementById("icon-close");

  function closeMobileMenu() {
    mobileNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuIconOpen.classList.remove("hidden");
    menuIconClose.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  function toggleMobileMenu() {
    var isOpen = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuIconOpen.classList.toggle("hidden", isOpen);
    menuIconClose.classList.toggle("hidden", !isOpen);
    document.body.classList.toggle("overflow-hidden", isOpen);
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", toggleMobileMenu);
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  /* -----------------------------------------------------
     Scroll reveal
  ----------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    var timelineNumbers = document.querySelectorAll(".timeline-number");
    var numberObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.4 }
    );
    timelineNumbers.forEach(function (el) {
      numberObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* -----------------------------------------------------
     Navegação ativa (scrollspy)
  ----------------------------------------------------- */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = Array.prototype.slice
    .call(navLinks)
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.indexOf("#") === 0 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = "#" + entry.target.id;
          var link = document.querySelector('.nav-link[href="' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.remove("active");
            });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* -----------------------------------------------------
     FAQ — acordeão
  ----------------------------------------------------- */
  var accordionTriggers = document.querySelectorAll(".accordion-trigger");
  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      accordionTriggers.forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
        var p = document.getElementById(btn.getAttribute("aria-controls"));
        if (p) p.classList.remove("open");
      });

      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        panel.classList.add("open");
      }
    });
  });

  /* -----------------------------------------------------
     Depoimentos — carrossel mobile
  ----------------------------------------------------- */
  var track = document.getElementById("testi-track");
  var dotsWrap = document.getElementById("testi-dots");
  if (track && dotsWrap) {
    var slides = track.querySelectorAll(".testi-slide");
    var dots = dotsWrap.querySelectorAll(".testi-dot");

    function setActiveDot(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        slides[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });

    if ("IntersectionObserver" in window) {
      var slideObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var idx = Array.prototype.indexOf.call(slides, entry.target);
              setActiveDot(idx);
            }
          });
        },
        { root: track, threshold: 0.6 }
      );
      slides.forEach(function (slide) {
        slideObserver.observe(slide);
      });
    }
  }

  /* -----------------------------------------------------
     Ano no rodapé
  ----------------------------------------------------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
