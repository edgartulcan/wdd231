// scripts/thankyou.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // Helper para evitar inyección (escapar texto)
  const escape = (str) => {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const first = escape(params.get('first'));
  const last = escape(params.get('last'));
  const email = escape(params.get('email'));
  const phone = escape(params.get('phone'));
  const description = escape(params.get('description'));
  const timestamp = escape(params.get('timestamp'));
  const preferred = escape(params.get('membership')); // email | whatsapp

  const results = document.querySelector('#results');
  if (!results) return;

  results.innerHTML = `
    <p><strong>Welcome ${first} ${last}</strong></p>
    <p>Thank you for sending us your information. Your data has been successfully received.</p>
    <p><strong>This is the information we received:</strong></p>
    <ul>
      <li><strong>Email:</strong> ${email || '—'}</li>
      <li><strong>Phone:</strong> ${phone || '—'}</li>
      <li><strong>Preferred contact:</strong> ${preferred || '—'}</li>
      <li><strong>Interest / Questions:</strong> ${description || '—'}</li>
      <li><strong>Recorded at:</strong> ${timestamp || '—'}</li>
    </ul>
    <p>You will receive a message from a member of our team. Please be aware.</p>
  `;
});
