// scripts/contact.js
document.addEventListener('DOMContentLoaded', () => {
  const timestampInput = document.getElementById('timestamp');
  if (!timestampInput) return; // Por si esta página se reusa sin el input
  const now = new Date();
  timestampInput.value = now.toLocaleString();
});
``