(function () {
  // Mobile menu
  var hdr = document.getElementById('hdr');
  var burger = document.getElementById('burger');
  if (hdr && burger) {
    burger.addEventListener('click', function () {
      var open = hdr.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    hdr.querySelectorAll('.nav a, .connect').forEach(function (a) {
      a.addEventListener('click', function () {
        hdr.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Copy email
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1800); };
      var fallback = function () {
        var el = document.getElementById('email');
        if (!el) return;
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        btn.textContent = 'Press Ctrl+C';
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
    });
  });

  // Contact form → opens the visitor's email app with the message filled in
  var form = document.getElementById('lead');
  if (form) {
    var note = document.getElementById('form-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var missing = [];
      if (!f.name.value.trim()) missing.push('name');
      if (!f.email.value.trim() || !f.email.checkValidity()) missing.push('a valid email');
      if (!f.message.value.trim()) missing.push('a message');
      if (missing.length) {
        note.textContent = 'Please add ' + missing.join(', ') + '.';
        note.hidden = false;
        return;
      }
      var body =
        'Name: ' + f.name.value.trim() + '\n' +
        'Email: ' + f.email.value.trim() + '\n' +
        'Website: ' + (f.website.value.trim() || '-') + '\n' +
        'Monthly ad budget: ' + f.budget.value + '\n\n' +
        f.message.value.trim();
      var href = 'mailto:musa@rast.agency' +
        '?subject=' + encodeURIComponent('PPC enquiry from ' + f.name.value.trim()) +
        '&body=' + encodeURIComponent(body);
      window.location.href = href;
      note.textContent = 'Your email app should open with the message ready to send. If it doesn’t, write to musa@rast.agency.';
      note.hidden = false;
    });
  }
})();
