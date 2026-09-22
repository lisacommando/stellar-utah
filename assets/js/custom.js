document.querySelector(".alert-bar__close")?.addEventListener("click", function () {
  this.closest(".alert-bar")?.remove();
});

(function initPromoParallax() {
  const promo = document.querySelector(".promo");
  const layer = promo?.querySelector(".promo__parallax");
  if (!promo || !layer) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let ticking = false;

  function updateParallax() {
    ticking = false;

    if (motionQuery.matches) {
      layer.style.transform = "";
      return;
    }

    const rect = promo.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    if (rect.bottom < 0 || rect.top > viewHeight) return;

    const sectionCenter = rect.top + rect.height / 2;
    const viewCenter = viewHeight / 2;
    const offset = (sectionCenter - viewCenter) * -0.2;

    layer.style.transform = "translate3d(0, " + offset + "px, 0)";
  }

  function onScrollOrResize() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  motionQuery.addEventListener("change", updateParallax);
  updateParallax();
})();
