// ══════════════════════════════════════════
//  AngelOS — Shared core utilities
// ══════════════════════════════════════════

window.LANG_STORAGE_KEY = 'angelos-lang';
window.BOOT_SKIP_KEY = 'angelos-skip-boot';

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
window.motionAllowed = function () { return !reducedMotionQuery.matches; };

window.escapeHtml = function (str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

window.previewVideo = function (src, maxHeight) {
  const h = maxHeight || 280;
  return `<video src="${src}" style="width:100%;height:auto;max-height:${h}px;object-fit:cover;display:block" autoplay loop muted playsinline playsInline></video>`;
};

window.secureExternalLinks = function (root) {
  (root || document).querySelectorAll('a[target="_blank"]').forEach(function (a) {
    const rel = (a.getAttribute('rel') || '').split(/\s+/);
    if (!rel.includes('noopener')) rel.push('noopener');
    if (!rel.includes('noreferrer')) rel.push('noreferrer');
    a.setAttribute('rel', rel.filter(Boolean).join(' '));
  });
};

window.copyTextFallback = function (text, onSuccess, onFail) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    if (onSuccess) onSuccess();
  } catch {
    if (onFail) onFail();
  }
  document.body.removeChild(ta);
};

window.copyEmail = function () {
  const email = '23angelsperez@gmail.com';
  const ok = function () {
    if (typeof showNotif === 'function') showNotif(window.t('notif.email'));
  };
  const fail = function () {
    if (typeof showNotif === 'function') showNotif(window.t('notif.copyFail'));
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(ok).catch(function () {
      window.copyTextFallback(email, ok, fail);
    });
  } else {
    window.copyTextFallback(email, ok, fail);
  }
};

window.shouldSkipBoot = function () {
  try { return localStorage.getItem(window.BOOT_SKIP_KEY) === '1'; } catch (e) { return false; }
};

window.markBootSkipped = function () {
  try { localStorage.setItem(window.BOOT_SKIP_KEY, '1'); } catch (e) {}
};

window.initIframeLoaders = function (root) {
  (root || document).querySelectorAll('iframe:not([data-load-init])').forEach(function (frame) {
    frame.dataset.loadInit = '1';
    const wrap = document.createElement('div');
    wrap.className = 'iframe-wrap';
    frame.parentNode.insertBefore(wrap, frame);
    wrap.appendChild(frame);
    const loader = document.createElement('div');
    loader.className = 'iframe-loader';
    loader.textContent = window.t ? window.t('ui.loading') : 'Loading...';
    wrap.appendChild(loader);
    frame.addEventListener('load', function () { loader.classList.add('hidden'); });
    setTimeout(function () { loader.classList.add('hidden'); }, 12000);
  });
};

window.initDesktopIconUX = function () {
  document.querySelectorAll('.d-icon[data-app]').forEach(function (icon) {
    if (icon.dataset.uxInit) return;
    icon.dataset.uxInit = '1';
    icon.setAttribute('tabindex', '0');
    icon.setAttribute('role', 'button');
    const label = icon.dataset.tooltip || icon.querySelector('.d-icon-label')?.textContent?.trim() || icon.dataset.app;
    icon.setAttribute('aria-label', label);

    let lastClick = 0;
    function activate() {
      const app = icon.dataset.app;
      if (app && typeof openWindow === 'function') openWindow(app);
    }
    icon.addEventListener('click', function () {
      const now = Date.now();
      if (now - lastClick < 350) { activate(); lastClick = 0; return; }
      lastClick = now;
    });
    icon.addEventListener('dblclick', activate);
    icon.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
};

document.addEventListener('DOMContentLoaded', function () {
  window.secureExternalLinks(document);
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }
});
