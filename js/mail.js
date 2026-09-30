// Turns obfuscated addresses (<span class="js-mail" data-u="…" data-d="…">) into mailto
// links in the browser, so the full address never appears in the HTML for bots.
document.querySelectorAll('.js-mail').forEach(function (el) {
  var a = document.createElement('a');
  a.href = 'mailto:' + el.dataset.u + '@' + el.dataset.d;
  a.textContent = el.dataset.u + '@' + el.dataset.d;
  el.replaceWith(a);
});
