// ── Safety fallback if lang.js failed to load ──
if (typeof window.t !== 'function') {
  window._osLang = 'en';
  window.LANG = { en: {}, es: {} };
  window.t = function(k) { return k; };
  window.applyLanguage = function(l) { window._osLang = l; };
}

// ══════════════════════════════════════════
//  BOOT
// ══════════════════════════════════════════
const bootMessages = [
  { t: 'BIOS v4.2.1 — AngelOS Mobile', cl: '' },
  { t: 'Verifying system integrity...', cl: 'ok' },
  { t: 'Initializing mobile hardware...', cl: 'ok' },
  { t: 'Loading AngelOS kernel...', cl: 'ok' },
  { t: 'Mounting file system...', cl: 'ok' },
  { t: 'Starting network module...', cl: 'ok' },
  { t: 'Loading graphics drivers [HACKER-GREEN-MODE]...', cl: 'ok' },
  { t: 'Starting mobile launcher...', cl: 'ok' },
  { t: 'Loading projects...', cl: 'ok' },
  { t: 'Loading tech stack...', cl: 'ok' },
  { t: '⚠  Stack Coffee.exe not found', cl: 'warn' },
  { t: 'Starting AngelOS Mobile...', cl: '' },
  { t: '', cl: '' },
  { t: '   Welcome, Admin', cl: '' },
  { t: '   AngelOS Mobile v1.0.0-stable', cl: '' },
  { t: '', cl: '' },
  { t: 'System ready.', cl: 'ok' },
];

let bootIdx = 0;
const logEl = document.getElementById('boot-log');
const barEl = document.getElementById('boot-bar');

function bootStep() {
  if (bootIdx >= bootMessages.length) {
    setTimeout(showLogin, 600);
    return;
  }
  const { t, cl } = bootMessages[bootIdx];
  const div = document.createElement('div');
  div.className = 'boot-line' + (cl ? ' ' + cl : '');
  div.textContent = t || '\u00A0';
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
  barEl.style.width = ((bootIdx / bootMessages.length) * 100) + '%';
  bootIdx++;
  const delay = bootIdx < 8 ? 80 : bootIdx < 13 ? 50 : 100;
  setTimeout(bootStep, delay);
}

setTimeout(bootStep, 400);

function showLogin() {
  const boot = document.getElementById('boot-screen');
  boot.classList.add('hidden');
  setTimeout(() => boot.classList.add('gone'), 600);
  const login = document.getElementById('login-screen');
  login.classList.remove('hidden');
  startLoginRain();
}

// ══════════════════════════════════════════
//  LOGIN RAIN
// ══════════════════════════════════════════
function startLoginRain() {
  const canvas = document.getElementById('login-rain');
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const chars = 'アイウエオ01ABCDEF#$%@!';
  const fontSize = 14;
  const cols = Math.floor(canvas.width / fontSize);
  const drops = Array(cols).fill(0).map(() => Math.random() * -30);

  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px "Share Tech Mono"';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 60);
}

// ══════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════
document.getElementById('login-btn').addEventListener('click', function() {
  this.textContent = window.t('login.auth');
  this.disabled = true;
  setTimeout(() => {
    // Hide login
    const loginScreen = document.getElementById('login-screen');
    loginScreen.classList.add('hidden');
    setTimeout(() => loginScreen.classList.add('gone'), 600);

    // Show lang screen — force inline styles as failsafe
    const langScreen = document.getElementById('lang-screen');
    langScreen.classList.remove('hidden');
    langScreen.style.cssText = 'display:flex!important;opacity:1!important;visibility:visible!important;position:fixed!important;inset:0!important;z-index:10000!important;align-items:center;justify-content:center;background:var(--bg1);padding:20px;';
  }, 700);
});

// ══════════════════════════════════════════
//  LANGUAGE SELECTION
// ══════════════════════════════════════════
document.getElementById('lang-btn').addEventListener('click', function() {
  const selectedLang = document.querySelector('input[name="lang"]:checked').value;
  window.applyLanguage(selectedLang);

  // Hide lang screen
  const langScreen = document.getElementById('lang-screen');
  langScreen.classList.add('hidden');
  langScreen.style.cssText = '';
  setTimeout(() => langScreen.classList.add('gone'), 600);

  // Show home
  const home = document.getElementById('home-screen');
  home.classList.remove('hidden');
  startMatrixRain();
  startClock();
  startBattery();
  setTimeout(() => showNotif(window.t('notif.welcome')), 400);
});

