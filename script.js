// ── Safety fallback if lang.js failed to load ──
if (typeof window.t !== 'function') {
  window._osLang = 'en';
  window.LANG = { en: {}, es: {} };
  window.t = function(k) { return k; };
  window.applyLanguage = function(l) { window._osLang = l; };
}


// ══════════════════════════════════════════
//  BOOT SEQUENCE
// ══════════════════════════════════════════
const bootMessages = [
    { t: 'BIOS v4.2.1 — AngelOS Foundation', cl: '' },
    { t: 'Verifying system integrity...', cl: 'ok' },
    { t: 'Initializing virtual hardware...', cl: 'ok' },
    { t: 'Loading AngelOS kernel...', cl: 'ok' },
    { t: 'Mounting file system...', cl: 'ok' },
    { t: 'Starting network module...', cl: 'ok' },
    { t: 'Loading graphics drivers [HACKER-GREEN-MODE]...', cl: 'ok' },
    { t: 'Starting window manager...', cl: 'ok' },
    { t: 'Loading projects database...', cl: 'ok' },
    { t: 'Loading stack module...', cl: 'ok' },
    { t: 'Starting contact server...', cl: 'ok' },
    { t: 'Verifying SSL certificates...', cl: 'ok' },
    { t: 'Loading user profile: Admin...', cl: 'ok' },
    { t: 'Starting desktop compositor...', cl: 'ok' },
    { t: 'Applying theme [MATRIX-HACKER]...', cl: 'ok' },
    { t: '⚠  Stack Coffee.exe not found', cl: 'warn' },
    { t: 'Starting AngelOS...', cl: '' },
    { t: '', cl: '' },
    { t: '   Welcome, Admin', cl: '' },
    { t: '   Version: AngelOS v1.0.0-stable', cl: '' },
    { t: '   Developer: Angel Salinas Pérez', cl: '' },
    { t: '', cl: '' },
    { t: 'System ready.', cl: 'ok' },
  ];
  
  let bootIdx = 0;
  let bootTimer = null;
  const logEl = document.getElementById('boot-log');
  const barEl = document.getElementById('boot-bar');

  function showLogin() {
    if (bootTimer) clearTimeout(bootTimer);
    bootTimer = null;
    const boot = document.getElementById('boot-screen');
    boot.classList.add('hidden');
    setTimeout(() => boot.classList.add('gone'), 700);
    document.getElementById('login-screen').classList.remove('hidden');
  }

  function skipBoot() {
    bootIdx = bootMessages.length;
    if (logEl) logEl.innerHTML = '';
    if (barEl) barEl.style.width = '100%';
    window.markBootSkipped();
    showLogin();
  }

  function initBootSkipButton() {
    const boot = document.getElementById('boot-screen');
    if (!boot || boot.querySelector('.boot-skip')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'boot-skip';
    btn.setAttribute('data-i18n', 'ui.skipBoot');
    btn.textContent = window.t('ui.skipBoot');
    btn.addEventListener('click', skipBoot);
    boot.appendChild(btn);
  }

  function bootStep() {
    if (bootIdx >= bootMessages.length) {
      bootTimer = setTimeout(showLogin, 800);
      return;
    }
    const { t, cl } = bootMessages[bootIdx];
    const div = document.createElement('div');
    div.className = 'boot-line' + (cl ? ' ' + cl : '');
    div.textContent = t || '\u00A0';
    div.style.animationDelay = '0ms';
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;

    barEl.style.width = ((bootIdx / bootMessages.length) * 100) + '%';
    bootIdx++;

    const delay = bootIdx < 10 ? 80 : bootIdx < 18 ? 50 : 120;
    bootTimer = setTimeout(bootStep, delay);
  }

  if (window.shouldSkipBoot && window.shouldSkipBoot()) {
    showLogin();
  } else {
    initBootSkipButton();
    bootTimer = setTimeout(bootStep, 600);
  }
  
  // ══════════════════════════════════════════
  //  LOGIN
  // ══════════════════════════════════════════
  document.getElementById('login-btn').addEventListener('click', function() {
    this.textContent = window.t('login.auth');
    this.disabled = true;
    setTimeout(() => {
      const loginScreen = document.getElementById('login-screen');
      loginScreen.classList.add('hidden');
      setTimeout(() => loginScreen.classList.add('gone'), 700);

      const savedLang = window.getSavedLanguage && window.getSavedLanguage();
      if (savedLang) window.applyLanguage(savedLang);
      window.showLangScreen();
    }, 800);
  });

  function enterDesktop() {
    document.getElementById('desktop-screen').classList.remove('hidden');
    startMatrixRain();
    startClock();
    if (window.initDesktopIconUX) window.initDesktopIconUX();
    setTimeout(() => showNotif(window.t('notif.welcome')), 500);
  }
  

  // ══════════════════════════════════════════
  //  LANGUAGE SELECTION
  // ══════════════════════════════════════════
  document.getElementById('lang-btn').addEventListener('click', function() {
    const selectedLang = document.querySelector('input[name="lang"]:checked').value;
    window.applyLanguage(selectedLang);
    window.hideLangScreen();
    const desktop = document.getElementById('desktop-screen');
    if (desktop.classList.contains('hidden')) {
      enterDesktop();
    } else {
      showNotif(window.t('notif.langChanged'));
    }
  });

  function openLanguagePicker() {
    window.showLangScreen();
  }
  window.openLanguagePicker = openLanguagePicker;

  // ══════════════════════════════════════════
  //  MATRIX RAIN
  // ══════════════════════════════════════════
  let matrixRainInterval = null;

  function startMatrixRain() {
    if (!window.motionAllowed()) return;
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = 'アイウエオカキクケコ01ABCDEF#$%@!<>{}';
    let cols = 0;
    let drops = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / 20);
      drops = Array(cols).fill(1);
    }

    resizeCanvas();
    if (matrixRainInterval) clearInterval(matrixRainInterval);

    matrixRainInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = '15px Share Tech Mono';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 60);

    if (!canvas._rainResizeBound) {
      canvas._rainResizeBound = true;
      window.addEventListener('resize', resizeCanvas);
    }
  }
  
  // ══════════════════════════════════════════
  //  CLOCK
  // ══════════════════════════════════════════
  function startClock() {
    const t = document.getElementById('clock-time');
    const d = document.getElementById('clock-date');
    function tick() {
      const now = new Date();
      t.textContent = now.toLocaleTimeString(window._osLang === 'es' ? 'es-MX' : 'en-US', { hour12: false });
      d.textContent = now.toLocaleDateString(window._osLang === 'es' ? 'es-MX' : 'en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
    tick();
    setInterval(tick, 1000);
  }
  
  // ══════════════════════════════════════════
  //  WINDOW SYSTEM
  // ══════════════════════════════════════════
  window.windows = {};
  const windows = window.windows;
  let zTop = 50;
  
  const windowDefs = window.windowDefs = {
    about: {
      title: () => window.t('win.about.title'),
      width: 600, height: 520,
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
        <div style="margin-top:16px;padding:16px;background:var(--bg3);border-left:2px solid var(--green);font-size:12px;color:var(--text-dim);line-height:1.8">
          <span class="prompt">angel@angelos:~$ </span><span class="cmd">cat about.txt</span><br><br>
          <span class="out">${window.t('about.bio')}</span>
        </div>
      `
    },
  
    projects: {
      title: () => window.t('win.projects.title'),
      width: 700, height: 580,
      content: () => `
        <div class="section-title">// LS -LA ~/projects</div>
        <div class="project-list">
          <div class="project-card">
            <h3>WhyAI</h3>
            <p>${window.t('proj.whyai.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">JavaScript</span><span class="tag">WebAI</span><span class="tag">Browser</span><span class="tag">Privacy</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/WhyAI" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://why-ia.vercel.app/" target="_blank">[ Demo ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Bio3D</h3>
            <p>${window.t('proj.bio3d.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">WebGL</span><span class="tag">HandTracking</span><span class="tag">Three.js</span><span class="tag">ML</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/Bio3D" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://angeldev2343.github.io/Bio3D/" target="_blank">[ Demo ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Cerimex</h3>
            <p>${window.t('proj.cerimex.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">PHP</span><span class="tag">MySQL</span><span class="tag">JS</span><span class="tag">E-commerce</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/Cerimex" target="_blank">[ GitHub ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Twin Messenger</h3>
            <p>${window.t('proj.twin.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">Node.js</span><span class="tag">WebSockets</span><span class="tag">Retro</span><span class="tag">PHP</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/TwinMessenger" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://twin-messenger.great-site.net/" target="_blank">[ Demo ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Fender</h3>
            <p>${window.t('proj.fender.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">Python</span><span class="tag">Django</span><span class="tag">JS</span><span class="tag">UI/UX</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/Fender" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://angeldev2343.pythonanywhere.com/" target="_blank">[ Demo ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>FlutterTool</h3>
            <p>${window.t('proj.flutter.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">Windows</span><span class="tag">Batch</span><span class="tag">Flutter</span><span class="tag">Automation</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/releases/download/v1.0/FlutterTool.bat" target="_blank">${window.t('proj.btn.download')}</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Digital Piano</h3>
            <p>${window.t('proj.piano.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">JavaScript</span><span class="tag">HTML</span><span class="tag">CSS</span><span class="tag">Audio</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/DigitalPiano" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://AngelDev2343.github.io/DigitalPiano/index.html" target="_blank">[ Demo ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>MarketplaceOnly</h3>
            <p>${window.t('proj.market.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">Android</span><span class="tag">Kotlin</span><span class="tag">WebView</span><span class="tag">Privacy</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly/releases/download/1.1_Signed/MarketPlaceOnly-Signed.apk" target="_blank">${window.t('proj.btn.apk')}</a>
            </div>
          </div>
          <div class="project-card">
            <h3>MitosisVR</h3>
            <p>${window.t('proj.mitosis.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">Godot 4</span><span class="tag">VR</span><span class="tag">3D</span><span class="tag">Educativo</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/MitosisVR" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://mitosis1.netlify.app/main.html" target="_blank">${window.t('proj.btn.try')}</a>
            </div>
          </div>
          <div class="project-card">
            <h3>DevOS</h3>
            <p>${window.t('proj.devos.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">Linux</span><span class="tag">Fedora</span><span class="tag">XFCE</span><span class="tag">Live OS</span><span class="tag">AI</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/DevOS" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Live_v1.0/DevOS-Live_v1.0.iso" target="_blank">${window.t('proj.btn.iso')}</a>
            </div>
          </div>
          <div class="project-card">
            <h3>EmuNAV</h3>
            <p>${window.t('proj.emunav.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">WebAssembly</span><span class="tag">Emulator</span><span class="tag">JavaScript</span><span class="tag">Browser</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/EmuNAV/" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://angeldev2343.github.io/EmuNAV/" target="_blank">${window.t('proj.btn.try')}</a>
            </div>
          </div>
          <div class="project-card">
            <h3>NavaScript</h3>
            <p>${window.t('proj.nava.desc')}</p>
            <div style="margin-bottom:10px">
              <span class="tag">Language</span><span class="tag">Interpreter</span><span class="tag">IDE</span><span class="tag">JavaScript</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/NavaScript" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://AngelDev2343.github.io/NavaScript" target="_blank">${window.t('proj.btn.ide')}</a>
            </div>
          </div>
        </div>
      `
    },
  
    skills: {
      title: () => window.t('win.skills.title'),
      width: 580, height: 500,
      content: () => `
        <div class="section-title">// STACK --list-all</div>
        <div style="margin-bottom:16px;font-size:12px;color:var(--text-dim)">
          <span class="prompt">angel@angelos:~$ </span><span class="cmd">query stack WHERE level > 0</span>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.frontend')}</div>
        <div class="skills-grid" style="margin-bottom:20px">
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/html.png" width="26px"></span>HTML5</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/css.png" width="26px"></span>CSS3</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/js.png" width="26px"></span>JavaScript</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/icons-kotlin.png" width="26px"></span>Kotlin</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/icons-flutter.png" width="26px"></span>Flutter</div>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.backend')}</div>
        <div class="skills-grid" style="margin-bottom:20px">
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/python.png" width="26px"></span>Python</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/apps/navascript.png" width="26px"></span>NavaScript</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/node.png" width="26px"></span>Node.js</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/php.png" width="26px"></span>PHP</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/django.webp" width="26px"></span>Django</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/icons-dart.png" width="26px"></span>Dart</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/icons-bash.png" width="26px"></span>Bash</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/icons-godot.png" width="26px"></span>GDScript</div>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.databases')}</div>
        <div class="skills-grid" style="margin-bottom:20px">
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/MySQL.png" width="26px"></span>MySQL</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/mongodb.png" width="30px"></span>MongoDB</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/phpmyadmin.png" width="30px"></span>phpMyAdmin</div>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">${window.t('skills.tools')}</div>
        <div class="skills-grid">
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/visual.png" width="30px"></span>VS Code</div>
          <div class="skill-badge"><span class="sk-icon"><img src="gifs/github.gif" width="30px" style="border-radius: 50%"></span>Git/GitHub</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/xampp.png" width="30px"></span>XAMPP</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/filezilla.png" width="30px"></span>FileZilla</div>
          <div class="skill-badge"><span class="sk-icon"><img src="imagenes/icons8-fedora-100.png" width="30px"></span>Fedora Linux</div>
        </div>
      `
    },
  
    contact: {
      title: () => window.t('win.contact.title'),
      width: 480, height: 400,
      content: () => `
        <div class="section-title">// CONTACT --help</div>
        <div style="font-size:12px;color:var(--text-dim);margin-bottom:20px">
          <span class="prompt">angel@angelos:~$ </span><span class="cmd">./contact.sh --list</span>
        </div>
        <div class="contact-item" onclick="copyEmail()">
          <div class="contact-icon"><img src="imagenes/email.png" width="25px" style="border-radius: 50%"></div>
          <div class="contact-info">
            <label>Email</label>
            <span>23angelsperez@gmail.com</span>
          </div>
          <span style="font-size:11px;color:var(--text-muted);margin-left:auto">${window.t('contact.copy')}</span>
        </div>
        <div class="contact-item" onclick="window.open('https://github.com/AngelDev2343','_blank')">
          <div class="contact-icon"><img src="gifs/github.gif" width="25px" style="border-radius: 50%"></div>
          <div class="contact-info">
            <label>GitHub</label>
            <span>github.com/AngelDev2343</span>
          </div>
          <span style="font-size:11px;color:var(--text-muted);margin-left:auto">${window.t('contact.open')}</span>
        </div>
        <div class="contact-item" onclick="window.open('https://www.instagram.com/angl.perz/','_blank')">
          <div class="contact-icon"><img src="imagenes/social.png" width="25px" style="border-radius: 50%"></div>
          <div class="contact-info">
            <label>Instagram</label>
            <span>@angl.perz</span>
          </div>
          <span style="font-size:11px;color:var(--text-muted);margin-left:auto">${window.t('contact.open')}</span>
        </div>
        <div style="margin-top:24px;padding:16px;background:var(--bg3);border:1px solid var(--border);font-size:12px;color:var(--text-dim);line-height:1.8">
          <span class="hi">${window.t('contact.cta.title')}</span><br>${window.t('contact.cta.body')}
        </div>
      `
    },
  
    terminal: {
      title: () => window.t('win.terminal.title'),
      width: 620, height: 420,
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
          <span class="out">  <span class="hi">matrix</span>    ${window.t('term.cmd.matrix')}</span><br>
          <span class="out">  <span class="hi">rain</span>      ${window.t('term.cmd.rain')}</span><br><br>
        </div>
        <div class="terminal-input-line">
          <span class="prompt">angel@angelos:~$ </span>
          <input type="text" class="terminal-input" id="term-input" autofocus autocomplete="off" spellcheck="false">
          <span class="cursor-blink"></span>
        </div>
      `,
      onOpen: () => {
        setTimeout(() => {
          const inp = document.getElementById('term-input');
          if (!inp) return;
          if (inp._termHandler) inp.removeEventListener('keydown', inp._termHandler);
          inp._termHandler = handleTerminalInput;
          inp.focus();
          inp.addEventListener('keydown', inp._termHandler);
        }, 100);
      }
    },
  
    whyai: {
      title: () => 'WhyAI — AI in the Browser',
      width: 600, height: 500,
      content: () => `
        <div class="section-title">// WhyAI — README.md</div>
        <div class="preview-browser">
          <div class="preview-chrome">
            <div class="preview-dot" style="background:#ff5555"></div>
            <div class="preview-dot" style="background:#ffaa00"></div>
            <div class="preview-dot" style="background:#00ff41"></div>
            <div class="preview-url">why-ia.vercel.app</div>
          </div>
                <video 
                  src="media/whyai.mp4"
                  style="width: 100%; height: 100%; object-fit: cover; display: block;"
                  autoplay
                  loop
                  muted
                  playsinline>
                </video>
        </div>
        <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          ${window.t('proj.whyai.desc')}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <a class="project-link" href="https://github.com/AngelDev2343/WhyAI" target="_blank">[ GitHub ]</a>
          <a class="project-link" href="https://why-ia.vercel.app/" target="_blank">[ Demo ]</a>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag">JavaScript</span><span class="tag">WebAI</span><span class="tag">Privacy-First</span><span class="tag">No-Install</span>
        </div>
      `
    },
  
    bio3d: {
      title: () => 'Bio3D — Gesture 3D Viewer',
      width: 600, height: 500,
      content: () => `
        <div class="section-title">// Bio3D — README.md</div>
        <div class="preview-browser">
          <div class="preview-chrome">
            <div class="preview-dot" style="background:#ff5555"></div>
            <div class="preview-dot" style="background:#ffaa00"></div>
            <div class="preview-dot" style="background:#00ff41"></div>
            <div class="preview-url">angeldev2343.github.io/Bio3D/</div>
          </div>
                <video 
                  src="media/bio3d.mp4"
                  style="width: 100%; height: 100%; object-fit: cover; display: block;"
                  autoplay
                  loop
                  muted
                  playsinline>
                </video>
          </div>
        <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          ${window.t('proj.bio3d.desc')}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <a class="project-link" href="https://github.com/AngelDev2343/Bio3D" target="_blank">[ GitHub ]</a>
          <a class="project-link" href="https://angeldev2343.github.io/Bio3D/" target="_blank">[ Demo ]</a>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag">WebGL</span><span class="tag">Three.js</span><span class="tag">MediaPipe</span><span class="tag">Hand Tracking</span>
        </div>
      `
    },
  
    cerimex: {
      title: () => 'Cerimex — Online Store',
      width: 600, height: 500,
      content: () => `
        <div class="section-title">// Cerimex — README.md</div>
        <div class="preview-browser">
          <div class="preview-chrome">
            <div class="preview-dot" style="background:#ff5555"></div>
            <div class="preview-dot" style="background:#ffaa00"></div>
            <div class="preview-dot" style="background:#00ff41"></div>
            <div class="preview-url">cerimex.local / tienda</div>
          </div>
                  ${window.previewVideo('media/cerimex.webm', 280)}
          </div>
        <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          ${window.t('proj.cerimex.desc')}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <a class="project-link" href="https://github.com/AngelDev2343/Cerimex" target="_blank">[ GitHub ]</a>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag">PHP</span><span class="tag">MySQL</span><span class="tag">JavaScript</span><span class="tag">Chatbot</span>
        </div>
      `
    },
  
    twin: {
      title: () => 'Twin Messenger — MSN Reborn',
      width: 600, height: 500,
      content: () => `
          <div class="section-title">// Twin Messenger — README.md</div>
          <div class="preview-browser">
          <div class="preview-chrome">
              <div class="preview-dot" style="background:#ff5555"></div>
              <div class="preview-dot" style="background:#ffaa00"></div>
              <div class="preview-dot" style="background:#00ff41"></div>
              <div class="preview-url">twin-messenger.great-site.net</div>
          </div>
          ${window.previewVideo('media/twin.webm', 280)}
          </div>
  
          <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          ${window.t('proj.twin.desc')}
          </div>
  
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <a class="project-link" href="https://github.com/AngelDev2343/TwinMessenger" target="_blank">[ GitHub ]</a>
          <a class="project-link" href="https://twin-messenger.great-site.net/" target="_blank">[ Demo ]</a>
          </div>
  
          <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag">Node.js</span><span class="tag">WebSockets</span><span class="tag">PHP</span><span class="tag">Retro UI</span>
          </div>
      `
      },
  
      fender: {
          title: () => 'Fender — Guitar Store Clone',
          width: 600, height: 500,
          content: () => `
              <div class="section-title">// Fender — README.md</div>
              <div class="preview-browser">
              <div class="preview-chrome">
                  <div class="preview-dot" style="background:#ff5555"></div>
                  <div class="preview-dot" style="background:#ffaa00"></div>
                  <div class="preview-dot" style="background:#00ff41"></div>
                  <div class="preview-url">angeldev2343.pythonanywhere.com</div>
              </div>
              ${window.previewVideo('media/fender.webm', 280)}
              </div>
  
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
              ${window.t('proj.fender.desc')}
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
              <a class="project-link" href="https://github.com/AngelDev2343/Fender" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://angeldev2343.pythonanywhere.com/" target="_blank">[ Demo ]</a>
              </div>
  
              <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span class="tag">Python</span><span class="tag">Django</span><span class="tag">JavaScript</span><span class="tag">UI/UX</span>
              </div>
          `
      
      },
  
      fluttertool: {
          title: () => 'FlutterTool',
          width: 650, height: 520,
          content: () => `
              <div class="section-title">// FlutterTool — README.md</div>
              <div class="preview-browser">
              <div class="preview-chrome">
                  <div class="preview-dot" style="background:#ff5555"></div>
                  <div class="preview-dot" style="background:#ffaa00"></div>
                  <div class="preview-dot" style="background:#00ff41"></div>
                  <div class="preview-url">github.com/AngelDev2343/FlutterTool</div>
              </div>
              <img src="imagenes/previews/fluttertool.png" style="width: 100%; height: auto; min-height: 300px;">
              </div>
  
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
              ${window.t('proj.flutter.desc')}
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/releases/download/v1.0/FlutterTool.bat" target="_blank">${window.t('proj.btn.download')}</a>
              </div>
  
              <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span class="tag">Windows</span>
              <span class="tag">Batch</span>
              <span class="tag">Flutter</span>
              <span class="tag">Android SDK</span>
              <span class="tag">Automation</span>
              </div>
          `
      },
  
      digitalpiano: {
          title: () => 'Digital Piano — Web Instrument',
          width: 1100, height: 700,
          content: () => `
              <div class="section-title">// Digital Piano — README.md</div>
              <div class="preview-browser">
              <div class="preview-chrome">
                  <div class="preview-dot" style="background:#ff5555"></div>
                  <div class="preview-dot" style="background:#ffaa00"></div>
                  <div class="preview-dot" style="background:#00ff41"></div>
                  <div class="preview-url">angeldev2343.github.io / digital-piano</div>
              </div>
  
                      <div style="width:100%; aspect-ratio:16/9; overflow:hidden; border-radius:6px;">
                          <iframe 
                              src="https://AngelDev2343.github.io/DigitalPiano/index.html"
                              style="width:100%; height:100%; border:none; display:block;"
                              sandbox="allow-scripts allow-same-origin"
                              scrolling="no">
                          </iframe>
                      </div>
              </div>
  
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
              ${window.t('proj.piano.desc')}
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
              <a class="project-link" href="https://github.com/AngelDev2343/DigitalPiano" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://AngelDev2343.github.io/DigitalPiano/index.html" target="_blank">[ Demo ]</a>
              </div>
  
              <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span class="tag">JavaScript</span>
              <span class="tag">HTML</span>
              <span class="tag">CSS</span>
              <span class="tag">Audio</span>
              <span class="tag">Frontend</span>
              </div>
          `
      },
  
      marketplaceonly: {
          title: () => 'MarketplaceOnly — Focused Marketplace App',
          width: 600, height: 500,
          content: () => `
              <div class="section-title">// MarketplaceOnly — README.md</div>
              <div class="preview-browser">
                  <div class="preview-chrome">
                      <div class="preview-dot" style="background:#ff5555"></div>
                      <div class="preview-dot" style="background:#ffaa00"></div>
                      <div class="preview-dot" style="background:#00ff41"></div>
                      <div class="preview-url">android / facebook marketplace only</div>
                  </div>
  
                  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">
                      <img src="imagenes/previews/market-1.png" style="width:100%;border-radius:4px;">
                      <img src="imagenes/previews/market-2.png" style="width:100%;border-radius:4px;">
                      <img src="imagenes/previews/market-3.png" style="width:100%;border-radius:4px;">
                      <img src="imagenes/previews/market-4.png" style="width:100%;border-radius:4px;">
                  </div>
              </div>
  
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                  ${window.t('proj.market.desc')}
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                  <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly" target="_blank">[ GitHub ]</a>
                  <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly/releases/download/1.1_Signed/MarketPlaceOnly-Signed.apk" target="_blank">${window.t('proj.btn.apk')}</a>
              </div>
  
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                  <span class="tag">Android</span>
                  <span class="tag">Kotlin</span>
                  <span class="tag">WebView</span>
                  <span class="tag">No Ads</span>
                  <span class="tag">Privacy</span>
              </div>
          `
      },

      mitosisvr: {
          title: () => 'Mitosis VR — Immersive Biology Experience',
          width: 600, height: 500,
          content: () => `
              <div class="section-title">// Mitosis VR — README.md</div>
              <div class="preview-browser">
                  <div class="preview-chrome">
                      <div class="preview-dot" style="background:#ff5555"></div>
                      <div class="preview-dot" style="background:#ffaa00"></div>
                      <div class="preview-dot" style="background:#00ff41"></div>
                      <div class="preview-url">mitosis1.netlify.app / vr experience</div>
                  </div>
      
                  <div style="width:100%; aspect-ratio:16/9; overflow:hidden;">
                      <video 
                          src="media/mitosisvr.mp4"
                          style="width: 100%; height: 100%; object-fit: cover; display: block;"
                          autoplay
                          loop
                          muted
                          playsinline>
                      </video>
                  </div>
              </div>
      
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                  ${window.t('proj.mitosis.desc')}
              </div>
      
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                  <a class="project-link" href="https://github.com/AngelDev2343/MitosisVR" target="_blank">[ GitHub ]</a>
                  <a class="project-link" href="https://mitosis1.netlify.app/main.html" target="_blank">${window.t('proj.btn.try')}</a>
              </div>
      
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                  <span class="tag">Godot 4</span>
                  <span class="tag">VR</span>
                  <span class="tag">Web</span>
                  <span class="tag">3D</span>
                  <span class="tag">Educativo</span>
              </div>
          `
      },

    devos: {
        title: () => 'DevOS — AI Powered Linux Live',
        width: 650, height: 520,
        content: () => `
            <div class="section-title">// DevOS — README.md</div>
            <div class="preview-browser">
                <div class="preview-chrome">
                    <div class="preview-dot" style="background:#ff5555"></div>
                    <div class="preview-dot" style="background:#ffaa00"></div>
                    <div class="preview-dot" style="background:#00ff41"></div>
                    <div class="preview-url">github.com / DevOS Live ISO</div>
                </div>
    
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">
                    <img src="imagenes/previews/devos-1.png" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                    <img src="imagenes/previews/devos-2.png" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                    <img src="imagenes/previews/devos-3.png" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                    <img src="imagenes/previews/devos-4.png" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                </div>
            </div>
    
            <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                ${window.t('proj.devos.desc')}
            </div>
    
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                <a class="project-link" href="https://github.com/AngelDev2343/DevOS" target="_blank">[ GitHub ]</a>
                <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Live_v1.0/DevOS-Live_v1.0.iso" target="_blank">${window.t('proj.btn.iso')}</a>
                <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Build_Kit_v1.0/devos-build-kit-en-final.zip" target="_blank">${window.t('proj.btn.buildkit')}</a>
            </div>
    
            <div style="display:flex;gap:6px;flex-wrap:wrap">
                <span class="tag">Linux</span>
                <span class="tag">Fedora</span>
                <span class="tag">XFCE</span>
                <span class="tag">Live OS</span>
                <span class="tag">AI</span>
            </div>
        `
    },

    emunav: {
        title: () => 'EmuNav — Nintendo DS Web Emulator',
        width: 650, height: 520,
        content: () => `
            <div class="section-title">// EmuNav — README.md</div>
            <div class="preview-browser">
                <div class="preview-chrome">
                    <div class="preview-dot" style="background:#ff5555"></div>
                    <div class="preview-dot" style="background:#ffaa00"></div>
                    <div class="preview-dot" style="background:#00ff41"></div>
                    <div class="preview-url">angeldev2343.github.io / emunav</div>
                </div>
    
                <img src="imagenes/previews/emunav.png" style="width: 100%; height: auto; min-height: 400px;">
            </div>
    
            <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                ${window.t('proj.emunav.desc')}
            </div>
    
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                <a class="project-link" href="https://github.com/AngelDev2343/EmuNAV/" target="_blank">[ GitHub ]</a>
                <a class="project-link" href="https://angeldev2343.github.io/EmuNAV/" target="_blank">${window.t('proj.btn.try')}</a>
            </div>
    
            <div style="display:flex;gap:6px;flex-wrap:wrap">
                <span class="tag">WebAssembly</span>
                <span class="tag">Emulator</span>
                <span class="tag">JavaScript</span>
                <span class="tag">Frontend</span>
                <span class="tag">Browser</span>
            </div>
        `
    },

    navascript: {
        title: () => 'NavaScript — Custom Programming Language',
        width: 650, height: 520,
        content: () => `
            <div class="section-title">// NavaScript — README.md</div>
            <div class="preview-browser">
                <div class="preview-chrome">
                    <div class="preview-dot" style="background:#ff5555"></div>
                    <div class="preview-dot" style="background:#ffaa00"></div>
                    <div class="preview-dot" style="background:#00ff41"></div>
                    <div class="preview-url">angeldev2343.github.io / navascript</div>
                </div>
    
                    <img src="imagenes/previews/navascript.png" style="width:100%;border-radius:0px;object-fit:cover;aspect-ratio:16/9;">

            </div>
    
            <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                ${window.t('proj.nava.desc')}
            </div>
    
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                <a class="project-link" href="https://AngelDev2343.github.io/NavaScript" target="_blank">${window.t('proj.btn.ide')}</a>
                <a class="project-link" href="https://github.com/AngelDev2343/NavaScript" target="_blank">[ GitHub ]</a>
            </div>
    
            <div style="display:flex;gap:6px;flex-wrap:wrap">
                <span class="tag">Language</span>
                <span class="tag">Interpreter</span>
                <span class="tag">IDE</span>
                <span class="tag">JavaScript</span>
                <span class="tag">Experimental</span>
            </div>
        `
    },

    arcade: {
        title: () => 'Angel Dev Arcade',
        width: 1280, height: 720,
        content: () => `<iframe 
            src="https://angelsperez.github.io/Angel-Dev-Arcade/"
            style="width:100%; height:100%; border:none; display:block;"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
            loading="lazy">
        </iframe>`
    },

    kid: {
        title: () => '777.exe - A Windows Virus',
        width: 650, height: 520,
        content: () => `
                <div style="display:flex;flex-direction:column;height:100%;gap:8px">
                <div class="section-title">777.exe - VIRUS</div>
                <p style="font-size:11px;color:var(--text-dim);line-height:1.6;flex-shrink:0">${window.t('proj.kid.desc')}</p>
                <iframe style="flex:1;min-height:240px;width:100%;border:none" src="https://www.youtube.com/embed/iqOfGm2izQk?si=cQIfspLSQzluO20P" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
        `
    },

    music: {
        title: () => 'AngelOS Music Player',
        width: 650, height: 480,
        content: () => ` 
                <div class="section-title">AngelOS Music Player</div>
                <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6wnYRpQE9GMFk2WF8kc5AT?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        `
    }
  
  };
  
  function openWindow(id) {
    const def = windowDefs[id];
    if (!def) return;
  
    if (windows[id]) {
      const win = windows[id];
      win.classList.remove('minimized');
      win.classList.add('focused');
      bringToFront(win);
      updateTaskbar();
      return;
    }
  
    const desktop = document.getElementById('desktop-area');
    const win = document.createElement('div');
    win.className = 'window focused';
    win.dataset.id = id;
  
    const offset = Object.keys(windows).length;
    const x = 80 + (offset % 5) * 30;
    const y = 40 + (offset % 4) * 30;
  
    win.style.left = x + 'px';
    win.style.top  = y + 'px';
    win.style.width  = def.width + 'px';
    win.style.height = def.height + 'px';
  
    win.innerHTML = `
      <div class="window-titlebar">
        <div class="window-controls">
          <div class="wc wc-close" onclick="closeWindow('${id}')"></div>
          <div class="wc wc-min"   onclick="minimizeWindow('${id}')"></div>
          <div class="wc wc-max"   onclick="maximizeWindow('${id}')"></div>
        </div>
        <div class="window-title">${typeof def.title === 'function' ? def.title() : def.title}</div>
      </div>
      <div class="window-body">${def.content()}</div>
      <div class="window-resize"></div>
    `;
  
    desktop.appendChild(win);
    windows[id] = win;
    bringToFront(win);
    makeDraggable(win);
    makeResizable(win);
    updateTaskbar();
  
    defocusAll();
    win.classList.add('focused');
  
    if (def.onOpen) def.onOpen();
    if (window.secureExternalLinks) window.secureExternalLinks(win);
    if (window.initIframeLoaders) window.initIframeLoaders(win);
  }
  
  function closeWindow(id) {
    const win = windows[id];
    if (!win) return;
    win.remove();
    delete windows[id];
    updateTaskbar();
  }
  
  function minimizeWindow(id) {
    const win = windows[id];
    if (!win) return;
    win.classList.add('minimized');
    win.classList.remove('focused');
    updateTaskbar();
  }
  
  function maximizeWindow(id) {
    const win = windows[id];
    if (!win) return;
    const desktop = document.getElementById('desktop-area');
    const isMax = win.dataset.maximized === '1';
    if (isMax) {
      win.style.left   = win.dataset.prevLeft;
      win.style.top    = win.dataset.prevTop;
      win.style.width  = win.dataset.prevW;
      win.style.height = win.dataset.prevH;
      win.dataset.maximized = '0';
    } else {
      win.dataset.prevLeft = win.style.left;
      win.dataset.prevTop  = win.style.top;
      win.dataset.prevW    = win.style.width;
      win.dataset.prevH    = win.style.height;
      win.style.left   = '0';
      win.style.top    = '0';
      win.style.width  = desktop.clientWidth + 'px';
      win.style.height = desktop.clientHeight + 'px';
      win.dataset.maximized = '1';
    }
  }
  
  function bringToFront(win) {
    zTop++;
    win.style.zIndex = zTop;
  }
  
  function defocusAll() {
    Object.values(windows).forEach(w => w.classList.remove('focused'));
  }
  
  document.getElementById('desktop-area').addEventListener('mousedown', function(e) {
    if (e.target === this || e.target.classList.contains('desktop-area')) {
      defocusAll();
      closeStartMenu();
      document.getElementById('ctx-menu').classList.remove('show');
    }
  });
  
  function updateTaskbar() {
    const bar = document.getElementById('taskbar-apps');
    bar.innerHTML = '';
    Object.entries(windows).forEach(([id, win]) => {
      const def = windowDefs[id];
      const btn = document.createElement('button');
      btn.className = 'taskbar-app-btn' + (win.classList.contains('focused') && !win.classList.contains('minimized') ? ' active' : '');
      const winTitle = def ? (typeof def.title === 'function' ? def.title() : def.title) : id;
      btn.textContent = winTitle.split(' — ')[0];
      btn.onclick = () => {
        if (win.classList.contains('minimized')) {
          win.classList.remove('minimized');
          defocusAll();
          win.classList.add('focused');
          bringToFront(win);
        } else if (win.classList.contains('focused')) {
          minimizeWindow(id);
        } else {
          defocusAll();
          win.classList.add('focused');
          bringToFront(win);
        }
        updateTaskbar();
      };
      bar.appendChild(btn);
    });
  }
  
  // ══════════════════════════════════════════
  //  DRAG & RESIZE
  // ══════════════════════════════════════════
  function makeDraggable(win) {
    const titlebar = win.querySelector('.window-titlebar');
    let dragging = false, startX, startY, startL, startT;
  
    titlebar.addEventListener('mousedown', e => {
      if (e.target.classList.contains('wc')) return;
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      startL = parseInt(win.style.left) || 0;
      startT = parseInt(win.style.top)  || 0;
      defocusAll();
      win.classList.add('focused');
      bringToFront(win);
      updateTaskbar();
      e.preventDefault();
    });
  
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      const desktop = document.getElementById('desktop-area');
      const maxL = Math.max(0, desktop.clientWidth - win.offsetWidth);
      const maxT = Math.max(0, desktop.clientHeight - win.offsetHeight);
      win.style.left = Math.max(0, Math.min(maxL, startL + e.clientX - startX)) + 'px';
      win.style.top  = Math.max(0, Math.min(maxT, startT + e.clientY - startY)) + 'px';
    });
  
    document.addEventListener('mouseup', () => { dragging = false; });
  
    win.addEventListener('mousedown', () => {
      if (!win.classList.contains('focused')) {
        defocusAll();
        win.classList.add('focused');
        bringToFront(win);
        updateTaskbar();
      }
    });
  }
  
  function makeResizable(win) {
    const handle = win.querySelector('.window-resize');
    let resizing = false, startX, startY, startW, startH;
  
    handle.addEventListener('mousedown', e => {
      resizing = true;
      startX = e.clientX; startY = e.clientY;
      startW = win.offsetWidth; startH = win.offsetHeight;
      e.preventDefault(); e.stopPropagation();
    });
  
    document.addEventListener('mousemove', e => {
      if (!resizing) return;
      const newW = Math.max(300, startW + e.clientX - startX);
      const newH = Math.max(200, startH + e.clientY - startY);
      win.style.width  = newW + 'px';
      win.style.height = newH + 'px';
    });
  
    document.addEventListener('mouseup', () => { resizing = false; });
  }
  
  // ══════════════════════════════════════════
  //  TERMINAL RAIN
  // ══════════════════════════════════════════
  function startTermRain(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01ABCDEF#$%@!<>{}[]|/\\';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(0).map(() => Math.random() * -50);

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px "Share Tech Mono", monospace';
      drops.forEach((y, i) => {
        const bright = Math.random() > 0.95;
        ctx.fillStyle = bright ? '#afffaf' : '#00ff41';
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5 + Math.random() * 0.5;
      });
    }

    const raf = { id: null };
    function loop() { draw(); raf.id = requestAnimationFrame(loop); }
    loop();

    canvas._rainStop = () => {
      cancelAnimationFrame(raf.id);
      canvas._rainStop = null;
    };
  }

  // ══════════════════════════════════════════
  //  TERMINAL LOGIC
  // ══════════════════════════════════════════
  function handleTerminalInput(e) {
    if (e.key !== 'Enter') return;
    const inp = document.getElementById('term-input');
    const out = document.getElementById('term-out');
    const cmd = inp.value.trim().toLowerCase();
    inp.value = '';
  
    const line = document.createElement('div');
    line.innerHTML = `<span class="prompt">angel@angelos:~$ </span><span class="cmd">${window.escapeHtml(cmd)}</span>`;
    out.appendChild(line);
  
    const res = document.createElement('div');
    res.style.marginBottom = '8px';
  
    const responses = {
      whoami:   () => `<span class="out">${window.t('term.res.whoami')}</span>`,
      projects: () => `<span class="out">${window.t('term.res.projects')}</span>`,
      skills:   () => `<span class="out">${window.t('term.res.skills')}</span>`,
      contact:  () => `<span class="out">${window.t('term.res.contact')}</span>`,
      github:   () => `<span class="out">${window.t('term.res.github')}</span>`,
      clear:    () => `__CLEAR__`,
      matrix:   () => `<span class="warn-t">${window.t('term.res.matrix')}</span>`,
      sudo:     () => `<span class="warn-t">${window.t('term.res.sudo')}</span>`,
      ls:       () => `<span class="out">${window.t('term.res.ls')}</span>`,
      pwd:      () => `<span class="out">/home/angel/portfolio</span>`,
      date:     () => `<span class="out">${new Date().toLocaleString(window._osLang === 'es' ? 'es-MX' : 'en-US')}</span>`,
      help:     () => `<span class="out">${window.t('term.help.list')}</span>`,
      rain:     () => `__RAIN__`,
      '':       () => `<span class="out"></span>`
    };
  
    if (cmd === 'clear') {
      out.innerHTML = '';
    } else if (cmd === 'rain') {
      // Remove any existing rain
      const existingRain = out.querySelector('.term-rain-wrap');
      if (existingRain) existingRain.remove();

      const rainId = 'term-rain-' + Date.now();
      const wrap = document.createElement('div');
      wrap.className = 'term-rain-wrap';
      wrap.style.cssText = 'position:relative;margin-bottom:8px;';

      const canvas = document.createElement('canvas');
      canvas.id = rainId;
      canvas.style.cssText = 'display:block;width:100%;height:160px;border:1px solid var(--border);border-radius:4px;background:#000;';

      const btn = document.createElement('button');
      btn.style.cssText = 'margin-top:6px;background:transparent;border:1px solid var(--green);color:var(--green);font-family:inherit;font-size:11px;padding:3px 10px;cursor:pointer;';
      btn.textContent = window.t('term.rain.stop');
      btn.addEventListener('click', function () {
        const c = document.getElementById(rainId);
        if (c._rainStop) {
          c._rainStop();
          this.textContent = window.t('term.rain.start');
        } else {
          startTermRain(rainId);
          this.textContent = window.t('term.rain.stop');
        }
      });

      const status = document.createElement('span');
      status.style.cssText = 'font-size:10px;color:var(--text-muted);margin-left:10px';
      status.textContent = window.t('term.rain.status');

      wrap.appendChild(canvas);
      wrap.appendChild(btn);
      wrap.appendChild(status);
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
      else { res.innerHTML = val; out.appendChild(res); }
    } else {
      res.innerHTML = `<span style="color:#ff4444">${window.t('term.err').replace('{cmd}', window.escapeHtml(cmd))}</span>`;
      out.appendChild(res);
    }
  
    const parent = out.closest('.window-body');
    if (parent) parent.scrollTop = parent.scrollHeight;
  }
  
  // ══════════════════════════════════════════
  //  START MENU
  // ══════════════════════════════════════════
  function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    const btn   = document.getElementById('start-btn');
    const open  = menu.classList.contains('open');
    menu.classList.toggle('open', !open);
    btn.classList.toggle('active', !open);
  }
  
  function closeStartMenu() {
    document.getElementById('start-menu').classList.remove('open');
    document.getElementById('start-btn').classList.remove('active');
  }
  
  // ══════════════════════════════════════════
  //  CONTEXT MENU
  // ══════════════════════════════════════════
  document.getElementById('desktop-area').addEventListener('contextmenu', e => {
    e.preventDefault();
    const menu = document.getElementById('ctx-menu');
    menu.style.left = e.clientX + 'px';
    menu.style.top  = Math.min(e.clientY, window.innerHeight - 180) + 'px';
    menu.classList.add('show');
    closeStartMenu();
  });
  
  document.addEventListener('click', () => {
    document.getElementById('ctx-menu').classList.remove('show');
  });
  
  // ══════════════════════════════════════════
  //  UTILS
  // ══════════════════════════════════════════
  function showNotif(msg) {
    const n = document.getElementById('notif');
    n.textContent = '⬡  ' + msg;
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 3000);
  }
  
  function arrangeWindows() {
    const ids = Object.keys(windows);
    if (!ids.length) return;
    const desktop = document.getElementById('desktop-area');
    const W = desktop.clientWidth / ids.length;
    ids.forEach((id, i) => {
      const win = windows[id];
      win.classList.remove('minimized');
      win.style.left   = (i * W + 10) + 'px';
      win.style.top    = '20px';
      win.style.width  = Math.max(300, W - 20) + 'px';
      win.style.height = (desktop.clientHeight - 40) + 'px';
    });
  }
  
  function closeAll() {
    Object.keys(windows).forEach(id => closeWindow(id));
  }
  
  function reboot() {
    closeStartMenu();
    location.reload();
  }
  
  // ══════════════════════════════════════════
  //  DOUBLE-CLICK KEYBOARD SHORTCUT HINTS
  // ══════════════════════════════════════════
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeStartMenu();
      document.getElementById('ctx-menu').classList.remove('show');
    }
  });
  
  // ══════════════════════════════════════════
  //  DESKTOP ICON TOOLTIPS
  // ══════════════════════════════════════════
  const tooltipEl = document.getElementById('tooltip');

  function showTooltip(e, text) {
    if (!tooltipEl || !text) return;
    tooltipEl.textContent = text;
    tooltipEl.style.left = (e.clientX + 14) + 'px';
    tooltipEl.style.top  = (e.clientY + 14) + 'px';
    tooltipEl.classList.add('show');
  }

  function hideTooltip() {
    if (tooltipEl) tooltipEl.classList.remove('show');
  }

  document.querySelectorAll('.d-icon[data-app]').forEach(icon => {
    const label = icon.dataset.tooltip || icon.querySelector('.d-icon-label')?.textContent?.trim();
    icon.addEventListener('mouseenter', e => showTooltip(e, label));
    icon.addEventListener('mousemove', e => {
      if (!tooltipEl?.classList.contains('show')) return;
      tooltipEl.style.left = (e.clientX + 14) + 'px';
      tooltipEl.style.top  = (e.clientY + 14) + 'px';
    });
    icon.addEventListener('mouseleave', hideTooltip);
  });
