// ══════════════════════════════════════════
//  AngelOS — Shared core utilities
// ══════════════════════════════════════════

window.LANG_STORAGE_KEY = 'angelos-lang';

window.GITHUB_USER = 'AngelDev2343';
/** Repo names to hide from projects/ and terminal (lowercase). Configure later. */
window.GITHUB_EXCLUDED_REPOS = ['ARUM', 'AngelDev2343', 'CHALLENGE', 'land'];

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

// ── GitHub repos (projects/ + terminal) ───────

window.githubRepos = null;
window._translationCache = Object.create(null);
window._resolvedDescriptions = Object.create(null);

/** Curated i18n descriptions (override GitHub + auto-translate). */
window.REPO_DESC_LANG_KEYS = {
  whyai: 'proj.whyai.desc',
  bio3d: 'proj.bio3d.desc',
  cerimex: 'proj.cerimex.desc',
  twinmessenger: 'proj.twin.desc',
  fender: 'proj.fender.desc',
  fluttertool: 'proj.flutter.desc',
  digitalpiano: 'proj.piano.desc',
  marketplaceonly: 'proj.market.desc',
  mitosisvr: 'proj.mitosis.desc',
  devos: 'proj.devos.desc',
  emunav: 'proj.emunav.desc',
  navascript: 'proj.nava.desc'
};

window.getRepoDescLangKey = function (repoName) {
  const normalized = String(repoName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return window.REPO_DESC_LANG_KEYS[normalized] || null;
};

window.detectTextLang = function (text) {
  if (!text || !String(text).trim()) return null;
  const sample = String(text);
  const lower = ' ' + sample.toLowerCase() + ' ';
  let esScore = 0;
  let enScore = 0;

  esScore += (sample.match(/[áéíóúñü¿¡]/gi) || []).length * 2;

  [' de ', ' la ', ' el ', ' en ', ' con ', ' para ', ' una ', ' un ', ' los ', ' las ', ' que ', ' del ', ' por ', ' es ', ' app ', ' lenguaje ', ' experiencia ', ' sin ', ' desde '].forEach(function (w) {
    if (lower.includes(w)) esScore++;
  });
  [' the ', ' and ', ' for ', ' with ', ' browser ', ' language ', ' experience ', ' web ', ' install ', ' from ', ' app '].forEach(function (w) {
    if (lower.includes(w)) enScore++;
  });

  if (esScore > enScore) return 'es';
  if (enScore > esScore) return 'en';
  return esScore >= enScore ? 'es' : 'en';
};

window.translateDescription = function (text, fromLang, toLang) {
  if (!text || fromLang === toLang) return Promise.resolve(text);
  const cacheKey = fromLang + '>' + toLang + ':' + text;
  if (window._translationCache[cacheKey]) {
    return Promise.resolve(window._translationCache[cacheKey]);
  }

  const pair = fromLang + '|' + toLang;
  const q = text.length > 480 ? text.slice(0, 477) + '...' : text;
  const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(q) + '&langpair=' + pair;

  return fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      const translated = (data.responseData && data.responseData.translatedText)
        ? data.responseData.translatedText
        : text;
      window._translationCache[cacheKey] = translated;
      return translated;
    })
    .catch(function () { return text; });
};

window.resolveProjectDescription = function (repo) {
  const targetLang = window._osLang || 'en';
  const cacheKey = repo.id + ':' + targetLang;
  if (window._resolvedDescriptions[cacheKey]) {
    return Promise.resolve(window._resolvedDescriptions[cacheKey]);
  }

  const langKey = window.getRepoDescLangKey(repo.name);
  if (langKey) {
    const curated = window.t(langKey);
    if (curated && curated !== langKey) {
      window._resolvedDescriptions[cacheKey] = curated;
      return Promise.resolve(curated);
    }
  }

  const raw = (repo.description || '').trim();
  if (!raw) {
    const fallback = window.t('proj.noDesc');
    window._resolvedDescriptions[cacheKey] = fallback;
    return Promise.resolve(fallback);
  }

  const detected = window.detectTextLang(raw);
  if (detected === targetLang) {
    window._resolvedDescriptions[cacheKey] = raw;
    return Promise.resolve(raw);
  }

  const fromLang = detected || (targetLang === 'en' ? 'es' : 'en');
  return window.translateDescription(raw, fromLang, targetLang).then(function (translated) {
    window._resolvedDescriptions[cacheKey] = translated;
    return translated;
  });
};

window.renderProjectsListResolved = function (repos, list) {
  return Promise.all(repos.map(window.resolveProjectDescription)).then(function (descriptions) {
    list.innerHTML = repos.map(function (repo, i) {
      return window.renderProjectCardHTML(repo, descriptions[i]);
    }).join('');
    window.secureExternalLinks(list);
  });
};