// ══════════════════════════════════════════
//  MATRIX RAIN
// ══════════════════════════════════════════
function startMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const chars = 'アイウエオカキクケコ01ABCDEF#$%@!<>{}';
  const cols = Math.floor(canvas.width / 20);
  const drops = Array(cols).fill(1);
  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = '14px Share Tech Mono';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 20, y * 20);
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 70);
}

// ══════════════════════════════════════════
//  CLOCK & BATTERY
// ══════════════════════════════════════════
function startClock() {
  const el = document.getElementById('status-time');
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    el.textContent = h + ':' + m;
  }
  tick();
  setInterval(tick, 10000);
}

function startBattery() {
  const el = document.querySelector('.battery');
  if (!el) return;
  if (navigator.getBattery) {
    navigator.getBattery().then(b => {
      function updateBat() {
        const pct = Math.round(b.level * 100);
        const bars = pct > 75 ? '▮▮▮▮' : pct > 50 ? '▮▮▮▯' : pct > 25 ? '▮▮▯▯' : '▮▯▯▯';
        el.textContent = bars + ' ' + pct + '%';
      }
      updateBat();
      b.addEventListener('levelchange', updateBat);
    }).catch(() => {});
  }
}

// ══════════════════════════════════════════
//  PAGES (swipe)
// ══════════════════════════════════════════
let currentPage = 0;
const totalPages = 2;
const wrapper = document.getElementById('pages-wrapper');
const pages = wrapper.querySelectorAll('.icon-page');
const dots  = document.querySelectorAll('.dot');

let touchStartX = 0;
let touchStartY = 0;
let isDragging = false;
let dragOffset = 0;

wrapper.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isDragging = true;
  dragOffset = 0;
}, { passive: true });

wrapper.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - touchStartX;
  const dy = e.touches[0].clientY - touchStartY;
  if (Math.abs(dy) > Math.abs(dx)) { isDragging = false; return; }
  dragOffset = dx;
  applyPageTransform(-currentPage * 100 + (dragOffset / window.innerWidth * 100));
}, { passive: true });

wrapper.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  if (dragOffset < -60 && currentPage < totalPages - 1) currentPage++;
  else if (dragOffset > 60 && currentPage > 0) currentPage--;
  goToPage(currentPage);
});

function applyPageTransform(pct) {
  pages.forEach(p => {
    p.style.transform = `translateX(${pct}%)`;
  });
}

function goToPage(n) {
  currentPage = n;
  applyPageTransform(-n * 100);
  dots.forEach((d, i) => d.classList.toggle('active', i === n));
}

dots.forEach(d => {
  d.addEventListener('click', () => goToPage(parseInt(d.dataset.page)));
});

// ══════════════════════════════════════════
//  APP PANEL
// ══════════════════════════════════════════
const panel      = document.getElementById('app-panel');
const panelTitle = document.getElementById('panel-title');
const panelBody  = document.getElementById('panel-body');
const panelBack  = document.getElementById('panel-back');
const panelClose = document.getElementById('panel-close');

function openApp(id) {
  const def = appDefs[id];
  if (!def) return;

  panel.dataset.currentApp = id;
  panelTitle.textContent = typeof def.title === 'function' ? def.title() : def.title;
  panelBody.innerHTML = def.content();
  panel.classList.remove('hidden');
  requestAnimationFrame(() => panel.classList.add('open'));

  if (def.onOpen) setTimeout(def.onOpen, 150);
}

function closeApp() {
  panel.classList.remove('open');
  setTimeout(() => {
    panel.classList.add('hidden');
    panelBody.innerHTML = '';
  }, 350);
}

panelBack.addEventListener('click', closeApp);
panelClose.addEventListener('click', closeApp);

// Icon tap
document.addEventListener('click', function(e) {
  const icon = e.target.closest('.app-icon[data-app]');
  if (icon && !icon.classList.contains('empty')) {
    openApp(icon.dataset.app);
  }
});

