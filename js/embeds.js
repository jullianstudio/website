// Click-to-load for third-party players (YouTube, Spotify, Bandcamp).
// Iframes carry their URL in data-src; nothing is requested from the provider
// until the visitor clicks the placeholder.
(function () {
  var fr = document.documentElement.lang === 'fr';

  document.querySelectorAll('iframe[data-src]').forEach(function (frame) {
    var src = frame.getAttribute('data-src');
    var host = /youtube/.test(src) ? 'YouTube' : /spotify/.test(src) ? 'Spotify' : /bandcamp/.test(src) ? 'Bandcamp' : '';
    var title = frame.getAttribute('data-title') || frame.getAttribute('title') || frame.textContent.replace(/<[^>]*>/g, '').trim();
    var cover = frame.getAttribute('data-cover');
    if (!title || title === 'YouTube video player') title = host;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'embed-placeholder';
    button.style.cssText = frame.style.cssText;
    if (frame.getAttribute('width')) button.style.width = frame.getAttribute('width') + 'px';
    if (frame.getAttribute('height')) button.style.height = frame.getAttribute('height') + 'px';
    // Thumbnail: the video's own, or data-thumb (video id) for playlists.
    var video = src.match(/\/embed\/([\w-]{11})(?:\?|$)/);
    var thumb = frame.getAttribute('data-thumb') || (video && video[1] !== 'videoseries' && video[1]);
    if (thumb) {
      button.style.backgroundImage = 'url(/images/yt/' + thumb + '.jpg)';
      button.className += ' has-thumb';
    }

    var note = (fr ? 'Cliquer pour charger le contenu ' : 'Click to load content from ') + host;
    if (cover) {
      // Card layout for audio players: local cover + title, like the provider's player.
      button.className += ' is-card';
      button.innerHTML = '<img class="embed-cover" alt="" src="/images/' + cover + '"><span class="embed-text"><span class="embed-title"></span><span class="embed-note"></span></span><span class="embed-play" aria-hidden="true"></span>';
    } else {
      button.innerHTML = '<span class="embed-play" aria-hidden="true"></span><span class="embed-title"></span><span class="embed-note"></span>';
    }
    button.querySelector('.embed-title').textContent = title;
    button.querySelector('.embed-note').textContent = note;
    button.setAttribute('aria-label', title + ' — ' + note);

    frame.parentNode.replaceChild(button, frame);
    button.addEventListener('click', function () {
      frame.src = host === 'YouTube' ? src.replace('autoplay=0', 'autoplay=1') + (/autoplay=/.test(src) ? '' : (src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1') : src;
      frame.removeAttribute('data-src');
      button.parentNode.replaceChild(frame, button);
    });
  });
})();
