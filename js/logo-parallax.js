// Firefox can't combine background-clip: text with a fixed background, so the
// CSS falls back to a scrolling one there; keep the image pinned to the viewport
// by offsetting it on scroll, which recreates Chrome's "fixed" effect.
(function () {
  if (!(window.CSS && CSS.supports('-moz-appearance', 'none'))) return;
  var els = document.querySelectorAll('.textlogoclipping');
  if (!els.length) return;
  var ticking = false;
  function update() {
    ticking = false;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      el.style.backgroundPosition = (-r.left) + 'px ' + (-r.top) + 'px';
    });
  }
  function request() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
})();
