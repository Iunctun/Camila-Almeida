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
     Depoimentos — carrossel mobile (reconstruível)
  ----------------------------------------------------- */
  var track = document.getElementById("testi-track");
  var dotsWrap = document.getElementById("testi-dots");
  var testiSlideObserver = null;

  function setupTestimonialCarousel() {
    if (!track || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll(".testi-slide"));

    dotsWrap.innerHTML = "";
    var dots = slides.map(function (slide, i) {
      var dot = document.createElement("button");
      dot.className = "testi-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Depoimento " + (i + 1));
      dot.addEventListener("click", function () {
        slide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function setActiveDot(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }

    if (testiSlideObserver) testiSlideObserver.disconnect();

    if ("IntersectionObserver" in window) {
      testiSlideObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var idx = slides.indexOf(entry.target);
              setActiveDot(idx);
            }
          });
        },
        { root: track, threshold: 0.6 }
      );
      slides.forEach(function (slide) {
        testiSlideObserver.observe(slide);
      });
    }
  }

  setupTestimonialCarousel();

  /* -----------------------------------------------------
     Formulário de feedback — envia direto para os depoimentos

     Este site é 100% estático (sem servidor/banco de dados),
     então o depoimento enviado é inserido imediatamente na
     lista acima e salvo no localStorage do navegador de quem
     enviou, para continuar aparecendo em futuras visitas dele.
     Ele NÃO é enviado automaticamente para outros visitantes
     nem para a Camila — para isso, é necessário conectar o
     formulário a um serviço externo (e-mail, planilha, etc.).
  ----------------------------------------------------- */
  var FEEDBACK_STORAGE_KEY = "ca_depoimentos_v1";

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function starsMarkup(rating) {
    var html = "";
    for (var i = 1; i <= 5; i++) {
      var filled = i <= rating;
      html +=
        '<span class="material-symbols-outlined' +
        (filled ? "" : " text-hairline") +
        '" style="font-variation-settings:\'FILL\' ' +
        (filled ? 1 : 0) +
        '">star</span>';
    }
    return html;
  }

  function buildTestimonialCard(entry, markAsNew) {
    var article = document.createElement("article");
    article.className =
      "testi-slide reveal is-visible shrink-0 w-[85%] sm:w-[70%] md:w-auto bg-offwhite border border-hairline rounded p-6 md:p-8 card-lift flex flex-col" +
      (markAsNew ? " testi-new" : "");
    article.innerHTML =
      '<div class="flex gap-1 text-gold mb-4">' + starsMarkup(entry.rating) + "</div>" +
      '<p class="font-sans text-navy/75 italic leading-relaxed flex-grow mb-6">"' + escapeHtml(entry.message) + '"</p>' +
      '<div class="pt-4 border-t border-hairline">' +
      '<p class="font-serif text-burgundy text-lg">' + escapeHtml(entry.name) + "</p>" +
      '<p class="font-sans text-xs text-navy/55 uppercase tracking-wide mt-1">Cliente — ' + escapeHtml(entry.tag || "Assessoria de Visto") + "</p>" +
      "</div>";
    return article;
  }

  function loadStoredTestimonials() {
    try {
      var raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStoredTestimonials(list) {
    try {
      window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(list.slice(0, 30)));
    } catch (e) {
      /* localStorage indisponível (modo privado, etc.) — segue sem persistir */
    }
  }

  // Renderiza depoimentos salvos anteriormente por este visitante, mais recentes primeiro
  if (track) {
    var stored = loadStoredTestimonials();
    stored
      .slice()
      .reverse()
      .forEach(function (entry) {
        track.insertBefore(buildTestimonialCard(entry, false), track.firstChild);
      });
    if (stored.length) setupTestimonialCarousel();
  }

  var feedbackForm = document.getElementById("feedback-form");
  if (feedbackForm && track) {
    var fbSuccess = document.getElementById("fb-success");
    var fbError = document.getElementById("fb-error");

    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = feedbackForm.elements["name"].value.trim();
      var tag = feedbackForm.elements["tag"].value;
      var message = feedbackForm.elements["message"].value.trim();
      var ratingInput = feedbackForm.querySelector('input[name="rating"]:checked');
      var rating = ratingInput ? parseInt(ratingInput.value, 10) : 0;

      if (!name || !message || !rating) {
        fbError.classList.remove("hidden");
        fbSuccess.classList.add("hidden");
        return;
      }
      fbError.classList.add("hidden");

      var entry = { name: name, tag: tag, message: message, rating: rating };

      var card = buildTestimonialCard(entry, true);
      track.insertBefore(card, track.firstChild);
      track.scrollTo({ left: 0, behavior: "smooth" });
      setupTestimonialCarousel();

      var stored = loadStoredTestimonials();
      stored.unshift(entry);
      saveStoredTestimonials(stored);

      feedbackForm.reset();
      fbSuccess.classList.remove("hidden");
      card.scrollIntoView({ behavior: "smooth", block: "center" });

      window.setTimeout(function () {
        fbSuccess.classList.add("hidden");
      }, 6000);
    });
  }

  /* -----------------------------------------------------
     Ano no rodapé
  ----------------------------------------------------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
