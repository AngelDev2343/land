// ══════════════════════════════════════════
//  AngelOS Mobile — Language / i18n System
//  Standalone script — loaded before mobile.js
// ══════════════════════════════════════════

window._osLang = 'en';

window.LANG = {

  en: {
    // ── Login ──────────────────────────────
    'login.btn':        '[ LOGIN ]',
    'login.auth':       '[ AUTHENTICATING... ]',
    'login.footer':     'AngelOS — Full-Stack Developer',

    // ── Language screen ────────────────────
    'lang.accept':      '[ ACCEPT ]',

    // ── Notifications ──────────────────────
    'notif.welcome':    'Welcome back, Admin',
    'notif.email':      'Email copied to clipboard',

    // ── App: About ─────────────────────────
    'app.about.title':   'about.exe',
    'about.label.name':     'Name',
    'about.label.role':     'Role',
    'about.label.location': 'Location',
    'about.label.email':    'Email',
    'about.label.status':   'Status',
    'about.label.version':  'Version',
    'about.value.role':     'Full-Stack Dev',
    'about.value.location': 'Mexico',
    'about.value.status':   '● Available',
    'about.bio':  "Hi, I'm Ángel. I turn ideas into websites that work and help businesses grow.<br><br>Want to sell online? Got an idea but don't know where to start?<br><br>I make it happen.",

    // ── App: Projects ──────────────────────
    'app.projects.title': 'projects/',
    'proj.whyai.desc':    'AI directly in the browser. Online & offline modes. No registration, no data stored.',
    'proj.bio3d.desc':    '3D viewer controlled by hand gestures from the browser. No plugins.',
    'proj.cerimex.desc':  'Ceramics e-commerce with cart, payments and integrated chatbot.',
    'proj.twin.desc':     'Recreation of MSN Messenger. Real-time messaging, Buzz, sound alerts.',
    'proj.fender.desc':   'Fender store clone with real-time color switching and persistent cart.',
    'proj.flutter.desc':  '.bat script that installs Flutter + Java + Android SDK without admin permissions.',
    'proj.piano.desc':    'Interactive digital piano with 2 octaves and real-time audio.',
    'proj.market.desc':   'Android app for Facebook Marketplace without feed or distractions.',
    'proj.mitosis.desc':  'Educational VR experience in Godot 4 about cell mitosis phases.',
    'proj.devos.desc':    'Fedora-based Linux Live OS developed experimentally with AI (80%).',
    'proj.emunav.desc':   'Web interface to play Nintendo DS games in the browser. No install.',
    'proj.nava.desc':     'Programming language with its own syntax, web IDE and VS Code extension.',
    'proj.btn.download':  '[ Download ]',
    'proj.btn.demo':      '[ Demo ]',
    'proj.btn.try':       '[ Try ]',
    'proj.btn.apk':       '[ APK ]',
    'proj.btn.iso':       '[ ISO ]',
    'proj.btn.ide':       '[ Web IDE ]',

    // ── App: Skills ────────────────────────
    'app.skills.title':   'stack.db',
    'skills.frontend':    '// FRONTEND',
    'skills.backend':     '// BACKEND',
    'skills.databases':   '// DATABASES',
    'skills.tools':       '// TOOLS',

    // ── App: Contact ───────────────────────
    'app.contact.title':  'contact.sh',
    'contact.copy':       '[copy]',
    'contact.open':       '[open →]',
    'contact.cta.title':  'Got a project in mind?',
    'contact.cta.body':   "Tell me your idea and I'll help you make it happen.<br>Available for freelance projects and collaborations.",

    // ── App: Terminal ──────────────────────
    'app.terminal.title': 'terminal',
    'term.help.header':   'Available commands:',
    'term.cmd.whoami':    '— Dev info',
    'term.cmd.projects':  '— List projects',
    'term.cmd.skills':    '— View stack',
    'term.cmd.contact':   '— Contact',
    'term.cmd.github':    '— Open GitHub',
    'term.cmd.clear':     '— Clear',
    'term.cmd.rain':      '— Matrix rain',
    'term.cmd.matrix':    '— ???',
    'term.res.whoami':    'Angel Salinas Pérez — Full-Stack Dev<br>Mexico — 2026',
    'term.res.projects':  '12 projects:<br>WhyAI, Bio3D, Cerimex, Twin,<br>Fender, FlutterTool, Piano,<br>MarketOnly, MitosisVR, DevOS,<br>EmuNAV, NavaScript',
    'term.res.skills':    'HTML5, CSS3, JS, Python, Node.js,<br>PHP, Django, MySQL, MongoDB,<br>Kotlin, Flutter, Bash, GDScript',
    'term.res.contact':   'Email:  23angelsperez@gmail.com<br>GitHub: AngelDev2343<br>IG:     @angl.perz',
    'term.res.github':    'Opening GitHub...',
    'term.res.matrix':    'MATRIX MODE ALREADY ACTIVE.',
    'term.res.sudo':      'No sudo permissions here.',
    'term.res.ls':        'about  projects  skills  contact  terminal',
    'term.help.list':     'whoami, projects, skills, contact, github, ls, pwd, date, clear, matrix, rain',
    'term.err':           "bash: {cmd}: command not found. Type 'help'.",
    'term.rain.active':   'rain.exe active',
    'term.rain.stop':     '[ STOP ]',
    'term.rain.start':    '[ START ]',

    // ── Piano desktop notice ───────────────
    'piano.notice':       '⚠ The full interactive version is available on desktop.',
    'piano.open':         '[ Open Demo ]',

    // ── Project detail descriptions (individual panels) ────────────
    'proj.whyai.detail':   'AI directly in the browser. <span class="hi">Online</span> (cloud) or <span class="hi">offline</span> (local) mode. No signup or installation needed.',
    'proj.bio3d.detail':   'Control 3D models with hand gestures from your webcam. <span class="hi">Open hand</span> = rotate/zoom. <span class="hi">Fist</span> = drag.',
    'proj.cerimex.detail': 'Ceramics e-commerce with catalog, cart, payments and integrated <span class="hi">chatbot</span>. Separate admin panel.',
    'proj.twin.detail':    'Recreation of the classic <span class="hi">MSN Messenger</span>. Real-time with WebSockets, Buzz and multiple chats.',
    'proj.fender.detail':  'Fender store clone with <span class="hi">real-time color switching</span>, Custom Shop and persistent cart.',
    'proj.flutter.detail': '<span class="hi">.bat</span> script that installs <span class="hi">Flutter + Java + Android SDK</span> on Windows without admin permissions.',
    'proj.piano.detail':   'Interactive digital piano with <span class="hi">2 functional octaves</span> and real-time audio playback with <span class="hi">JavaScript Vanilla</span>.<br><br>',
    'proj.market.detail':  'Android app for <span class="hi">Facebook Marketplace</span> without distractions. No feed, no reels — just buying.',
    'proj.mitosis.detail': '<span class="hi">Educational VR</span> experience in Godot 4 about cell mitosis. Supports Google Cardboard.',
    'proj.devos.detail':   'Linux Live based on <span class="hi">Fedora</span>, experimentally developed with <span class="hi">AI (80%)</span>.',
    'proj.emunav.detail':  'Web interface to play <span class="hi">Nintendo DS</span> games in the browser. Based on Desmond DS. No installation.',
    'proj.nava.detail':    'Programming language with <span class="hi">its own syntax</span>, web IDE and VS Code extension.',
  },

  es: {
    // ── Login ──────────────────────────────
    'login.btn':        '[ INGRESAR ]',
    'login.auth':       '[ AUTENTICANDO... ]',
    'login.footer':     'AngelOS — Desarrollador Full-Stack',

    // ── Language screen ────────────────────
    'lang.accept':      '[ ACEPTAR ]',

    // ── Notifications ──────────────────────
    'notif.welcome':    'Bienvenido de vuelta, Admin',
    'notif.email':      'Email copiado al portapapeles',

    // ── App: About ─────────────────────────
    'app.about.title':   'about.exe',
    'about.label.name':     'Nombre',
    'about.label.role':     'Rol',
    'about.label.location': 'Ubicación',
    'about.label.email':    'Email',
    'about.label.status':   'Status',
    'about.label.version':  'Versión',
    'about.value.role':     'Dev Full-Stack',
    'about.value.location': 'México',
    'about.value.status':   '● Disponible',
    'about.bio':  "Hola, soy Ángel. Convierto ideas en páginas web que funcionan y hacen crecer negocios.<br><br>¿Quieres vender por internet? ¿Tienes una idea pero no sabes por dónde empezar?<br><br>Yo me encargo de hacerlo realidad.",

    // ── App: Projects ──────────────────────
    'app.projects.title': 'projects/',
    'proj.whyai.desc':    'IA directo desde el navegador. Modo online e offline. Sin registro, sin datos guardados.',
    'proj.bio3d.desc':    'Visor 3D controlado por gestos desde el navegador. Sin plugins.',
    'proj.cerimex.desc':  'E-commerce de cerámica con carrito, pagos y chatbot integrado.',
    'proj.twin.desc':     'Recreación del MSN Messenger. Mensajería real-time, Buzz, notificaciones sonoras.',
    'proj.fender.desc':   'Clon de la tienda Fender con cambio de color en tiempo real y carrito persistente.',
    'proj.flutter.desc':  'Script .bat que instala Flutter + Java + Android SDK sin permisos de admin.',
    'proj.piano.desc':    'Piano digital interactivo con 2 octavas y audio en tiempo real.',
    'proj.market.desc':   'App Android para Facebook Marketplace sin feed ni distracciones.',
    'proj.mitosis.desc':  'Experiencia VR educativa en Godot 4 sobre fases de la mitosis celular.',
    'proj.devos.desc':    'Linux Live basado en Fedora, desarrollado experimentalmente con IA (80%).',
    'proj.emunav.desc':   'Interfaz web para jugar Nintendo DS en el navegador. Sin instalación.',
    'proj.nava.desc':     'Lenguaje de programación con sintaxis propia, IDE web y extensión VS Code.',
    'proj.btn.download':  '[ Descargar ]',
    'proj.btn.demo':      '[ Demo ]',
    'proj.btn.try':       '[ Probar ]',
    'proj.btn.apk':       '[ APK ]',
    'proj.btn.iso':       '[ ISO ]',
    'proj.btn.ide':       '[ IDE Web ]',

    // ── App: Skills ────────────────────────
    'app.skills.title':   'stack.db',
    'skills.frontend':    '// FRONTEND',
    'skills.backend':     '// BACKEND',
    'skills.databases':   '// BASES DE DATOS',
    'skills.tools':       '// HERRAMIENTAS',

    // ── App: Contact ───────────────────────
    'app.contact.title':  'contact.sh',
    'contact.copy':       '[copiar]',
    'contact.open':       '[abrir →]',
    'contact.cta.title':  '¿Tienes un proyecto en mente?',
    'contact.cta.body':   "Cuéntame tu idea y te ayudo a hacerla realidad.<br>Disponible para proyectos freelance y colaboraciones.",

    // ── App: Terminal ──────────────────────
    'app.terminal.title': 'terminal',
    'term.help.header':   'Comandos disponibles:',
    'term.cmd.whoami':    '— Info del dev',
    'term.cmd.projects':  '— Listar proyectos',
    'term.cmd.skills':    '— Ver stack',
    'term.cmd.contact':   '— Contacto',
    'term.cmd.github':    '— Abrir GitHub',
    'term.cmd.clear':     '— Limpiar',
    'term.cmd.rain':      '— Matrix rain',
    'term.cmd.matrix':    '— ???',
    'term.res.whoami':    'Angel Salinas Pérez — Dev Full-Stack<br>México — 2026',
    'term.res.projects':  '12 proyectos:<br>WhyAI, Bio3D, Cerimex, Twin,<br>Fender, FlutterTool, Piano,<br>MarketOnly, MitosisVR, DevOS,<br>EmuNAV, NavaScript',
    'term.res.skills':    'HTML5, CSS3, JS, Python, Node.js,<br>PHP, Django, MySQL, MongoDB,<br>Kotlin, Flutter, Bash, GDScript',
    'term.res.contact':   'Email:  23angelsperez@gmail.com<br>GitHub: AngelDev2343<br>IG:     @angl.perz',
    'term.res.github':    'Abriendo GitHub...',
    'term.res.matrix':    'MATRIX MODE ALREADY ACTIVE.',
    'term.res.sudo':      'Sin permisos de sudo aquí.',
    'term.res.ls':        'about  projects  skills  contact  terminal',
    'term.help.list':     'whoami, projects, skills, contact, github, ls, pwd, date, clear, matrix, rain',
    'term.err':           "bash: {cmd}: comando no encontrado. Escribe 'help'.",
    'term.rain.active':   'rain.exe activo',
    'term.rain.stop':     '[ DETENER ]',
    'term.rain.start':    '[ INICIAR ]',

    // ── Piano desktop notice ───────────────
    'piano.notice':       '⚠ La versión interactiva completa está disponible en la versión desktop.',
    'piano.open':         '[ Abrir Demo ]',

    // ── Project detail descriptions (individual panels) ────────────
    'proj.whyai.detail':   'IA directa desde el navegador. Modo <span class="hi">online</span> (cloud) o <span class="hi">offline</span> (local). Sin registro ni instalación.',
    'proj.bio3d.detail':   'Controla modelos 3D con gestos de mano desde la webcam. <span class="hi">Mano abierta</span> = rotar/zoom. <span class="hi">Puño</span> = arrastrar.',
    'proj.cerimex.detail': 'E-commerce de cerámica con catálogo, carrito, pagos y <span class="hi">chatbot</span> integrado. Panel de admin separado.',
    'proj.twin.detail':    'Recreación del <span class="hi">MSN Messenger</span> clásico. Real-time con WebSockets, Buzz y múltiples chats.',
    'proj.fender.detail':  'Clon de la tienda Fender con cambio de <span class="hi">color en tiempo real</span>, Custom Shop y carrito persistente.',
    'proj.flutter.detail': 'Script <span class="hi">.bat</span> que instala <span class="hi">Flutter + Java + Android SDK</span> en Windows sin permisos de admin.',
    'proj.piano.detail':   'Piano digital interactivo con <span class="hi">2 octavas funcionales</span> y reproducción de audio en tiempo real con <span class="hi">JavaScript Vanilla</span>.<br><br>',
    'proj.market.detail':  'App Android para <span class="hi">Facebook Marketplace</span> sin distracciones. Sin feed, sin reels — solo comprar.',
    'proj.mitosis.detail': 'Experiencia <span class="hi">VR educativa</span> en Godot 4 sobre la mitosis celular. Soporta Google Cardboard.',
    'proj.devos.detail':   'Linux Live basado en <span class="hi">Fedora</span>, desarrollado experimentalmente con <span class="hi">IA (80%)</span>.',
    'proj.emunav.detail':  'Interfaz web para jugar <span class="hi">Nintendo DS</span> en el navegador. Basada en Desmond DS. Sin instalación.',
    'proj.nava.detail':    'Lenguaje de programación con <span class="hi">sintaxis propia</span>, IDE web y extensión para VS Code.',
  }
};

// ── Core translation function ──────────────
window.t = function(key) {
  const lang = window._osLang || 'en';
  const dict = window.LANG[lang] || window.LANG['en'];
  return (dict[key] !== undefined) ? dict[key] : (window.LANG['en'][key] !== undefined ? window.LANG['en'][key] : key);
};

// ── Apply language: updates static DOM + re-renders any open app panel ──
window.applyLanguage = function(lang) {
  window._osLang = lang;

  // Static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = window.t(el.getAttribute('data-i18n'));
  });

  // If an app panel is open, re-render it so content updates immediately
  const panel = document.getElementById('app-panel');
  if (panel && !panel.classList.contains('hidden') && window.appDefs) {
    const titleEl = document.getElementById('panel-title');
    const bodyEl  = document.getElementById('panel-body');
    const currentApp = panel.dataset.currentApp;
    if (currentApp && window.appDefs[currentApp]) {
      const def = window.appDefs[currentApp];
      if (titleEl) titleEl.textContent = typeof def.title === 'function' ? def.title() : def.title;
      if (bodyEl)  bodyEl.innerHTML = def.content();
      if (def.onOpen) setTimeout(def.onOpen, 50);
    }
  }
};