// ══════════════════════════════════════════
//  APP DEFINITIONS
// ══════════════════════════════════════════
const appDefs = window.appDefs = {

  about: {
    title: () => window.t('app.about.title'),
    content: () => `
      <div class="section-title">// WHOAMI</div>
      <div class="about-grid">
        <div class="about-field"><label>${window.t('about.label.name')}</label><span>Angel Salinas Pérez</span></div>
        <div class="about-field"><label>${window.t('about.label.role')}</label><span>${window.t('about.value.role')}</span></div>
        <div class="about-field"><label>${window.t('about.label.location')}</label><span>${window.t('about.value.location')}</span></div>
        <div class="about-field"><label>${window.t('about.label.email')}</label><span>23angelsperez@gmail.com</span></div>
        <div class="about-field"><label>GitHub</label><span>AngelDev2343</span></div>
        <div class="about-field"><label>Instagram</label><span>@angl.perz</span></div>
        <div class="about-field"><label>${window.t('about.label.status')}</label><span style="color:#00ff41">${window.t('about.value.status')}</span></div>
        <div class="about-field"><label>${window.t('about.label.version')}</label><span>v2026.04</span></div>
      </div>
      <div style="margin-top:14px;padding:14px;background:var(--bg3);border-left:2px solid var(--green);font-size:11px;color:var(--text-dim);line-height:1.8">
        <span class="prompt">angel@angelos:~$ </span><span class="cmd">cat about.txt</span><br><br>
        <span class="out">${window.t('about.bio')}</span>
      </div>
    `
  },

  projects: {
    title: () => window.t('app.projects.title'),
    content: () => `
      <div class="section-title">// LS -LA ~/projects</div>
      <div class="project-list">
        <div class="project-card">
          <h3>WhyAI</h3>
          <p>${window.t('proj.whyai.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">JavaScript</span><span class="tag">WebAI</span><span class="tag">Privacy</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/WhyAI" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://angelsperez.github.io/ia-offline/" target="_blank">[ Demo ]</a>
          </div>
        </div>
        <div class="project-card">
          <h3>Bio3D</h3>
          <p>${window.t('proj.bio3d.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">WebGL</span><span class="tag">Three.js</span><span class="tag">ML</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/Bio3D" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://angeldev2343.github.io/Bio3D/" target="_blank">[ Demo ]</a>
          </div>
        </div>
        <div class="project-card">
          <h3>Cerimex</h3>
          <p>${window.t('proj.cerimex.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">PHP</span><span class="tag">MySQL</span><span class="tag">E-commerce</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/Cerimex" target="_blank">[ GitHub ]</a>
          </div>
        </div>
        <div class="project-card">
          <h3>Twin Messenger</h3>
          <p>${window.t('proj.twin.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">Node.js</span><span class="tag">WebSockets</span><span class="tag">Retro</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/TwinMessenger" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://twin-messenger.great-site.net/" target="_blank">[ Demo ]</a>
          </div>
        </div>
        <div class="project-card">
          <h3>Fender</h3>
          <p>${window.t('proj.fender.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">Python</span><span class="tag">Django</span><span class="tag">UI/UX</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/Fender" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://angeldev2343.pythonanywhere.com/" target="_blank">[ Demo ]</a>
          </div>
        </div>
        <div class="project-card">
          <h3>FlutterTool</h3>
          <p>${window.t('proj.flutter.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">Windows</span><span class="tag">Batch</span><span class="tag">Automation</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/releases/download/v1.0/FlutterTool.bat" target="_blank">${window.t('proj.btn.download')}</a>
          </div>
        </div>
        <div class="project-card">
          <h3>Digital Piano</h3>
          <p>${window.t('proj.piano.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">JavaScript</span><span class="tag">Audio</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/DigitalPiano" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://AngelDev2343.github.io/DigitalPiano/index.html" target="_blank">[ Demo ]</a>
          </div>
        </div>
        <div class="project-card">
          <h3>MarketplaceOnly</h3>
          <p>${window.t('proj.market.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">Android</span><span class="tag">Kotlin</span><span class="tag">Privacy</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly/releases/download/1.1_Signed/MarketPlaceOnly-Signed.apk" target="_blank">${window.t('proj.btn.apk')}</a>
          </div>
        </div>
        <div class="project-card">
          <h3>MitosisVR</h3>
          <p>${window.t('proj.mitosis.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">Godot 4</span><span class="tag">VR</span><span class="tag">Educativo</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/MitosisVR" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://mitosis1.netlify.app/main.html" target="_blank">${window.t('proj.btn.try')}</a>
          </div>
        </div>
        <div class="project-card">
          <h3>DevOS</h3>
          <p>${window.t('proj.devos.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">Linux</span><span class="tag">Fedora</span><span class="tag">AI</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/DevOS" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Live_v1.0/DevOS-Live_v1.0.iso" target="_blank">${window.t('proj.btn.iso')}</a>
          </div>
        </div>
        <div class="project-card">
          <h3>EmuNAV</h3>
          <p>${window.t('proj.emunav.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">WebAssembly</span><span class="tag">Emulator</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/EmuNAV/" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://angeldev2343.github.io/EmuNAV/" target="_blank">${window.t('proj.btn.try')}</a>
          </div>
        </div>
        <div class="project-card">
          <h3>NavaScript</h3>
          <p>${window.t('proj.nava.desc')}</p>
          <div style="margin-bottom:8px"><span class="tag">Language</span><span class="tag">IDE</span><span class="tag">Experimental</span></div>
          <div class="project-links">
            <a class="project-link" href="https://github.com/AngelDev2343/NavaScript" target="_blank">[ GitHub ]</a>
            <a class="project-link" href="https://AngelDev2343.github.io/NavaScript" target="_blank">${window.t('proj.btn.ide')}</a>
          </div>
        </div>
      </div>
    `
  },

  skills: {
    title: () => window.t('app.skills.title'),
    content: () => `
      <div class="section-title">// STACK --list-all</div>
      <div style="margin-bottom:12px;font-size:11px;color:var(--text-dim)">
        <span class="prompt">angel@angelos:~$ </span><span class="cmd">query stack WHERE level > 0</span>
      </div>
      <div style="margin-bottom:10px;font-size:10px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.frontend')}</div>
      <div class="skills-grid" style="margin-bottom:16px">
        <div class="skill-badge"><span class="sk-icon"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/html-icon.png"></span>HTML5</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://quintonparks.com/images/css.png"></span>CSS3</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://cdn.iconscout.com/icon/free/png-512/javascript-2752148-2284965.png"></span>JavaScript</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://web-creator.ru/technologies/kotlin.png"></span>Kotlin</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://seekicon.com/free-icon-download/flutter_2.png"></span>Flutter</div>
      </div>
      <div style="margin-bottom:10px;font-size:10px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.backend')}</div>
      <div class="skills-grid" style="margin-bottom:16px">
        <div class="skill-badge"><span class="sk-icon"><img src="https://www.svgrepo.com/show/354238/python.svg"></span>Python</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/NavaScript/refs/heads/main/NS.png"></span>NavaScript</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://user-images.githubusercontent.com/2877584/229525885-d6f06474-d560-4f34-8b63-cae8f7265008.svg"></span>Node.js</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://www.svgrepo.com/show/452088/php.svg"></span>PHP</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://seekicon.com/free-icon-download/django_3.png"></span>Django</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/dart-programming-language-icon.png"></span>Dart</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://cdn.creazilla.com/icons/3253516/bash-icon-icon-md.png"></span>Bash</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://images.icon-icons.com/1495/PNG/512/godot_103035.png"></span>GDScript</div>
      </div>
      <div style="margin-bottom:10px;font-size:10px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.databases')}</div>
      <div class="skills-grid" style="margin-bottom:16px">
        <div class="skill-badge"><span class="sk-icon"><img src="https://www.svgrepo.com/show/354099/mysql.svg"></span>MySQL</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/imagenes/mongodb.png"></span>MongoDB</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://miro.medium.com/v2/resize:fit:1400/1*5Hnnv0awfSv0BGcq1C522w.png"></span>phpMyAdmin</div>
      </div>
      <div style="margin-bottom:10px;font-size:10px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.tools')}</div>
      <div class="skills-grid">
        <div class="skill-badge"><span class="sk-icon"><img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/vscode.png"></span>VS Code</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/gifs/github.gif" style="border-radius:50%"></span>Git/GitHub</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://cdn2.iconfinder.com/data/icons/pack1-baco-flurry-icons-style/512/XAMPP.png"></span>XAMPP</div>
        <div class="skill-badge"><span class="sk-icon"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/fedora-project-icon.png"></span>Fedora</div>
      </div>
    `
  },

  contact: {
    title: () => window.t('app.contact.title'),
    content: () => `
      <div class="section-title">// CONTACT --help</div>
      <div style="font-size:11px;color:var(--text-dim);margin-bottom:16px">
        <span class="prompt">angel@angelos:~$ </span><span class="cmd">./contact.sh --list</span>
      </div>
      <div class="contact-item" onclick="navigator.clipboard&&navigator.clipboard.writeText('23angelsperez@gmail.com').then(()=>showNotif(window.t('notif.email')))">
        <div class="contact-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/imagenes/email.png" width="22" style="border-radius:50%"></div>
        <div class="contact-info">
          <label>Email</label>
          <span>23angelsperez@gmail.com</span>
        </div>
        <span style="font-size:10px;color:var(--text-muted);margin-left:auto">${window.t('contact.copy')}</span>
      </div>
      <div class="contact-item" onclick="window.open('https://github.com/AngelDev2343','_blank')">
        <div class="contact-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/gifs/github.gif" width="22" style="border-radius:50%"></div>
        <div class="contact-info">
          <label>GitHub</label>
          <span>AngelDev2343</span>
        </div>
        <span style="font-size:10px;color:var(--text-muted);margin-left:auto">${window.t('contact.open')}</span>
      </div>
      <div class="contact-item" onclick="window.open('https://www.instagram.com/angl.perz/','_blank')">
        <div class="contact-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/imagenes/social.png" width="22" style="border-radius:50%"></div>
        <div class="contact-info">
          <label>Instagram</label>
          <span>@angl.perz</span>
        </div>
        <span style="font-size:10px;color:var(--text-muted);margin-left:auto">${window.t('contact.open')}</span>
      </div>
      <div style="margin-top:20px;padding:14px;background:var(--bg3);border:1px solid var(--border);font-size:11px;color:var(--text-dim);line-height:1.8">
        <span class="hi">${window.t('contact.cta.title')}</span><br>${window.t('contact.cta.body')}
      </div>
    `
  },

  terminal: {
    title: () => window.t('app.terminal.title'),
    content: () => `
      <div id="term-out" class="terminal-output">
        <span class="prompt">angel@angelos:~$ </span><span class="cmd">help</span><br>
        <span class="out">${window.t('term.help.header')}</span><br>
        <span class="out">  <span class="hi">whoami</span>    ${window.t('term.cmd.whoami')}</span><br>
        <span class="out">  <span class="hi">projects</span>  ${window.t('term.cmd.projects')}</span><br>
        <span class="out">  <span class="hi">skills</span>    ${window.t('term.cmd.skills')}</span><br>
        <span class="out">  <span class="hi">contact</span>   ${window.t('term.cmd.contact')}</span><br>
        <span class="out">  <span class="hi">github</span>    ${window.t('term.cmd.github')}</span><br>
        <span class="out">  <span class="hi">clear</span>     ${window.t('term.cmd.clear')}</span><br>
        <span class="out">  <span class="hi">rain</span>      ${window.t('term.cmd.rain')}</span><br>
        <span class="out">  <span class="hi">matrix</span>    ${window.t('term.cmd.matrix')}</span><br><br>
      </div>
      <div class="terminal-input-line">
        <span class="prompt">angel@angelos:~$ </span>
        <input type="text" class="terminal-input" id="term-input" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="none">
        <span class="cursor-blink"></span>
      </div>
    `,
    onOpen: () => {
      const inp = document.getElementById('term-input');
      if (inp) inp.addEventListener('keydown', handleTerminalInput);
    }
  },

  whyai: {
    title: 'WhyAI',
    content: () => `
      <div class="section-title">// WhyAI — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">angelsperez.github.io/ia-offline/</div>
        </div>
        <video src="https://github.com/user-attachments/assets/ca696e85-2d6d-4b2c-b012-57347b33bf7f"
          style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block"
          autoplay loop muted playsinline></video>
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.whyai.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/WhyAI" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://angelsperez.github.io/ia-offline/" target="_blank">[ Demo ]</a>
      </div>
      <div><span class="tag">JavaScript</span><span class="tag">WebAI</span><span class="tag">Privacy-First</span></div>
    `
  },

  bio3d: {
    title: 'Bio3D',
    content: () => `
      <div class="section-title">// Bio3D — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">angeldev2343.github.io/Bio3D/</div>
        </div>
        <video src="https://github.com/user-attachments/assets/ca9c58ff-6be7-4d7a-a1cc-e9df7ab56f73"
          style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block"
          autoplay loop muted playsinline></video>
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.bio3d.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/Bio3D" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://angeldev2343.github.io/Bio3D/" target="_blank">[ Demo ]</a>
      </div>
      <div><span class="tag">WebGL</span><span class="tag">Three.js</span><span class="tag">MediaPipe</span></div>
    `
  },

  cerimex: {
    title: 'Cerimex',
    content: () => `
      <div class="section-title">// Cerimex — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">cerimex.local / tienda</div>
        </div>
        <img src="https://github.com/AngelDev2343/land/blob/main/gifs/cerimex.gif?raw=true" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block">
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.cerimex.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/Cerimex" target="_blank">[ GitHub ]</a>
      </div>
      <div><span class="tag">PHP</span><span class="tag">MySQL</span><span class="tag">Chatbot</span></div>
    `
  },

  twin: {
    title: 'Twin Messenger',
    content: () => `
      <div class="section-title">// Twin Messenger — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">twin-messenger.great-site.net</div>
        </div>
        <img src="https://github.com/AngelDev2343/land/blob/main/gifs/twin.gif?raw=true" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block">
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.twin.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/TwinMessenger" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://twin-messenger.great-site.net/" target="_blank">[ Demo ]</a>
      </div>
      <div><span class="tag">Node.js</span><span class="tag">WebSockets</span><span class="tag">Retro</span></div>
    `
  },

  fender: {
    title: 'Fender',
    content: () => `
      <div class="section-title">// Fender — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">angeldev2343.pythonanywhere.com</div>
        </div>
        <img src="https://github.com/AngelDev2343/land/blob/main/gifs/fender.gif?raw=true" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block">
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.fender.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/Fender" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://angeldev2343.pythonanywhere.com/" target="_blank">[ Demo ]</a>
      </div>
      <div><span class="tag">Python</span><span class="tag">Django</span><span class="tag">UI/UX</span></div>
    `
  },

  fluttertool: {
    title: 'FlutterTool',
    content: () => `
      <div class="section-title">// FlutterTool — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">github.com/AngelDev2343/FlutterTool</div>
        </div>
        <img src="https://raw.githubusercontent.com/AngelDev2343/FlutterTool/refs/heads/main/power.PNG" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block">
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.flutter.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/releases/download/v1.0/FlutterTool.bat" target="_blank">${window.t('proj.btn.download')}</a>
      </div>
      <div><span class="tag">Windows</span><span class="tag">Batch</span><span class="tag">Automation</span></div>
    `
  },

  digitalpiano: {
    title: 'Digital Piano',
    content: () => `
      <div class="section-title">// Digital Piano — README.md</div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.piano.detail')}
        <span style="color:var(--text-muted);font-size:10px">${window.t('piano.notice')}</span>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/DigitalPiano" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://AngelDev2343.github.io/DigitalPiano/index.html" target="_blank">${window.t('piano.open')}</a>
      </div>
      <div><span class="tag">JavaScript</span><span class="tag">HTML</span><span class="tag">Audio</span></div>
    `
  },

  marketplaceonly: {
    title: 'MarketplaceOnly',
    content: () => `
      <div class="section-title">// MarketplaceOnly — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">android / facebook marketplace</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;background:var(--bg3)">
          <img src="https://github.com/user-attachments/assets/ec3b255a-e7af-4938-bdc6-8b48fb647906" style="width:100%;border-radius:3px">
          <img src="https://github.com/user-attachments/assets/906e8306-2954-43ca-ab17-c5012813e199" style="width:100%;border-radius:3px">
        </div>
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.market.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly/releases/download/1.1_Signed/MarketPlaceOnly-Signed.apk" target="_blank">${window.t('proj.btn.apk')}</a>
      </div>
      <div><span class="tag">Android</span><span class="tag">Kotlin</span><span class="tag">Privacy</span></div>
    `
  },

  mitosisvr: {
    title: 'MitosisVR',
    content: () => `
      <div class="section-title">// MitosisVR — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">mitosis1.netlify.app</div>
        </div>
        <video src="https://github.com/user-attachments/assets/903e0fd6-d83f-4e73-83e9-f1dfa3ee9b2e"
          style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block"
          autoplay loop muted playsinline></video>
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.mitosis.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/MitosisVR" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://mitosis1.netlify.app/main.html" target="_blank">${window.t('proj.btn.try')}</a>
      </div>
      <div><span class="tag">Godot 4</span><span class="tag">VR</span><span class="tag">Educativo</span></div>
    `
  },

  devos: {
    title: 'DevOS',
    content: () => `
      <div class="section-title">// DevOS — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">github.com / DevOS Live ISO</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;background:var(--bg3)">
          <img src="https://github.com/user-attachments/assets/a1d66433-b64d-4298-9201-9064c39e72cd" style="width:100%;border-radius:3px;object-fit:cover;aspect-ratio:16/9">
          <img src="https://github.com/user-attachments/assets/85012da8-7b14-42b4-8557-d6c1c4a61e54" style="width:100%;border-radius:3px;object-fit:cover;aspect-ratio:16/9">
        </div>
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.devos.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/DevOS" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Live_v1.0/DevOS-Live_v1.0.iso" target="_blank">${window.t('proj.btn.iso')}</a>
      </div>
      <div><span class="tag">Linux</span><span class="tag">Fedora</span><span class="tag">AI</span></div>
    `
  },

  emunav: {
    title: 'EmuNAV',
    content: () => `
      <div class="section-title">// EmuNAV — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">angeldev2343.github.io/emunav</div>
        </div>
        <img src="https://raw.githubusercontent.com/AngelDev2343/EmuNAV/refs/heads/main/Emu.PNG" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block">
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.emunav.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/EmuNAV/" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://angeldev2343.github.io/EmuNAV/" target="_blank">${window.t('proj.btn.try')}</a>
      </div>
      <div><span class="tag">WebAssembly</span><span class="tag">Emulator</span></div>
    `
  },

  navascript: {
    title: 'NavaScript',
    content: () => `
      <div class="section-title">// NavaScript — README.md</div>
      <div class="preview-browser">
        <div class="preview-chrome">
          <div class="preview-dot" style="background:#ff5555"></div>
          <div class="preview-dot" style="background:#ffaa00"></div>
          <div class="preview-dot" style="background:#00ff41"></div>
          <div class="preview-url">angeldev2343.github.io/navascript</div>
        </div>
        <img src="https://raw.githubusercontent.com/AngelDev2343/NavaScript/refs/heads/main/images/image.png" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block">
      </div>
      <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:10px;font-size:11px;color:var(--text-dim);line-height:1.8">
        ${window.t('proj.nava.detail')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <a class="project-link" href="https://github.com/AngelDev2343/NavaScript" target="_blank">[ GitHub ]</a>
        <a class="project-link" href="https://AngelDev2343.github.io/NavaScript" target="_blank">${window.t('proj.btn.ide')}</a>
      </div>
      <div><span class="tag">Language</span><span class="tag">IDE</span><span class="tag">Experimental</span></div>
    `
  },

  arcade: {
    title: 'Angel Dev Arcade',
    content: () => `
      <iframe
        src="https://angelsperez.github.io/Angel-Dev-Arcade/"
        class="arcade-frame"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
        loading="lazy"></iframe>
    `
  }

};

