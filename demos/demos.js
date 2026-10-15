'use strict';
// These examples are entirely local. No fetch, storage, or transmission occurs.
document.querySelectorAll('[data-demo-form]').forEach((form) => {
  const result = form.querySelector('.form-result');
  const password = form.querySelector('input[name="password"]');
  const confirmation = form.querySelector('input[name="confirm"]');
  const validateMatch = () => {
    if (password && confirmation) {
      confirmation.setCustomValidity(confirmation.value && confirmation.value !== password.value ? 'The passwords do not match.' : '');
    }
  };
  if (password && confirmation) {
    password.addEventListener('input', validateMatch);
    confirmation.addEventListener('input', validateMatch);
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateMatch();
    if (!form.reportValidity()) return;
    result.textContent = 'Demo validated successfully. Nothing was sent, saved, or registered.';
    result.hidden = false;
  });
  form.addEventListener('input', () => {
    result.hidden = true;
    result.textContent = '';
  });
  form.addEventListener('reset', () => {
    if (confirmation) confirmation.setCustomValidity('');
    result.hidden = true;
    result.textContent = '';
  });
  // Only enable submission after the no-transmission handler is installed.
  // Without JavaScript the button remains inert.
  form.querySelectorAll('[data-demo-submit]').forEach((button) => { button.type = 'submit'; });
});
const personalPage = document.querySelector('[data-personal-theme]');
if (personalPage) {
  document.querySelectorAll('[data-theme]').forEach((button) => {
    button.addEventListener('click', () => {
      personalPage.dataset.personalTheme = button.dataset.theme;
      document.querySelectorAll('[data-theme]').forEach((choice) => {
        choice.setAttribute('aria-pressed', String(choice === button));
      });
    });
  });
}
