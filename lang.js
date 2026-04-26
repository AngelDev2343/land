// ══════════════════════════════════════════
//  AngelOS — Language / i18n System
//  Standalone script — loaded before script.js
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

    // ── Start menu ─────────────────────────
    'start.about':      'About me',
    'start.projects':   'Projects',
    'start.skills':     'Stack',
    'start.contact':    'Contact',
    'start.terminal':   'Terminal',
    'start.github':     'GitHub',
    'start.restart':    'Restart',

    // ── Context menu ───────────────────────
    'ctx.terminal':     'Open Terminal',
    'ctx.profile':      'View Profile',
    'ctx.arrange':      'Arrange Windows',
    'ctx.closeall':     'Close All',

    // ── Notifications ──────────────────────
    'notif.welcome':    'Welcome back, Admin',
    'notif.email':      'Email copied to clipboard',

    // ── Window: About ──────────────────────
    'win.about.title':  'about.exe — Angel Salinas Pérez',
    'about.label.name':     'Name',
    'about.label.role':     'Role',
    'about.label.location': 'Location',
    'about.label.email':    'Email',
    'about.label.status':   'Status',
    'about.label.version':  'Version',
    'about.value.role':     'Full-Stack Developer',
    'about.value.location': 'Mexico',
    'about.value.status':   '● Available',
    'about.bio': `Hi, I\'m Ángel. I turn business ideas into websites that work and help businesses grow.<br><br>
Want to sell online? Need to organize your business better? Got an idea but don\'t know where to start?<br><br>
I make it happen.`,

    // ── Window: Projects ───────────────────
    'win.projects.title': 'projects/ — Project Directory',
    'proj.whyai.desc':    'AI directly in the browser, no install needed. Online mode with cloud models and offline mode that downloads the AI to your device. No registration, no data stored.',
    'proj.bio3d.desc':    '3D viewer controlled by hand gestures in real time from the browser. Open hand = rotate/zoom. Closed fist = drag. No plugins, no installation.',
    'proj.cerimex.desc':  'Full ceramics e-commerce store with catalog, cart, multiple addresses, payments and integrated chatbot. Separate admin panel from the customer area.',
    'proj.twin.desc':     'Recreation of the classic MSN Messenger. Real-time messaging, Buzz, sound notifications, multiple simultaneous conversations. A tribute to the 2000s.',
    'proj.fender.desc':   'Clone of the Fender store with interactive catalog, real-time color switching, review videos, Custom Shop section and persistent cart.',
    'proj.flutter.desc':  '.bat script that automatically installs Flutter + Java + Android SDK on Windows without admin permissions. Ideal for schools, labs or restricted environments.',
    'proj.piano.desc':    'Interactive digital piano with 2 functional octaves, physical keyboard and mouse control, and real-time audio playback using Vanilla JavaScript.',
    'proj.market.desc':   'Minimalist Android app to use Facebook Marketplace without distractions. No feed, no reels, no unnecessary content — just shopping.',
    'proj.mitosis.desc':  'Educational VR experience developed in Godot 4 that lets you explore the phases of cell mitosis in 3D with Google Cardboard support.',
    'proj.devos.desc':    'Linux Live OS based on Fedora, developed experimentally with AI (80%). Designed to push the limits of AI-assisted development.',
    'proj.emunav.desc':   'Web interface to run Nintendo DS games directly in the browser, based on Desmond DS. No installation, no setup, ready to use.',
    'proj.nava.desc':     'Interpreted programming language with its own syntax, web IDE and VS Code extension. Designed as an experimental project but fully functional.',
    'proj.kid.desc':      'I developed a working Windows virus at age 13 — my first real step into programming.',
    'proj.btn.download':  '[ Download ]',
    'proj.btn.demo':      '[ Demo ]',
    'proj.btn.try':       '[ Try Now ]',
    'proj.btn.apk':       '[ Download APK ]',
    'proj.btn.iso':       '[ Download ISO ]',
    'proj.btn.ide':       '[ Web IDE ]',

    // ── Window: Skills ─────────────────────
    'win.skills.title':   'Stack.db — Tech Stack',
    'skills.frontend':    '// FRONTEND',
    'skills.backend':     '// BACKEND',
    'skills.databases':   '// DATABASES',
    'skills.tools':       '// TOOLS',

    // ── Window: Contact ────────────────────
    'win.contact.title':  'contact.sh — Contact Channels',
    'contact.copy':       '[click to copy]',
    'contact.open':       '[open →]',
    'contact.cta.title':  'Got a project in mind?',
    'contact.cta.body':   'Tell me your idea and I\'ll help you make it happen.<br>Available for freelance projects and collaborations.',

    // ── Window: Terminal ───────────────────
    'win.terminal.title': 'terminal — angel@angelos:~$',
    'term.help.header':   'Available commands:',
    'term.cmd.whoami':    '— Developer info',
    'term.cmd.projects':  '— List projects',
    'term.cmd.skills':    '— View tech stack',
    'term.cmd.contact':   '— Contact info',
    'term.cmd.github':    '— Open GitHub',
    'term.cmd.clear':     '— Clear screen',
    'term.cmd.matrix':    '— ???',
    'term.cmd.rain':      '— Matrix rain in terminal',
    'term.res.whoami':    'Angel Salinas Pérez — Full-Stack Developer<br>Mexico — 2026',
    'term.res.projects':  '12 projects found:<br>  ├─ WhyAI          [JS, WebAI]<br>  ├─ Bio3D          [WebGL, Gestures]<br>  ├─ Cerimex        [PHP, MySQL]<br>  ├─ Twin Msngr     [Node.js, WS]<br>  ├─ Fender         [Python, Django]<br>  ├─ FlutterTool    [Windows, Batch]<br>  ├─ Digital Piano  [JS, Audio]<br>  ├─ MarketplaceOnly[Android, Kotlin]<br>  ├─ MitosisVR      [Godot 4, VR]<br>  ├─ DevOS          [Linux, Fedora]<br>  ├─ EmuNAV         [WebAssembly]<br>  └─ NavaScript     [Language, IDE]',
    'term.res.skills':    'Stack: HTML5, CSS3, JavaScript, TypeScript, Python,<br>Node.js, PHP, Django, MySQL, MongoDB, Git, VS Code,<br>FileZilla, XAMPP, Fedora Linux',
    'term.res.contact':   'Email:     23angelsperez@gmail.com<br>GitHub:    github.com/AngelDev2343<br>Instagram: @angl.perz',
    'term.res.github':    'Opening github.com/AngelDev2343...',
    'term.res.matrix':    'MATRIX MODE ALREADY ACTIVE. YOU ARE THE CHOSEN ONE.',
    'term.res.sudo':      'Hello. Am I me or you? I am the system. You have no sudo permissions here.',
    'term.res.ls':        'about.exe  projects/  skills.db  contact.sh  terminal  README.md',
    'term.res.date':      '', // filled dynamically
    'term.help.list':     'Commands: whoami, projects, skills, contact, github, ls, pwd, date, clear, matrix, sudo, rain',
    'term.err':           'bash: {cmd}: command not found. Type \'help\' to see commands.',
    'term.rain.status':   'rain.exe — active process',
    'term.rain.stop':     '[ STOP ]',
    'term.rain.start':    '[ START ]',
  },

  // ──────────────────────────────────────────
  es: {
    // ── Login ──────────────────────────────
    'login.btn':        '[ INGRESAR ]',
    'login.auth':       '[ AUTENTICANDO... ]',
    'login.footer':     'AngelOS — Desarrollador Full-Stack',

    // ── Language screen ────────────────────
    'lang.accept':      '[ ACEPTAR ]',

    // ── Start menu ─────────────────────────
    'start.about':      'Sobre mí',
    'start.projects':   'Proyectos',
    'start.skills':     'Stack',
    'start.contact':    'Contacto',
    'start.terminal':   'Terminal',
    'start.github':     'GitHub',
    'start.restart':    'Reiniciar',

    // ── Context menu ───────────────────────
    'ctx.terminal':     'Abrir Terminal',
    'ctx.profile':      'Ver Perfil',
    'ctx.arrange':      'Organizar Ventanas',
    'ctx.closeall':     'Cerrar Todo',

    // ── Notifications ──────────────────────
    'notif.welcome':    'Bienvenido de vuelta, Admin',
    'notif.email':      'Email copiado al portapapeles',

    // ── Window: About ──────────────────────
    'win.about.title':  'about.exe — Angel Salinas Pérez',
    'about.label.name':     'Nombre',
    'about.label.role':     'Rol',
    'about.label.location': 'Ubicación',
    'about.label.email':    'Email',
    'about.label.status':   'Status',
    'about.label.version':  'Versión',
    'about.value.role':     'Desarrollador Full-Stack',
    'about.value.location': 'México',
    'about.value.status':   '● Disponible',
    'about.bio': `Hola, soy Ángel. Convierto ideas de negocio en páginas web que funcionan y hacen crecer negocios.<br><br>
¿Quieres vender por internet? ¿Necesitas organizar mejor tu negocio? ¿Tienes una idea pero no sabes por dónde empezar?<br><br>
Yo me encargo de hacerlo realidad.`,

    // ── Window: Projects ───────────────────
    'win.projects.title': 'projects/ — Directorio de Proyectos',
    'proj.whyai.desc':    'IA directo desde el navegador, sin instalar nada. Modo online con modelos en la nube y modo offline que descarga la IA en tu dispositivo. Sin registro, sin guardar datos.',
    'proj.bio3d.desc':    'Visor 3D controlado por gestos de mano en tiempo real desde el navegador. Mano abierta = rotar/zoom. Puño cerrado = arrastrar. Sin plugins, sin instalación.',
    'proj.cerimex.desc':  'Tienda online de cerámica con catálogo, carrito, múltiples direcciones, pagos y chatbot integrado. Panel de administración completo separado del área de cliente.',
    'proj.twin.desc':     'Recreación del clásico MSN Messenger. Mensajería en tiempo real, Buzz, notificaciones sonoras, múltiples conversaciones simultáneas. Homenaje a los 2000s.',
    'proj.fender.desc':   'Recreación de la tienda Fender con catálogo interactivo, cambio de color en tiempo real, videos de review integrados, sección Custom Shop y carrito persistente.',
    'proj.flutter.desc':  'Script .bat que instala automáticamente Flutter + Java + Android SDK en Windows sin permisos de administrador. Ideal para escuelas, laboratorios o entornos restringidos.',
    'proj.piano.desc':    'Piano digital interactivo con 2 octavas funcionales, control por teclado físico y mouse, y reproducción de audio en tiempo real usando JavaScript Vanilla.',
    'proj.market.desc':   'App Android minimalista para usar Facebook Marketplace sin distracciones. Sin feed, sin reels, sin contenido innecesario — solo comprar.',
    'proj.mitosis.desc':  'Experiencia educativa en realidad virtual desarrollada en Godot 4 que permite explorar en 3D las fases de la mitosis celular con soporte para Cardboard.',
    'proj.devos.desc':    'Sistema operativo Linux Live basado en Fedora, desarrollado de forma experimental con IA (80%). Diseñado para probar los límites del desarrollo asistido por IA.',
    'proj.emunav.desc':   'Interfaz web para ejecutar juegos de Nintendo DS directamente en el navegador, basada en Desmond DS. Sin instalación, sin configuración, lista para usar.',
    'proj.nava.desc':     'Lenguaje de programación interpretado con sintaxis propia, IDE web y extensión para VS Code. Diseñado como proyecto experimental, pero completamente funcional.',
    'proj.kid.desc':      'Desarrollé un virus funcional para Windows a los 13 años, marcando mi primer acercamiento al mundo de la programación.',
    'proj.btn.download':  '[ Descargar ]',
    'proj.btn.demo':      '[ Demo ]',
    'proj.btn.try':       '[ Probar Ahora ]',
    'proj.btn.apk':       '[ Descargar APK ]',
    'proj.btn.iso':       '[ Descargar ISO ]',
    'proj.btn.ide':       '[ IDE Web ]',

    // ── Window: Skills ─────────────────────
    'win.skills.title':   'Stack.db — Stack Tecnológico',
    'skills.frontend':    '// FRONTEND',
    'skills.backend':     '// BACKEND',
    'skills.databases':   '// BASES DE DATOS',
    'skills.tools':       '// HERRAMIENTAS',

    // ── Window: Contact ────────────────────
    'win.contact.title':  'contact.sh — Canales de Comunicación',
    'contact.copy':       '[click para copiar]',
    'contact.open':       '[abrir →]',
    'contact.cta.title':  '¿Tienes un proyecto en mente?',
    'contact.cta.body':   'Cuéntame tu idea y te ayudo a hacerla realidad.<br>Disponible para proyectos freelance y colaboraciones.',

    // ── Window: Terminal ───────────────────
    'win.terminal.title': 'terminal — angel@angelos:~$',
    'term.help.header':   'Comandos disponibles:',
    'term.cmd.whoami':    '— Información del desarrollador',
    'term.cmd.projects':  '— Listar proyectos',
    'term.cmd.skills':    '— Ver stack tecnológico',
    'term.cmd.contact':   '— Información de contacto',
    'term.cmd.github':    '— Abrir GitHub',
    'term.cmd.clear':     '— Limpiar pantalla',
    'term.cmd.matrix':    '— ???',
    'term.cmd.rain':      '— Matrix rain en la terminal',
    'term.res.whoami':    'Angel Salinas Pérez — Desarrollador Full-Stack<br>México — 2026',
    'term.res.projects':  '12 proyectos encontrados:<br>  ├─ WhyAI          [JS, WebAI]<br>  ├─ Bio3D          [WebGL, Gestos]<br>  ├─ Cerimex        [PHP, MySQL]<br>  ├─ Twin Msgnr     [Node.js, WS]<br>  ├─ Fender         [Python, Django]<br>  ├─ FlutterTool    [Windows, Batch]<br>  ├─ Digital Piano  [JS, Audio]<br>  ├─ MarketplaceOnly[Android, Kotlin]<br>  ├─ MitosisVR      [Godot 4, VR]<br>  ├─ DevOS          [Linux, Fedora]<br>  ├─ EmuNAV         [WebAssembly]<br>  └─ NavaScript     [Language, IDE]',
    'term.res.skills':    'Stack: HTML5, CSS3, JavaScript, TypeScript, Python,<br>Node.js, PHP, Django, MySQL, MongoDB, Git, VS Code,<br>FileZilla, XAMPP, Fedora Linux',
    'term.res.contact':   'Email:     23angelsperez@gmail.com<br>GitHub:    github.com/AngelDev2343<br>Instagram: @angl.perz',
    'term.res.github':    'Abriendo github.com/AngelDev2343...',
    'term.res.matrix':    'MATRIX MODE ALREADY ACTIVE. YOU ARE THE CHOSEN ONE.',
    'term.res.sudo':      'Hola. ¿Soy yo o tú? Soy el sistema. No tienes permisos de sudo aquí.',
    'term.res.ls':        'about.exe  projects/  skills.db  contact.sh  terminal  README.md',
    'term.res.date':      '',
    'term.help.list':     'Comandos: whoami, projects, skills, contact, github, ls, pwd, date, clear, matrix, sudo, rain',
    'term.err':           'bash: {cmd}: comando no encontrado. Escribe \'help\' para ver los comandos.',
    'term.rain.status':   'rain.exe — proceso activo',
    'term.rain.stop':     '[ DETENER ]',
    'term.rain.start':    '[ INICIAR ]',
  }
};

// ── Core translation function ──────────────
window.t = function(key) {
  const lang = window._osLang || 'en';
  const val = (window.LANG[lang] && window.LANG[lang][key] !== undefined)
    ? window.LANG[lang][key]
    : (window.LANG['en'][key] !== undefined ? window.LANG['en'][key] : key);
  return val;
};

// ── Apply translations to static DOM ───────
window.applyLanguage = function(lang) {
  window._osLang = lang;

  // Update elements with data-i18n (textContent)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = window.t(el.getAttribute('data-i18n'));
  });

  // Update elements with data-i18n-html (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = window.t(el.getAttribute('data-i18n-html'));
  });

  // Re-render any open windows so their content updates
  if (window.windows && window.windowDefs) {
    Object.keys(window.windows).forEach(id => {
      const win = window.windows[id];
      const def = window.windowDefs[id];
      if (!win || !def) return;
      // Update title bar
      const titleEl = win.querySelector('.window-title');
      if (titleEl) titleEl.textContent = def.title();
      // Update body
      const bodyEl = win.querySelector('.window-body');
      if (bodyEl) bodyEl.innerHTML = def.content();
      // Re-attach terminal if needed
      if (id === 'terminal' && def.onOpen) def.onOpen();
    });
  }
};