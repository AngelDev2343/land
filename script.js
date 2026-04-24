// ══════════════════════════════════════════
//  BOOT SEQUENCE
// ══════════════════════════════════════════
const bootMessages = [
    { t: 'BIOS v4.2.1 — AngelOS Foundation', cl: '' },
    { t: 'Verificando integridad del sistema...', cl: 'ok' },
    { t: 'Inicializando hardware virtual...', cl: 'ok' },
    { t: 'Cargando kernel AngelOS...', cl: 'ok' },
    { t: 'Montando sistema de archivos...', cl: 'ok' },
    { t: 'Iniciando módulo de red...', cl: 'ok' },
    { t: 'Cargando drivers gráficos [HACKER-GREEN-MODE]...', cl: 'ok' },
    { t: 'Iniciando gestor de ventanas...', cl: 'ok' },
    { t: 'Cargando base de datos de proyectos...', cl: 'ok' },
    { t: 'Cargando módulo de stack...', cl: 'ok' },
    { t: 'Iniciando servidor de contacto...', cl: 'ok' },
    { t: 'Verificando certificados SSL...', cl: 'ok' },
    { t: 'Cargando perfil de usuario: Admin...', cl: 'ok' },
    { t: 'Iniciando compositor de escritorio...', cl: 'ok' },
    { t: 'Aplicando tema [MATRIX-HACKER]...', cl: 'ok' },
    { t: '⚠  Stack Coffee.exe no encontrado', cl: 'warn' },
    { t: 'Iniciando AngelOS...', cl: '' },
    { t: '', cl: '' },
    { t: '   Bienvenido, Admin', cl: '' },
    { t: '   Versión: AngelOS v1.0.0-stable', cl: '' },
    { t: '   Desarrollador: Angel Salinas Pérez', cl: '' },
    { t: '', cl: '' },
    { t: 'Sistema listo.', cl: 'ok' },
  ];
  
  let bootIdx = 0;
  const logEl = document.getElementById('boot-log');
  const barEl = document.getElementById('boot-bar');
  
  function bootStep() {
    if (bootIdx >= bootMessages.length) {
      setTimeout(showLogin, 800);
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
    setTimeout(bootStep, delay);
  }
  
  setTimeout(bootStep, 600);
  
  function showLogin() {
    const boot = document.getElementById('boot-screen');
    boot.classList.add('hidden');
    setTimeout(() => boot.classList.add('gone'), 700);
    document.getElementById('login-screen').classList.remove('hidden');
  }
  
  // ══════════════════════════════════════════
  //  LOGIN
  // ══════════════════════════════════════════
  document.getElementById('login-btn').addEventListener('click', function() {
    this.textContent = '[ AUTENTICANDO... ]';
    this.disabled = true;
    setTimeout(() => {
      const loginScreen = document.getElementById('login-screen');
      loginScreen.classList.add('hidden');
      setTimeout(() => loginScreen.classList.add('gone'), 700);
      document.getElementById('desktop-screen').classList.remove('hidden');
      startMatrixRain();
      startClock();
      setTimeout(() => showNotif('Bienvenido de vuelta, Admin'), 500);
    }, 800);
  });
  
  // ══════════════════════════════════════════
  //  MATRIX RAIN
  // ══════════════════════════════════════════
  function startMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const chars = 'アイウエオカキクケコ01ABCDEF#$%@!<>{}';
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
  
    setInterval(() => {
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
  
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
  
  // ══════════════════════════════════════════
  //  CLOCK
  // ══════════════════════════════════════════
  function startClock() {
    const t = document.getElementById('clock-time');
    const d = document.getElementById('clock-date');
    function tick() {
      const now = new Date();
      t.textContent = now.toLocaleTimeString('es-MX', { hour12: false });
      d.textContent = now.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
    tick();
    setInterval(tick, 1000);
  }
  
  // ══════════════════════════════════════════
  //  WINDOW SYSTEM
  // ══════════════════════════════════════════
  const windows = {};
  let zTop = 50;
  
  const windowDefs = {
    about: {
      title: 'about.exe — Angel Salinas Pérez',
      width: 600, height: 520,
      content: () => `
        <div class="section-title">// WHOAMI</div>
        <div class="about-grid">
          <div class="about-field"><label>Nombre</label><span>Angel Salinas Pérez</span></div>
          <div class="about-field"><label>Rol</label><span>Desarrollador Full-Stack</span></div>
          <div class="about-field"><label>Ubicación</label><span>México</span></div>
          <div class="about-field"><label>Email</label><span>23angelsperez@gmail.com</span></div>
          <div class="about-field"><label>GitHub</label><span>AngelDev2343</span></div>
          <div class="about-field"><label>Instagram</label><span>@angl.perz</span></div>
          <div class="about-field"><label>Status</label><span style="color:#00ff41">● Disponible</span></div>
          <div class="about-field"><label>Versión</label><span>v2026.04</span></div>
        </div>
        <div style="margin-top:16px;padding:16px;background:var(--bg3);border-left:2px solid var(--green);font-size:12px;color:var(--text-dim);line-height:1.8">
          <span class="prompt">angel@angelos:~$ </span><span class="cmd">cat about.txt</span><br><br>
          <span class="out">Hola, soy Ángel. Convierto ideas de negocio en páginas web que
  funcionan y hacen crecer negocios.<br><br>
  ¿Quieres vender por internet? ¿Necesitas organizar mejor tu negocio?
  ¿Tienes una idea pero no sabes por dónde empezar?<br><br>
  Yo me encargo de hacerlo realidad.</span>
        </div>
      `
    },
  
    projects: {
      title: 'projects/ — Directorio de Proyectos',
      width: 700, height: 580,
      content: () => `
        <div class="section-title">// LS -LA ~/projects</div>
        <div class="project-list">
          <div class="project-card">
            <h3>WhyAI</h3>
            <p>IA directo desde el navegador, sin instalar nada. Modo online con modelos en la nube y modo offline que descarga la IA en tu dispositivo. Sin registro, sin guardar datos.</p>
            <div style="margin-bottom:10px">
              <span class="tag">JavaScript</span><span class="tag">WebAI</span><span class="tag">Browser</span><span class="tag">Privacy</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/WhyAI" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://angelsperez.github.io/ia-offline/" target="_blank">[ Demo ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Bio3D</h3>
            <p>Visor 3D controlado por gestos de mano en tiempo real desde el navegador. Mano abierta = rotar/zoom. Puño cerrado = arrastrar. Sin plugins, sin instalación.</p>
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
            <p>Tienda online de cerámica con catálogo, carrito, múltiples direcciones, pagos y chatbot integrado. Panel de administración completo separado del área de cliente.</p>
            <div style="margin-bottom:10px">
              <span class="tag">PHP</span><span class="tag">MySQL</span><span class="tag">JS</span><span class="tag">E-commerce</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/Cerimex" target="_blank">[ GitHub ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Twin Messenger</h3>
            <p>Recreación del clásico MSN Messenger. Mensajería en tiempo real, Buzz, notificaciones sonoras, múltiples conversaciones simultáneas. Homenaje a los 2000s.</p>
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
            <p>Recreación de la tienda online de Fender con catálogo interactivo, cambio de color en tiempo real, videos de review integrados, sección Custom Shop y carrito persistente.</p>
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
            <p>Script .bat que instala automáticamente Flutter + Java + Android SDK en Windows sin permisos de administrador. Ideal para escuelas, laboratorios o entornos restringidos.</p>
            <div style="margin-bottom:10px">
              <span class="tag">Windows</span><span class="tag">Batch</span><span class="tag">Flutter</span><span class="tag">Automation</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/releases/download/v1.0/FlutterTool.bat" target="_blank">[ Descargar ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>Digital Piano</h3>
            <p>Piano digital interactivo con 2 octavas funcionales, control por teclado físico y mouse, y reproducción de audio en tiempo real usando JavaScript Vanilla.</p>
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
            <p>App Android minimalista para usar Facebook Marketplace sin distracciones. Sin feed, sin reels, sin contenido innecesario — solo comprar.</p>
            <div style="margin-bottom:10px">
              <span class="tag">Android</span><span class="tag">Kotlin</span><span class="tag">WebView</span><span class="tag">Privacy</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly/releases/download/1.1_Signed/MarketPlaceOnly-Signed.apk" target="_blank">[ Descargar APK ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>MitosisVR</h3>
            <p>Experiencia educativa en realidad virtual desarrollada en Godot 4 que permite explorar en 3D las fases de la mitosis celular con soporte para Cardboard.</p>
            <div style="margin-bottom:10px">
              <span class="tag">Godot 4</span><span class="tag">VR</span><span class="tag">3D</span><span class="tag">Educativo</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/MitosisVR" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://mitosis1.netlify.app/main.html" target="_blank">[ Probar Ahora ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>DevOS</h3>
            <p>Sistema operativo Linux Live basado en Fedora, desarrollado de forma experimental con IA (80%). Diseñado para probar los límites del desarrollo asistido por inteligencia artificial.</p>
            <div style="margin-bottom:10px">
              <span class="tag">Linux</span><span class="tag">Fedora</span><span class="tag">XFCE</span><span class="tag">Live OS</span><span class="tag">AI</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/DevOS" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Live_v1.0/DevOS-Live_v1.0.iso" target="_blank">[ Descargar ISO ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>EmuNAV</h3>
            <p>Interfaz web para ejecutar juegos de Nintendo DS directamente en el navegador, basada en Desmond DS. Sin instalación, sin configuración, lista para usar.</p>
            <div style="margin-bottom:10px">
              <span class="tag">WebAssembly</span><span class="tag">Emulator</span><span class="tag">JavaScript</span><span class="tag">Browser</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/EmuNAV/" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://angeldev2343.github.io/EmuNAV/" target="_blank">[ Probar Ahora ]</a>
            </div>
          </div>
          <div class="project-card">
            <h3>NavaScript</h3>
            <p>Lenguaje de programación interpretado con sintaxis propia, IDE web y extensión para VS Code. Diseñado como proyecto experimental, pero completamente funcional.</p>
            <div style="margin-bottom:10px">
              <span class="tag">Language</span><span class="tag">Interpreter</span><span class="tag">IDE</span><span class="tag">JavaScript</span>
            </div>
            <div class="project-links">
              <a class="project-link" href="https://github.com/AngelDev2343/NavaScript" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://AngelDev2343.github.io/NavaScript" target="_blank">[ IDE Web ]</a>
            </div>
          </div>
        </div>
      `
    },
  
    skills: {
      title: 'Stack.db — Stack Tecnológico',
      width: 580, height: 500,
      content: () => `
        <div class="section-title">// STACK --list-all</div>
        <div style="margin-bottom:16px;font-size:12px;color:var(--text-dim)">
          <span class="prompt">angel@angelos:~$ </span><span class="cmd">query stack WHERE level > 0</span>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">// FRONTEND</div>
        <div class="skills-grid" style="margin-bottom:20px">
          <div class="skill-badge"><span class="sk-icon"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/html-icon.png" width="26px"></span>HTML5</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://quintonparks.com/images/css.png" width="26px"></span>CSS3</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://cdn.iconscout.com/icon/free/png-512/javascript-2752148-2284965.png" width="26px"></span>JavaScript</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://web-creator.ru/technologies/kotlin.png" width="26px"></span>Kotlin</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://seekicon.com/free-icon-download/flutter_2.png" width="26px"></span>Flutter</div>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">// BACKEND</div>
        <div class="skills-grid" style="margin-bottom:20px">
          <div class="skill-badge"><span class="sk-icon"><img src="https://www.svgrepo.com/show/354238/python.svg" width="26px"></span>Python</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/NavaScript/refs/heads/main/NS.png" width="26px"></span>NavaScript</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://user-images.githubusercontent.com/2877584/229525885-d6f06474-d560-4f34-8b63-cae8f7265008.svg" width="26px"></span>Node.js</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://www.svgrepo.com/show/452088/php.svg" width="26px"></span>PHP</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://seekicon.com/free-icon-download/django_3.png" width="26px"></span>Django</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/dart-programming-language-icon.png" width="26px"></span>Dart</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://cdn.creazilla.com/icons/3253516/bash-icon-icon-md.png" width="26px"></span>Bash</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://images.icon-icons.com/1495/PNG/512/godot_103035.png" width="26px"></span>GDScript</div>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">// BASES DE DATOS</div>
        <div class="skills-grid" style="margin-bottom:20px">
          <div class="skill-badge"><span class="sk-icon"><img src="https://www.svgrepo.com/show/354099/mysql.svg" width="26px"></span>MySQL</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/imagenes/mongodb.png" width="30px"></span>MongoDB</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://miro.medium.com/v2/resize:fit:1400/1*5Hnnv0awfSv0BGcq1C522w.png" width="30px"></span>phpMyAdmin</div>
        </div>
        <div style="margin-bottom:12px;font-size:11px;color:var(--text-muted);letter-spacing:2px">// HERRAMIENTAS</div>
        <div class="skills-grid">
          <div class="skill-badge"><span class="sk-icon"><img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/vscode.png" width="30px"></span>VS Code</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/gifs/github.gif" width="30px" style="border-radius: 50%"></span>Git/GitHub</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://cdn2.iconfinder.com/data/icons/pack1-baco-flurry-icons-style/512/XAMPP.png" width="30px"></span>XAMPP</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://icons.veryicon.com/png/Application/Baco%20Flurry%202/Filezilla%202.png" width="30px"></span>FileZilla</div>
          <div class="skill-badge"><span class="sk-icon"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/fedora-project-icon.png" width="30px"></span>Fedora Linux</div>
        </div>
      `
    },
  
    contact: {
      title: 'contact.sh — Canales de Comunicación',
      width: 480, height: 400,
      content: () => `
        <div class="section-title">// CONTACT --help</div>
        <div style="font-size:12px;color:var(--text-dim);margin-bottom:20px">
          <span class="prompt">angel@angelos:~$ </span><span class="cmd">./contact.sh --list</span>
        </div>
        <div class="contact-item" onclick="copyEmail()">
          <div class="contact-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/imagenes/email.png" width="25px" style="border-radius: 50%"></div>
          <div class="contact-info">
            <label>Email</label>
            <span>23angelsperez@gmail.com</span>
          </div>
          <span style="font-size:11px;color:var(--text-muted);margin-left:auto">[click para copiar]</span>
        </div>
        <div class="contact-item" onclick="window.open('https://github.com/AngelDev2343','_blank')">
          <div class="contact-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/gifs/github.gif" width="25px" style="border-radius: 50%"></div>
          <div class="contact-info">
            <label>GitHub</label>
            <span>github.com/AngelDev2343</span>
          </div>
          <span style="font-size:11px;color:var(--text-muted);margin-left:auto">[abrir →]</span>
        </div>
        <div class="contact-item" onclick="window.open('https://www.instagram.com/angl.perz/','_blank')">
          <div class="contact-icon"><img src="https://raw.githubusercontent.com/AngelDev2343/land/refs/heads/main/imagenes/social.png" width="25px" style="border-radius: 50%"></div>
          <div class="contact-info">
            <label>Instagram</label>
            <span>@angl.perz</span>
          </div>
          <span style="font-size:11px;color:var(--text-muted);margin-left:auto">[abrir →]</span>
        </div>
        <div style="margin-top:24px;padding:16px;background:var(--bg3);border:1px solid var(--border);font-size:12px;color:var(--text-dim);line-height:1.8">
          <span class="hi">¿Tienes un proyecto en mente?</span><br>
          Cuéntame tu idea y te ayudo a hacerla realidad.<br>
          Disponible para proyectos freelance y colaboraciones.
        </div>
      `
    },
  
    terminal: {
      title: 'terminal — angel@angelos:~$',
      width: 620, height: 420,
      content: () => `
        <div id="term-out" class="terminal-output">
          <span class="prompt">angel@angelos:~$ </span><span class="cmd">help</span><br>
          <span class="out">Comandos disponibles:</span><br>
          <span class="out">  <span class="hi">whoami</span>    — Información del desarrollador</span><br>
          <span class="out">  <span class="hi">projects</span>  — Listar proyectos</span><br>
          <span class="out">  <span class="hi">skills</span>    — Ver stack tecnológico</span><br>
          <span class="out">  <span class="hi">contact</span>   — Información de contacto</span><br>
          <span class="out">  <span class="hi">github</span>    — Abrir GitHub</span><br>
          <span class="out">  <span class="hi">clear</span>     — Limpiar pantalla</span><br>
          <span class="out">  <span class="hi">matrix</span>    — ???</span><br>
          <span class="out">  <span class="hi">rain</span>      — Matrix rain en la terminal</span><br><br>
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
          if (inp) {
            inp.focus();
            inp.addEventListener('keydown', handleTerminalInput);
          }
        }, 100);
      }
    },
  
    whyai: {
      title: 'WhyAI — IA en el Navegador',
      width: 600, height: 500,
      content: () => `
        <div class="section-title">// WhyAI — README.md</div>
        <div class="preview-browser">
          <div class="preview-chrome">
            <div class="preview-dot" style="background:#ff5555"></div>
            <div class="preview-dot" style="background:#ffaa00"></div>
            <div class="preview-dot" style="background:#00ff41"></div>
            <div class="preview-url">angelsperez.github.io/ia-offline/</div>
          </div>
                <video 
                  src="https://github.com/user-attachments/assets/ca696e85-2d6d-4b2c-b012-57347b33bf7f"
                  style="width: 100%; height: 100%; object-fit: cover; display: block;"
                  autoplay
                  loop
                  muted
                  playsinline>
                </video>
        </div>
        <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          IA directa desde el navegador. Modo <span class="hi">online</span> (cloud) o <span class="hi">offline</span> (descargada localmente). Sin registro ni instalación.
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <a class="project-link" href="https://github.com/AngelDev2343/WhyAI" target="_blank">[ GitHub ]</a>
          <a class="project-link" href="https://angelsperez.github.io/ia-offline/" target="_blank">[ Ver Demo ]</a>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag">JavaScript</span><span class="tag">WebAI</span><span class="tag">Privacy-First</span><span class="tag">No-Install</span>
        </div>
      `
    },
  
    bio3d: {
      title: 'Bio3D — Visor 3D Gestual',
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
                  src="https://github.com/user-attachments/assets/ca9c58ff-6be7-4d7a-a1cc-e9df7ab56f73"
                  style="width: 100%; height: 100%; object-fit: cover; display: block;"
                  autoplay
                  loop
                  muted
                  playsinline>
                </video>
          </div>
        <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          Controla modelos 3D con gestos de mano desde la webcam. <span class="hi">Mano abierta</span> = rotar/zoom. <span class="hi">Puño</span> = arrastrar. Sin plugins.
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <a class="project-link" href="https://github.com/AngelDev2343/Bio3D" target="_blank">[ GitHub ]</a>
          <a class="project-link" href="https://angeldev2343.github.io/Bio3D/" target="_blank">[ Ver Demo ]</a>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag">WebGL</span><span class="tag">Three.js</span><span class="tag">MediaPipe</span><span class="tag">Hand Tracking</span>
        </div>
      `
    },
  
    cerimex: {
      title: 'Cerimex — Tienda Online',
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
                  <img src="https://github.com/AngelDev2343/land/blob/main/gifs/cerimex.gif?raw=true" style="width: 100%; height: auto; min-height: 500px;">
          </div>
        <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          Tienda e-commerce completa con catálogo, carrito, múltiples direcciones, pagos y <span class="hi">chatbot</span> integrado. Panel de admin separado.
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
      title: 'Twin Messenger — MSN Reborn',
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
          <img src="https://github.com/AngelDev2343/land/blob/main/gifs/twin.gif?raw=true" style="width: 100%; height: auto; min-height: 300px;">
          </div>
  
          <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
          Recreación del <span class="hi">MSN Messenger</span> clásico. Mensajería real-time con WebSockets, Buzz, notificaciones sonoras y múltiples chats simultáneos.
          </div>
  
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <a class="project-link" href="https://github.com/AngelDev2343/TwinMessenger" target="_blank">[ GitHub ]</a>
          <a class="project-link" href="https://twin-messenger.great-site.net/" target="_blank">[ Ver Demo ]</a>
          </div>
  
          <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag">Node.js</span><span class="tag">WebSockets</span><span class="tag">PHP</span><span class="tag">Retro UI</span>
          </div>
      `
      },
  
      fender: {
          title: 'Fender — Guitar Store Clone',
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
              <img src="https://github.com/AngelDev2343/land/blob/main/gifs/fender.gif?raw=true" style="width: 100%; height: auto; min-height: 300px;">
              </div>
  
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
              Clon de la tienda Fender con cambio de <span class="hi">color en tiempo real</span>, videos de review, Custom Shop y carrito persistente.
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
              <a class="project-link" href="https://github.com/AngelDev2343/Fender" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://angeldev2343.pythonanywhere.com/" target="_blank">[ Ver Demo ]</a>
              </div>
  
              <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span class="tag">Python</span><span class="tag">Django</span><span class="tag">JavaScript</span><span class="tag">UI/UX</span>
              </div>
          `
      
      },
  
      fluttertool: {
          title: 'FlutterTool',
          width: 650, height: 520,
          content: () => `
              <div class="section-title">// FlutterTool — README.md</div>
              <div class="preview-browser">
              <div class="preview-chrome">
                  <div class="preview-dot" style="background:#ff5555"></div>
                  <div class="preview-dot" style="background:#ffaa00"></div>
                  <div class="preview-dot" style="background:#00ff41"></div>
                  <div class="preview-url">github.com/AngelSPerez/flutter-instalacion</div>
              </div>
              <img src="https://raw.githubusercontent.com/AngelDev2343/FlutterTool/refs/heads/main/power.PNG" style="width: 100%; height: auto; min-height: 300px;">
              </div>
  
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
              Script <span class="hi">.bat</span> que instala automáticamente <span class="hi">Flutter + Java + Android SDK</span> en Windows 
              <span class="hi">sin permisos de administrador</span>. Ideal para escuelas, labs o entornos restringidos.
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://github.com/AngelDev2343/FlutterTool/releases/download/v1.0/FlutterTool.bat" target="_blank">[ Descargar ]</a>
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
          title: 'Digital Piano — Web Instrument',
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
              Piano digital interactivo con <span class="hi">2 octavas funcionales</span>, control por teclado físico y mouse, 
              y reproducción de audio en tiempo real usando <span class="hi">JavaScript Vanilla</span>.
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
              <a class="project-link" href="https://github.com/AngelDev2343/DigitalPiano" target="_blank">[ GitHub ]</a>
              <a class="project-link" href="https://AngelDev2343.github.io/DigitalPiano/index.html" target="_blank">[ Ver Demo ]</a>
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
          title: 'MarketplaceOnly — Focused Marketplace App',
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
                      <img src="https://github.com/user-attachments/assets/ec3b255a-e7af-4938-bdc6-8b48fb647906" style="width:100%;border-radius:4px;">
                      <img src="https://github.com/user-attachments/assets/906e8306-2954-43ca-ab17-c5012813e199" style="width:100%;border-radius:4px;">
                      <img src="https://github.com/user-attachments/assets/68d99013-a429-4672-b6da-407086352e9a" style="width:100%;border-radius:4px;">
                      <img src="https://github.com/user-attachments/assets/72300ac9-6141-4611-a162-3d0a19cc2c15" style="width:100%;border-radius:4px;">
                  </div>
              </div>
  
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                  App Android minimalista que permite usar <span class="hi">Facebook Marketplace</span> sin distracciones. 
                  Sin feed, sin reels, sin contenido innecesario — solo <span class="hi">comprar</span>.
              </div>
  
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                  <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly" target="_blank">[ GitHub ]</a>
                  <a class="project-link" href="https://github.com/AngelDev2343/MarketPlaceOnly/releases/download/1.1_Signed/MarketPlaceOnly-Signed.apk" target="_blank">[ Descargar APK ]</a>
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
          title: 'Mitosis VR — Immersive Biology Experience',
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
                          src="https://github.com/user-attachments/assets/903e0fd6-d83f-4e73-83e9-f1dfa3ee9b2e"
                          style="width: 100%; height: 100%; object-fit: cover; display: block;"
                          autoplay
                          loop
                          muted
                          playsinline>
                      </video>
                  </div>
              </div>
      
              <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                  Experiencia educativa en <span class="hi">realidad virtual</span> desarrollada en <span class="hi">Godot 4</span> 
                  que permite explorar en 3D las fases de la <span class="hi">mitosis celular</span> con soporte para Cardboard.
              </div>
      
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                  <a class="project-link" href="https://github.com/AngelDev2343/MitosisVR" target="_blank">[ GitHub ]</a>
                  <a class="project-link" href="https://mitosis1.netlify.app/main.html" target="_blank">[ Probar Ahora ]</a>
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
        title: 'DevOS — AI Powered Linux Live',
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
                    <img src="https://github.com/user-attachments/assets/d0865267-f9a9-4b82-b835-2cfca1edf65e" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                    <img src="https://github.com/user-attachments/assets/a1d66433-b64d-4298-9201-9064c39e72cd" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                    <img src="https://github.com/user-attachments/assets/85012da8-7b14-42b4-8557-d6c1c4a61e54" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                    <img src="https://github.com/user-attachments/assets/a96ff2f4-1435-4c88-b8da-f27dfac31e5c" style="width:100%;border-radius:4px;object-fit:cover;aspect-ratio:16/9;">
                </div>
            </div>
    
            <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                Sistema operativo <span class="hi">Linux Live</span> basado en Fedora, desarrollado de forma 
                <span class="hi">experimental con IA (80%)</span>. Diseñado para probar los límites del desarrollo asistido por inteligencia artificial.
            </div>
    
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                <a class="project-link" href="https://github.com/AngelDev2343/DevOS" target="_blank">[ GitHub ]</a>
                <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Live_v1.0/DevOS-Live_v1.0.iso" target="_blank">[ Descargar ISO ]</a>
                <a class="project-link" href="https://github.com/AngelDev2343/DevOS/releases/download/Build_Kit_v1.0/devos-build-kit-en-final.zip" target="_blank">[ Build Kit ]</a>
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
        title: 'EmuNav — Nintendo DS Web Emulator',
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
    
                <img src="https://raw.githubusercontent.com/AngelDev2343/EmuNAV/refs/heads/main/Emu.PNG" style="width: 100%; height: auto; min-height: 400px;">
            </div>
    
            <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                Interfaz web para ejecutar juegos de <span class="hi">Nintendo DS</span> directamente en el navegador, 
                basada en <span class="hi">Desmond DS</span>. Sin instalación, sin configuración, lista para usar.
            </div>
    
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                <a class="project-link" href="https://github.com/AngelDev2343/EmuNAV/" target="_blank">[ GitHub ]</a>
                <a class="project-link" href="https://angeldev2343.github.io/EmuNAV/" target="_blank">[ Probar Ahora ]</a>
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
        title: 'NavaScript — Custom Programming Language',
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
    
                    <img src="https://raw.githubusercontent.com/AngelDev2343/NavaScript/refs/heads/main/images/image.png" style="width:100%;border-radius:0px;object-fit:cover;aspect-ratio:16/9;">

            </div>
    
            <div style="padding:12px;background:var(--bg3);border-left:2px solid var(--green);margin-bottom:12px;font-size:11px;color:var(--text-dim);line-height:1.8">
                Lenguaje de programación interpretado con <span class="hi">sintaxis propia</span>, IDE web y extensión para VS Code. 
                Diseñado como proyecto experimental, pero completamente funcional.
            </div>
    
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
                <a class="project-link" href="https://AngelDev2343.github.io/NavaScript" target="_blank">[ IDE Web ]</a>
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
        title: 'Angel Dev Arcade',
        width: 1280, height: 720,
        content: () => `<iframe 
            src="https://angelsperez.github.io/Angel-Dev-Arcade/"
            style="width:100%; height:100%; border:none; display:block;"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
            loading="lazy">
        </iframe>`
    },

    kid: {
        title: '777.exe - A windows virus',
        width: 650, height: 520,
        content: () => ` 
                <div class="section-title">My first encounter with programming</div>
                <div class="section-title">Functional virus for the Windows system made when I was 13 years old.</div>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/iqOfGm2izQk?si=cQIfspLSQzluO20P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
        <div class="window-title">${def.title}</div>
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
      btn.textContent = def ? def.title.split(' — ')[0] : id;
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
      win.style.left = Math.max(0, startL + e.clientX - startX) + 'px';
      win.style.top  = Math.max(0, startT + e.clientY - startY) + 'px';
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
    line.innerHTML = `<span class="prompt">angel@angelos:~$ </span><span class="cmd">${cmd}</span>`;
    out.appendChild(line);
  
    const res = document.createElement('div');
    res.style.marginBottom = '8px';
  
    const responses = {
      whoami: `<span class="out">Angel Salinas Pérez — Desarrollador Full-Stack<br>México — 2026</span>`,
      projects: `<span class="out">12 proyectos encontrados:<br>  ├─ WhyAI          [JS, WebAI]<br>  ├─ Bio3D          [WebGL, Gestos]<br>  ├─ Cerimex        [PHP, MySQL]<br>  ├─ Twin Msgnr     [Node.js, WS]<br>  ├─ Fender         [Python, Django]<br>  ├─ FlutterTool    [Windows, Batch]<br>  ├─ Digital Piano  [JS, Audio]<br>  ├─ MarketplaceOnly[Android, Kotlin]<br>  ├─ MitosisVR      [Godot 4, VR]<br>  ├─ DevOS          [Linux, Fedora]<br>  ├─ EmuNAV         [WebAssembly]<br>  └─ NavaScript     [Language, IDE]</span>`,
      skills: `<span class="out">Stack: HTML5, CSS3, JavaScript, TypeScript, Python,<br>Node.js, PHP, Django, MySQL, MongoDB, Git, VS Code,<br>FileZilla, XAMPP, Fedora Linux</span>`,
      contact: `<span class="out">Email:     23angelsperez@gmail.com<br>GitHub:    github.com/AngelDev2343<br>Instagram: @angl.perz</span>`,
      github: `<span class="out">Abriendo github.com/AngelDev2343...</span>`,
      clear: `__CLEAR__`,
      matrix: `<span class="warn-t">MATRIX MODE ALREADY ACTIVE. YOU ARE THE CHOSEN ONE.</span>`,
      sudo: `<span class="warn-t">Hola. ¿Soy yo o tú? Soy el sistema. No tienes permisos de sudo aquí.</span>`,
      ls: `<span class="out">about.exe  projects/  skills.db  contact.sh  terminal  README.md</span>`,
      pwd: `<span class="out">/home/angel/portfolio</span>`,
      date: `<span class="out">${new Date().toLocaleString('es-MX')}</span>`,
      help: `<span class="out">Comandos: whoami, projects, skills, contact, github, ls, pwd, date, clear, matrix, sudo, rain</span>`,
      rain: `__RAIN__`,
      '': `<span class="out"></span>`
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
      wrap.innerHTML = `
        <canvas id="${rainId}" style="display:block;width:100%;height:160px;border:1px solid var(--border);border-radius:4px;background:#000;"></canvas>
        <button onclick="
          const c=document.getElementById('${rainId}');
          if(c._rainStop){c._rainStop();this.textContent='[ INICIAR ]';}
          else{startTermRain('${rainId}');this.textContent='[ DETENER ]';}
        " style="margin-top:6px;background:transparent;border:1px solid var(--green);color:var(--green);font-family:inherit;font-size:11px;padding:3px 10px;cursor:pointer;">[ DETENER ]</button>
        <span style="font-size:10px;color:var(--text-muted);margin-left:10px">rain.exe — proceso activo</span>
      `;
      res.appendChild(wrap);
      out.appendChild(res);

      setTimeout(() => startTermRain(rainId), 50);

    } else if (cmd === 'github') {
      window.open('https://github.com/AngelDev2343', '_blank');
      res.innerHTML = responses.github;
      out.appendChild(res);
    } else if (responses[cmd] !== undefined) {
      res.innerHTML = responses[cmd];
      out.appendChild(res);
    } else {
      res.innerHTML = `<span style="color:#ff4444">bash: ${cmd}: comando no encontrado. Escribe 'help' para ver los comandos.</span>`;
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
  
  function copyEmail() {
    const email = '23angelsperez@gmail.com';
    navigator.clipboard.writeText(email).catch(() => {});
    showNotif('Email copiado al portapapeles');
  }
  
  function arrangeWindows() {
    const ids = Object.keys(windows);
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
  //  DESKTOP ICON CLICKS (event delegation)
  // ══════════════════════════════════════════
  document.addEventListener('click', function(e) {
    const icon = e.target.closest('.d-icon[data-app]');
    if (icon) {
      const app = icon.dataset.app;
      if (app) openWindow(app);
    }
  });
