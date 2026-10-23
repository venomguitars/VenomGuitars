/* Venom Guitars — applies content edited in the admin portal (/admin).
   Every editable element carries a data-cms="section.field" attribute; the default text
   stays in the HTML, and any saved edit in content/<page>.json replaces it on load. */
(function () {
  var file = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  var page = { index: 'home', '404': 'not-found' }[file] || file;

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function render(text, redClass) {
    var h = esc(String(text));
    h = h.replace(/\[\[([\s\S]*?)\]\]/g, redClass
      ? '<span class="' + redClass + '">$1</span>'
      : '<span style="color:var(--red);">$1</span>');
    h = h.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    return h;
  }
  function get(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  Promise.all([get('content/' + page + '.json'), get('content/site.json')]).then(function (res) {
    var data = res[0], site = res[1];
    if (data) {
      if (data.seo) {
        if (data.seo.title) document.title = data.seo.title;
        var m = document.querySelector('meta[name="description"]');
        if (m && data.seo.description) m.setAttribute('content', data.seo.description);
      }
      document.querySelectorAll('[data-cms]').forEach(function (el) {
        var p = el.getAttribute('data-cms').split('.');
        var v = data[p[0]] && data[p[0]][p[1]];
        if (typeof v === 'string' && v.length) el.innerHTML = render(v);
      });
      document.querySelectorAll('[data-cms-img]').forEach(function (el) {
        var k = el.getAttribute('data-cms-img'), im = data.images || {};
        if (im[k]) el.setAttribute('src', String(im[k]).replace(/^\//, ''));
        if (typeof im[k + '_alt'] === 'string') el.setAttribute('alt', im[k + '_alt']);
      });
    }
    if (site) {
      document.querySelectorAll('[data-site-href]').forEach(function (el) {
        var v = site[el.getAttribute('data-site-href')]; if (v) el.setAttribute('href', v);
      });
      document.querySelectorAll('[data-site-mail]').forEach(function (el) {
        if (!site.email) return;
        el.setAttribute('href', 'mailto:' + site.email);
        if (/@/.test(el.textContent)) el.textContent = site.email;
      });
      document.querySelectorAll('[data-site]').forEach(function (el) {
        var v = site[el.getAttribute('data-site')];
        if (typeof v === 'string' && v.length) el.innerHTML = render(v, 'footer-bottom-brand');
      });
    }
  });
})();
