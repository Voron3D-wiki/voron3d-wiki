// Copy button on code blocks.
//
// MkDocs Material supplied this (`.md-clipboard`) and it was lost in the move
// to Astro — which also silently killed the `copy_config` analytics event that
// keyed off it. This wiki is largely Klipper config snippets, so a code block
// you cannot copy is the wrong default.
//
// In public/ rather than bundled for the same reason as the other scripts here:
// it is plain browser JS with no build-time dependency, and keeping the set
// together means one place to look for "what runs on every page".
(function () {
  'use strict';

  var COPY = 'Copy';
  var DONE = 'Copied';

  function decorate(pre) {
    // Shiki wraps every block in <pre><code>. Guard against running twice if
    // this ever gets called again on the same node.
    if (pre.parentElement && pre.parentElement.classList.contains('code-block')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = COPY;
    wrapper.appendChild(button);

    var timer = null;

    button.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = code ? code.innerText : pre.innerText;

      var done = function () {
        button.textContent = DONE;
        button.setAttribute('data-copied', '');
        clearTimeout(timer);
        timer = setTimeout(function () {
          button.textContent = COPY;
          button.removeAttribute('data-copied');
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          button.textContent = 'Press Ctrl+C';
        });
      } else {
        // http:// origins and older browsers have no async clipboard API.
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {
          button.textContent = 'Press Ctrl+C';
        }
        document.body.removeChild(area);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.prose pre').forEach(decorate);
  });
})();
