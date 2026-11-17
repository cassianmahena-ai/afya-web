/*
  Photo interactions.

  1. Lightbox   Any element with [data-lb-src] opens the photo larger, with
                previous / next, a counter, arrow keys, Esc and swipe.
                Photos in the same grid form one set.
  2. Filters    .gallery-filter buttons show one category of #aboutGallery.
  3. Hero       .hero__media[data-slides] cross-fades its photos, with dots.

  Everything uses event delegation because main.js re-renders the lists when
  the language changes.
*/
(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const TEXT = {
    en: { close: "Close", prev: "Previous photo", next: "Next photo", of: "of", slide: "Show photo" },
    sw: { close: "Funga", prev: "Picha iliyotangulia", next: "Picha inayofuata", of: "kati ya", slide: "Onyesha picha" },
  };
  const text = () => TEXT[(root.lang || "en").slice(0, 2)] || TEXT.en;

  const icon = (name) =>
    `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

  /* ------------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------------ */
  let box, img, caption, count, items = [], index = 0, opener = null;

  function build() {
    box = document.createElement("dialog");
    box.className = "lightbox";
    box.innerHTML = `<div class="lightbox__stage">
        <div class="lightbox__bar">
          <span class="lightbox__count" aria-live="polite"></span>
          <button type="button" class="lightbox__btn" data-lb-close>${icon("close")}</button>
        </div>
        <figure class="lightbox__figure"><img class="lightbox__img" alt=""></figure>
        <p class="lightbox__caption"></p>
        <button type="button" class="lightbox__btn lightbox__nav lightbox__nav--prev" data-lb-prev>${icon("arrow-right")}</button>
        <button type="button" class="lightbox__btn lightbox__nav lightbox__nav--next" data-lb-next>${icon("arrow-right")}</button>
      </div>`;
    document.body.appendChild(box);
    img = box.querySelector(".lightbox__img");
    caption = box.querySelector(".lightbox__caption");
    count = box.querySelector(".lightbox__count");

    img.addEventListener("load", () => img.classList.remove("is-loading"));

    box.addEventListener("click", (event) => {
      if (event.target.closest("[data-lb-close]")) return close();
      if (event.target.closest("[data-lb-prev]")) return step(-1);
      if (event.target.closest("[data-lb-next]")) return step(1);
      // A click on the dark area around the photo closes the viewer.
      if (!event.target.closest(".lightbox__img, .lightbox__caption, .lightbox__bar")) close();
    });

    box.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    });

    box.addEventListener("close", () => {
      document.body.style.overflow = "";
      const wheel = window.motionKit && window.motionKit.wheel;
      if (wheel && wheel.start) wheel.start();
      if (opener && document.contains(opener)) opener.focus();
    });

    // Swipe left / right on touch screens.
    let startX = 0, startY = 0;
    box.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    box.addEventListener("touchend", (event) => {
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function show() {
    const item = items[index];
    const copy = text();
    img.classList.add("is-loading");
    img.src = item.src;
    img.alt = item.caption;
    if (img.complete) img.classList.remove("is-loading");
    caption.textContent = item.caption;
    count.textContent = `${index + 1} ${copy.of} ${items.length}`;
    box.querySelector("[data-lb-close]").setAttribute("aria-label", copy.close);
    box.querySelector("[data-lb-prev]").setAttribute("aria-label", copy.prev);
    box.querySelector("[data-lb-next]").setAttribute("aria-label", copy.next);
    box.toggleAttribute("data-single", items.length < 2);
    // Warm the next photo so swiping feels instant.
    if (items.length > 1) new Image().src = items[(index + 1) % items.length].src;
  }

  function step(delta) {
    if (items.length < 2) return;
    index = (index + delta + items.length) % items.length;
    show();
  }

  function open(trigger) {
    if (!box) build();
    const scope = trigger.closest(".svc-slides, .gallery-grid, .grid, .arrive__grid") || trigger.parentElement;
    const triggers = Array.from(scope.querySelectorAll("[data-lb-src]")).filter(
      (el) => !el.closest("[hidden]")
    );
    items = triggers.map((el) => {
      // Prefer the visible caption, which is already in the active language.
      const figure = el.closest("figure");
      const visible = figure && figure.querySelector("figcaption");
      return {
        src: el.dataset.lbSrc,
        caption: (visible && visible.textContent.trim()) || el.dataset.lbCaption || "",
      };
    });
    index = Math.max(0, triggers.indexOf(trigger));
    opener = trigger;
    show();
    document.body.style.overflow = "hidden";
    const wheel = window.motionKit && window.motionKit.wheel;
    if (wheel && wheel.stop) wheel.stop();
    if (typeof box.showModal === "function") box.showModal();
    else box.setAttribute("open", "");
  }

  function close() {
    if (typeof box.close === "function") box.close();
    else {
      box.removeAttribute("open");
      document.body.style.overflow = "";
    }
  }

  /* ------------------------------------------------------------------------
     Service card slideshows
     Each service card holds every photo for that area. The photos change by
     themselves while the card is on screen; arrows and swipe also work; tapping a photo opens
     the full-screen viewer with only that area's photos.
     ------------------------------------------------------------------------ */
  function svcLoad(item) {
    const picture = item && item.querySelector("img[data-src]");
    if (picture) {
      picture.src = picture.dataset.src;
      picture.removeAttribute("data-src");
    }
  }

  const svcReady = (item) => {
    const picture = item && item.querySelector("img");
    return !!picture && !picture.dataset.src && picture.complete && picture.naturalWidth > 0;
  };

  // `auto` moves are skipped until the next photo has finished loading, so a
  // slide never fades in half-drawn.
  function svcGo(slides, next, auto) {
    const list = Array.from(slides.querySelectorAll(".svc-slides__item"));
    if (list.length < 2) return;
    const i = (next + list.length) % list.length;
    svcLoad(list[i]);
    if (auto && !svcReady(list[i])) return;
    const previous = slides.querySelector(".svc-slides__item.is-active");
    list.forEach((item, k) => {
      item.classList.remove("is-leaving");
      item.classList.toggle("is-active", k === i);
      item.tabIndex = k === i ? 0 : -1;
    });
    // The outgoing photo stays fully visible underneath while the new one
    // dissolves in on top, so there is no dip or flash between them.
    if (previous && previous !== list[i]) {
      previous.classList.add("is-leaving");
      clearTimeout(previous._leave);
      previous._leave = setTimeout(() => previous.classList.remove("is-leaving"), 1500);
    }
    svcLoad(list[(i + 1) % list.length]);
    slides.dataset.index = String(i);
    slides.querySelectorAll(".svc-slides__dots i").forEach((dot, k) => dot.classList.toggle("is-active", k === i));
  }

  const svcIndex = (slides) => Number(slides.dataset.index) || 0;

  // Hold a card still for a few seconds after someone uses it by hand.
  const svcHold = (slides) => {
    slides._holdUntil = Date.now() + 7000;
  };

  /* Automatic play: every card that is on screen moves to its next photo by
     itself, about every 4.8 seconds. Cards are staggered so they do not all
     change at the same moment. Nothing plays for visitors who have asked
     their device to reduce motion; the arrows and swipe still work. */
  if (!reduceMotion) {
    let tick = 0;
    setInterval(() => {
      tick += 1;
      if (document.hidden || (box && box.open)) return;
      document.querySelectorAll(".svc-slides").forEach((slides, order) => {
        const rect = slides.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight || rect.width === 0) return;
        // Fetch the upcoming photo ahead of time.
        const list = slides.querySelectorAll(".svc-slides__item");
        svcLoad(list[(svcIndex(slides) + 1) % list.length]);
        if (order % 4 !== tick % 4) return;
        if (slides._holdUntil && Date.now() < slides._holdUntil) return;
        svcGo(slides, svcIndex(slides) + 1, true);
      });
    }, 1200);
  }

  let svcTouch = null;
  let svcSwipedAt = 0;
  document.addEventListener("touchstart", (event) => {
    const slides = event.target.closest && event.target.closest(".svc-slides");
    if (!slides) return;
    svcTouch = { slides, x: event.touches[0].clientX, y: event.touches[0].clientY };
    svcLoad(slides.querySelectorAll(".svc-slides__item")[(svcIndex(slides) + 1) % slides.querySelectorAll(".svc-slides__item").length]);
  }, { passive: true });
  document.addEventListener("touchend", (event) => {
    if (!svcTouch) return;
    const dx = event.changedTouches[0].clientX - svcTouch.x;
    const dy = event.changedTouches[0].clientY - svcTouch.y;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      svcGo(svcTouch.slides, svcIndex(svcTouch.slides) + (dx < 0 ? 1 : -1));
      svcHold(svcTouch.slides);
      svcSwipedAt = Date.now();
    }
    svcTouch = null;
  }, { passive: true });

  document.addEventListener("click", (event) => {
    const stepper = event.target.closest("[data-svc-step]");
    if (stepper) {
      const slides = stepper.closest(".svc-slides");
      svcGo(slides, svcIndex(slides) + Number(stepper.dataset.svcStep));
      svcHold(slides);
      return;
    }

    const trigger = event.target.closest("[data-lb-src]");
    if (trigger) {
      if (Date.now() - svcSwipedAt < 450) return;
      event.preventDefault();
      open(trigger);
      return;
    }

    /* ----------------------------------------------------------------------
       Gallery filters
       ---------------------------------------------------------------------- */
    const filter = event.target.closest(".gallery-filter");
    if (filter) {
      const wanted = filter.dataset.filter;
      const group = filter.parentElement;
      group.querySelectorAll(".gallery-filter").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === filter));
      });
      const grid = document.getElementById("aboutGallery");
      if (!grid) return;
      grid.querySelectorAll(".gallery-card").forEach((card) => {
        const match = wanted === "all" || card.dataset.cat === wanted;
        card.hidden = !match;
        card.classList.add("is-in");
        card.classList.remove("is-filtering");
        if (match && !reduceMotion) {
          void card.offsetWidth;
          card.classList.add("is-filtering");
        }
      });
    }
  });

  /* ------------------------------------------------------------------------
     Hero slideshow
     ------------------------------------------------------------------------ */
  function setupHero() {
    const media = document.querySelector(".hero__media[data-slides]");
    if (!media) return;
    const slides = Array.from(media.querySelectorAll(".hero__photo"));
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;

    const dots = document.createElement("div");
    dots.className = "hero-dots";
    dots.innerHTML = slides.map((_, i) => `<button type="button" data-slide="${i}"></button>`).join("");
    media.appendChild(dots);

    function label() {
      const copy = text();
      dots.querySelectorAll("button").forEach((button, i) => {
        button.setAttribute("aria-label", `${copy.slide} ${i + 1}`);
        button.setAttribute("aria-current", String(i === current));
      });
    }

    function load(slide) {
      if (slide.dataset.src) {
        slide.src = slide.dataset.src;
        slide.removeAttribute("data-src");
      }
    }

    function go(next) {
      current = (next + slides.length) % slides.length;
      load(slides[current]);
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
      label();
    }

    function play() {
      if (reduceMotion || timer) return;
      timer = setInterval(() => {
        if (!document.hidden) go(current + 1);
      }, 6500);
    }

    function pause() {
      clearInterval(timer);
      timer = null;
    }

    dots.addEventListener("click", (event) => {
      const button = event.target.closest("[data-slide]");
      if (!button) return;
      go(Number(button.dataset.slide));
      pause();
      play();
    });

    const panel = media.closest(".hero__panel") || media;
    panel.addEventListener("mouseenter", pause);
    panel.addEventListener("mouseleave", play);
    dots.addEventListener("focusin", pause);
    dots.addEventListener("focusout", play);

    new MutationObserver(label).observe(root, { attributes: true, attributeFilter: ["lang"] });

    label();
    // Fetch the other photos only once the page itself has finished loading.
    const warm = () => {
      slides.forEach(load);
      play();
    };
    if (document.readyState === "complete") warm();
    else addEventListener("load", warm, { once: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupHero);
  else setupHero();
})();