// ══════════════════════════════════════════
//  TERMINAL
// ══════════════════════════════════════════
function handleTerminalInput(e) {
  if (e.key !== 'Enter') return;
  const inp = document.getElementById('term-input');
  const out = document.getElementById('term-out');
  if (!inp || !out) return;
  const cmd = inp.value.trim().toLowerCase();
  inp.value = '';

  const line = document.createElement('div');
  line.innerHTML = `<span class="prompt">angel@angelos:~$ </span><span class="cmd">${cmd}</span>`;
  out.appendChild(line);

  const res = document.createElement('div');
  res.style.marginBottom = '6px';

  const responses = {
    whoami:   () => `<span class="out">${window.t('term.res.whoami')}</span>`,
    projects: () => `<span class="out">${window.t('term.res.projects')}</span>`,
    skills:   () => `<span class="out">${window.t('term.res.skills')}</span>`,
    contact:  () => `<span class="out">${window.t('term.res.contact')}</span>`,
    github:   () => `<span class="out">${window.t('term.res.github')}</span>`,
    clear:    () => '__CLEAR__',
    matrix:   () => `<span class="warn-t">${window.t('term.res.matrix')}</span>`,
    sudo:     () => `<span class="warn-t">${window.t('term.res.sudo')}</span>`,
    ls:       () => `<span class="out">${window.t('term.res.ls')}</span>`,
    pwd:      () => `<span class="out">/home/angel/portfolio</span>`,
    date:     () => `<span class="out">${new Date().toLocaleString(window._osLang === 'es' ? 'es-MX' : 'en-US')}</span>`,
    help:     () => `<span class="out">${window.t('term.help.list')}</span>`,
    rain:     () => '__RAIN__',
    '':       () => `<span class="out"></span>`
  };

  if (cmd === 'clear') {
    out.innerHTML = '';
  } else if (cmd === 'rain') {
    const existing = out.querySelector('.term-rain-wrap');
    if (existing) existing.remove();
    const rainId = 'term-rain-' + Date.now();
    const wrap = document.createElement('div');
    wrap.className = 'term-rain-wrap';
    wrap.innerHTML = `
      <canvas id="${rainId}"></canvas>
      <button onclick="
        const c=document.getElementById('${rainId}');
        if(c._rainStop){c._rainStop();this.textContent=window.t('term.rain.start');}
        else{startTermRain('${rainId}');this.textContent=window.t('term.rain.stop');}
      ">${window.t('term.rain.stop')}</button>
      <span style="font-size:9px;color:var(--text-muted);margin-left:8px">${window.t('term.rain.active')}</span>
    `;
    res.appendChild(wrap);
    out.appendChild(res);
    setTimeout(() => startTermRain(rainId), 50);
  } else if (cmd === 'github') {
    window.open('https://github.com/AngelDev2343', '_blank');
    res.innerHTML = responses.github();
    out.appendChild(res);
  } else if (responses[cmd] !== undefined) {
    const val = responses[cmd]();
    if (val === '__CLEAR__') { out.innerHTML = ''; }
    else if (val !== '__RAIN__') { res.innerHTML = val; out.appendChild(res); }
  } else {
    res.innerHTML = `<span style="color:#ff4444">${window.t('term.err').replace('{cmd}', cmd)}</span>`;
    out.appendChild(res);
  }

  const body = out.closest('.panel-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function startTermRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth || 300;
  canvas.height = 140;
  const chars = 'アイウエオ01ABCDEF#$%@!';
  const fontSize = 12;
  const cols = Math.floor(canvas.width / fontSize);
  const drops = Array(cols).fill(0).map(() => Math.random() * -20);

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.09)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px "Share Tech Mono"';
    drops.forEach((y, i) => {
      ctx.fillStyle = Math.random() > 0.95 ? '#afffaf' : '#00ff41';
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.6;
    });
  }

  const raf = { id: null };
  function loop() { draw(); raf.id = requestAnimationFrame(loop); }
  loop();
  canvas._rainStop = () => { cancelAnimationFrame(raf.id); canvas._rainStop = null; };
}

// ══════════════════════════════════════════
//  NOTIFICATION
// ══════════════════════════════════════════
function showNotif(msg) {
  const n = document.getElementById('notif');
  n.textContent = '⬡  ' + msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 3000);
}