window.fetchGitHubRepos = function (forceRefresh) {
  if (!forceRefresh && window.githubRepos) {
    return Promise.resolve(window.githubRepos);
  }
  if (!forceRefresh && window._githubReposPromise) {
    return window._githubReposPromise;
  }

  const url = 'https://api.github.com/users/' + window.GITHUB_USER +
    '/repos?per_page=100&sort=updated&direction=desc&type=owner';

  window._githubReposPromise = fetch(url, {
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then(function (res) {
      if (!res.ok) throw new Error('GitHub API ' + res.status);
      return res.json();
    })
    .then(function (repos) {
      const excluded = new Set(
        (window.GITHUB_EXCLUDED_REPOS || []).map(function (n) { return n.toLowerCase(); })
      );
      window.githubRepos = repos.filter(function (r) {
        return !r.fork && !excluded.has(r.name.toLowerCase());
      });
      return window.githubRepos;
    })
    .catch(function (err) {
      window._githubReposPromise = null;
      throw err;
    });

  return window._githubReposPromise;
};

window.renderProjectCardHTML = function (repo, description) {
  const name = window.escapeHtml(repo.name);
  const desc = window.escapeHtml(
    description != null ? description : (repo.description || window.t('proj.noDesc'))
  );
  const langTag = repo.language
    ? '<span class="tag">' + window.escapeHtml(repo.language) + '</span>'
    : '';
  const ghUrl = window.escapeHtml(repo.html_url);
  let links = '<a class="project-link" href="' + ghUrl + '" target="_blank">[ GitHub ]</a>';
  if (repo.homepage) {
    links += ' <a class="project-link" href="' + window.escapeHtml(repo.homepage) + '" target="_blank">[ Demo ]</a>';
  }
  return (
    '<div class="project-card">' +
      '<h3>' + name + '</h3>' +
      '<p>' + desc + '</p>' +
      '<div style="margin-bottom:10px">' + langTag + '</div>' +
      '<div class="project-links">' + links + '</div>' +
    '</div>'
  );
};

window.renderProjectsPanelHTML = function () {
  return (
    '<div class="section-title">// LS -LA ~/projects</div>' +
    '<div class="project-list" data-github-projects>' +
      '<div class="projects-loading">' + window.t('ui.loading') + '</div>' +
    '</div>'
  );
};

window.hydrateProjectsPanel = function (root) {
  const scope = root || document;
  const list = scope.querySelector('[data-github-projects]');
  if (!list) return Promise.resolve();

  list.innerHTML = '<div class="projects-loading">' + window.t('ui.loading') + '</div>';

  return window.fetchGitHubRepos().then(function (repos) {
    if (!repos.length) {
      list.innerHTML = '<div class="projects-empty">' + window.t('proj.empty') + '</div>';
      return repos;
    }
    return window.renderProjectsListResolved(repos, list).then(function () { return repos; });
  }).catch(function () {
    list.innerHTML = '<div class="projects-error">' + window.t('proj.fetchError') + '</div>';
  });
};

window.renderTerminalProjectsHTML = function (repos) {
  if (!repos || !repos.length) {
    return window.escapeHtml(window.t('proj.empty'));
  }
  const header = window.t('term.projects.header').replace('{n}', String(repos.length));
  const lines = repos.map(function (repo, i) {
    const prefix = i === repos.length - 1 ? '└─' : '├─';
    const rawName = repo.name.length > 16 ? repo.name.slice(0, 15) + '…' : repo.name;
    const name = window.escapeHtml(rawName.padEnd(16, ' '));
    const lang = window.escapeHtml(repo.language || '—');
    return '  ' + prefix + ' ' + name + ' [' + lang + ']';
  });
  return window.escapeHtml(header) + '<br>' + lines.join('<br>');
};

window.runTerminalProjectsCommand = function (res, out, scrollRoot) {
  res.innerHTML = '<span class="out">' + window.escapeHtml(window.t('ui.loading')) + '</span>';
  out.appendChild(res);

  function scroll() {
    const parent = scrollRoot || out.closest('.window-body') || out.closest('.panel-body');
    if (parent) parent.scrollTop = parent.scrollHeight;
  }
  scroll();

  return window.fetchGitHubRepos().then(function (repos) {
    res.innerHTML = '<span class="out">' + window.renderTerminalProjectsHTML(repos) + '</span>';
    scroll();
  }).catch(function () {
    res.innerHTML = '<span class="out" style="color:#ff4444">' + window.escapeHtml(window.t('proj.fetchError')) + '</span>';
    scroll();
  });
};

// ── Certificates ─────────────────────────────

window.CERTIFICATES = [
  {
    id: 'santander-prompting-ia',
    issuerKey: 'cert.santander.issuer',
    titleKey: 'cert.santander.title',
    date: '2026-07-10',
    hours: 8,
    modules: 2,
    serial: 'OA-2026-0710002857572',
    pdf: 'certificates/santander-prompting-ia.pdf',
    thumb: 'certificates/santander-prompting-ia.png',
    partnersKey: 'cert.santander.partners'
  }
];

window.formatCertDate = function (isoDate) {
  const locale = window._osLang === 'es' ? 'es-MX' : 'en-US';
  return new Date(isoDate + 'T12:00:00').toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

window.renderCertificateCardHTML = function (cert) {
  const title = window.escapeHtml(window.t(cert.titleKey));
  const issuer = window.escapeHtml(window.t(cert.issuerKey));
  const dateStr = window.escapeHtml(window.formatCertDate(cert.date));
  const hours = window.t('cert.hours').replace('{n}', String(cert.hours));
  const modules = window.t('cert.modules').replace('{n}', String(cert.modules));
  const serial = window.escapeHtml(cert.serial);
  const partners = cert.partnersKey ? window.escapeHtml(window.t(cert.partnersKey)) : '';
  const pdf = window.escapeHtml(cert.pdf);
  const thumb = window.escapeHtml(cert.thumb);

  return (
    '<article class="cert-card" data-cert-id="' + window.escapeHtml(cert.id) + '">' +
      '<div class="cert-card-top">' +
        '<img class="cert-thumb" src="' + thumb + '" alt="' + title + '" loading="lazy">' +
        '<div class="cert-info">' +
          '<h3>' + title + '</h3>' +
          '<p class="cert-issuer">' + issuer + '</p>' +
          '<ul class="cert-meta">' +
            '<li><span class="cert-meta-label">' + window.escapeHtml(window.t('cert.label.date')) + '</span> ' + dateStr + '</li>' +
            '<li><span class="cert-meta-label">' + window.escapeHtml(window.t('cert.label.duration')) + '</span> ' + window.escapeHtml(hours) + ' · ' + window.escapeHtml(modules) + '</li>' +
            (partners ? '<li><span class="cert-meta-label">' + window.escapeHtml(window.t('cert.label.content')) + '</span> ' + partners + '</li>' : '') +
            '<li><span class="cert-meta-label">' + window.escapeHtml(window.t('cert.label.serial')) + '</span> <code>' + serial + '</code></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="cert-actions">' +
        '<button type="button" class="cert-action-btn cert-view-btn" data-pdf="' + pdf + '">' + window.escapeHtml(window.t('cert.view')) + '</button>' +
        '<a class="cert-action-btn" href="' + pdf + '" target="_blank">' + window.escapeHtml(window.t('cert.open')) + '</a>' +
      '</div>' +
      '<div class="cert-pdf-view">' +
        '<iframe title="' + title + '" loading="lazy"></iframe>' +
      '</div>' +
    '</article>'
  );
};

window.renderCertificatesPanelHTML = function () {
  const cards = window.CERTIFICATES.map(window.renderCertificateCardHTML).join('');
  return (
    '<div class="section-title">// ' + window.escapeHtml(window.t('cert.section')) + '</div>' +
    '<div class="cert-list">' + cards + '</div>'
  );
};

window.initCertificatesPanel = function (root) {
  const scope = root || document;
  scope.querySelectorAll('.cert-view-btn').forEach(function (btn) {
    if (btn.dataset.certInit) return;
    btn.dataset.certInit = '1';
    btn.addEventListener('click', function () {
      const card = btn.closest('.cert-card');
      const wrap = card.querySelector('.cert-pdf-view');
      const frame = wrap.querySelector('iframe');
      const pdf = btn.dataset.pdf;
      const isOpen = wrap.classList.contains('open');

      scope.querySelectorAll('.cert-pdf-view.open').forEach(function (other) {
        if (other === wrap) return;
        other.classList.remove('open');
        const f = other.querySelector('iframe');
        if (f) f.removeAttribute('src');
        const otherBtn = other.closest('.cert-card')?.querySelector('.cert-view-btn');
        if (otherBtn) otherBtn.textContent = window.t('cert.view');
      });

      if (isOpen) {
        wrap.classList.remove('open');
        frame.removeAttribute('src');
        btn.textContent = window.t('cert.view');
      } else {
        wrap.classList.add('open');
        frame.src = pdf;
        btn.textContent = window.t('cert.hide');
        wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  window.secureExternalLinks(scope);
};

window.secureExternalLinks = function (root) {
  (root || document).querySelectorAll('a[target="_blank"]').forEach(function (a) {
    const rel = (a.getAttribute('rel') || '').split(/\s+/);
    if (!rel.includes('noopener')) rel.push('noopener');
    if (!rel.includes('noreferrer')) rel.push('noreferrer');
    a.setAttribute('rel', rel.filter(Boolean).join(' '));
  });
};

window.copyTextFallback = function (text, onSuccess, onFail) {  const ta = document.createElement('textarea');
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

window.shouldInitIframeLoaders = function (def) {
  if (!def) return true;
  if (def.bodyClass && def.bodyClass.indexOf('window-body-fill') >= 0) return false;
  if (def.panelClass && def.panelClass.indexOf('panel-body-fill') >= 0) return false;
  return true;
};

window.initIframeLoaders = function (root) {
  (root || document).querySelectorAll('iframe:not([data-load-init]):not(.embed-flex-frame):not(.preview-embed-frame)').forEach(function (frame) {
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

    function activate() {
      const app = icon.dataset.app;
      if (app && typeof openWindow === 'function') openWindow(app);
    }
    icon.addEventListener('click', activate);
    icon.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
};

document.addEventListener('DOMContentLoaded', function () {
  window.secureExternalLinks(document);
  window.fetchGitHubRepos().catch(function () {});
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }
});
