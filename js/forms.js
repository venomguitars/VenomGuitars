/* Venom Guitars — form handling via Formspree.
   SETUP: create a form at https://formspree.io, copy its ID (the part after /f/ in
   https://formspree.io/f/xxxxxxxx) and paste it below. Until then forms fall back to
   opening the visitor's email app addressed to the shop. */
const FORMSPREE_ID = 'xrppzngz';
const FALLBACK_EMAIL = 'venomguitarsaus@gmail.com';

async function venomSubmit(fields, subject) {
  if (!FORMSPREE_ID) {
    const body = Object.entries(fields).filter(([k, v]) => v && !k.startsWith('_'))
      .map(([k, v]) => k.replace(/_/g, ' ') + ': ' + v).join('\n');
    window.location.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    return { ok: true, fallback: true };
  }
  try {
    const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({ _subject: subject }, fields))
    });
    return { ok: res.ok };
  } catch (e) {
    return { ok: false };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // ── Contact form ──
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.querySelector('[name=_gotcha]').value) return; // spam trap
      const btn = form.querySelector('[type=submit]');
      const label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…';
      const active = document.querySelector('.enquiry-btn.active');
      const fields = Object.fromEntries(new FormData(form).entries());
      delete fields._gotcha;
      fields.enquiry_type = active ? active.textContent.trim() : 'General';
      const r = await venomSubmit(fields, 'Venom Guitars enquiry — ' + fields.enquiry_type);
      if (r.ok) {
        form.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      } else {
        btn.disabled = false; btn.textContent = label;
        const err = document.getElementById('form-error');
        if (err) err.style.display = 'block';
      }
    });
  }
});

// ── Newsletter (community page) ──
async function subscribeNewsletter() {
  const input = document.getElementById('newsletter-email');
  const email = input.value.trim();
  if (!email || !email.includes('@')) { input.focus(); return; }
  const r = await venomSubmit({ email: email, source: 'Newsletter signup' }, 'Venom Guitars newsletter signup');
  if (r.ok) {
    document.getElementById('newsletter-form').style.display = 'none';
    document.getElementById('newsletter-msg').style.display = 'block';
  } else {
    const err = document.getElementById('newsletter-error');
    if (err) err.style.display = 'block';
  }
}
