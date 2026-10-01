// Firefox can't combine background-clip: text with a fixed background, and mobile
// browsers (Chrome Android, Safari iOS) ignore background-attachment: fixed, so the
// CSS falls back to a scrolling one there; keep the image pinned to the viewport
// by offsetting it on scroll, which recreates desktop Chrome's "fixed" effect.
(function () {
  var isFirefox = window.CSS && CSS.supports('-moz-appearance', 'none');
  var isTouch = window.matchMedia && matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (!isFirefox && !isTouch) return;
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
