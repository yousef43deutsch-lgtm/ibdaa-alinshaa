/* A single, dismissible WhatsApp invitation per tab session. */
(() => {
  'use strict';
  const contact = document.querySelector('.floating-contact');
  if (!contact) return;
  const key = 'ibdaa-contact-greeting-v1';
  try { if (sessionStorage.getItem(key)) return; } catch (_) {}
  let stopped = false, showTimer, hideTimer;
  const bubble = document.createElement('div');
  bubble.className = 'contact-greeting';
  bubble.hidden = true;
  const message = document.createElement('div');
  message.setAttribute('role', 'status');
  message.setAttribute('aria-live', 'polite');
  const title = document.createElement('strong');
  title.textContent = 'حيّاك الله 👋';
  const text = document.createElement('p');
  text.textContent = 'عندك استفسار عن مشروعك؟ حنا هنا نساعدك.';
  message.append(title, text);
  const link = document.createElement('a');
  link.href = 'https://wa.me/966560006471';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'كلّمنا على واتساب ↗';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'contact-greeting-close';
  close.setAttribute('aria-label', 'إغلاق رسالة المساعدة');
  close.textContent = '×';
  bubble.append(close, message, link);
  contact.append(bubble);
  function dismiss() {
    stopped = true;
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    // A manual dismissal returns focus to the nearby, permanent contact link.
    if (bubble.contains(document.activeElement)) contact.querySelector('.floating-whatsapp').focus({preventScroll:true});
    bubble.hidden = true;
  }
  function autoHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (bubble.matches(':hover') || bubble.contains(document.activeElement)) return;
      dismiss();
    }, 15000);
  }
  function show() {
    if (stopped) return;
    const active = document.activeElement;
    if (document.hidden || document.querySelector('dialog[open]') || active?.matches('input,textarea,select') || (active?.isContentEditable)) {
      showTimer = setTimeout(show, 3000);
      return;
    }
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, 'shown'); } catch (_) {}
    bubble.hidden = false;
    autoHide();
  }
  close.addEventListener('click', dismiss);
  contact.addEventListener('click', event => { if (event.target.closest('a')) dismiss(); });
  bubble.addEventListener('pointerenter', () => clearTimeout(hideTimer));
  bubble.addEventListener('pointerleave', autoHide);
  bubble.addEventListener('focusin', () => clearTimeout(hideTimer));
  bubble.addEventListener('focusout', autoHide);
  document.querySelector('#quote-form')?.addEventListener('focusin', dismiss, {once:true});
  document.addEventListener('visibilitychange', () => { if (document.hidden && !bubble.hidden) dismiss(); });
  showTimer = setTimeout(show, 12000);
})();
