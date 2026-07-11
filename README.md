# AngelOS — Portfolio interactivo

Portfolio de **Angel Salinas Pérez** (Full-Stack Developer, México) presentado como un sistema operativo retro estilo hacker/matrix.

**Sitio en vivo:** [https://angeldev2343.github.io/land/](https://angeldev2343.github.io/land/)

## Características

- Experiencia desktop (`index.html`) y mobile (`mobile.html`) con detección automática
- Boot animado al iniciar
- Selector de idioma EN/ES con persistencia en `localStorage`
- Ventanas arrastrables, terminal interactiva, matrix rain y proyectos embebidos
- PWA básica (manifest + service worker)
- Assets locales (iconos, previews, videos WebM optimizados)

## Estructura

| Archivo / carpeta | Descripción |
|---|---|
| `index.html` / `mobile.html` | Entradas desktop y mobile |
| `core.js` | Utilidades compartidas (i18n keys, copy, seguridad, UX) |
| `lang.js` | Traducciones EN/ES |
| `script.js` / `mobile.js` | Lógica de cada plataforma |
| `styles.css` / `mobile.css` | Estilos |
| `imagenes/` | Iconos, previews y avatar |
| `media/` | Videos de preview (WebM/MP4) |
| `gifs/` | GIFs legacy (GitHub icon, etc.) |
| `manifest.json` / `sw.js` | PWA |

## Desarrollo local

Sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080` — en viewport estrecho redirige a `mobile.html`.

## Contacto

- Email: [23angelsperez@gmail.com](mailto:23angelsperez@gmail.com)
- GitHub: [@AngelDev2343](https://github.com/AngelDev2343)

## Créditos de iconos

- [Code icons — Royyan Wijaya (Flaticon)](https://www.flaticon.com/free-icons/code)
- [Launch icons — Amazona Adorada (Flaticon)](https://www.flaticon.com/free-icons/launch)
- [Portfolio icons — Freepik (Flaticon)](https://www.flaticon.com/free-icons/portfolio)
- [Email icons — Fathema Khanom (Flaticon)](https://www.flaticon.com/free-icons/email)
- [GitHub, Mail, Fedora — Icons8](https://icons8.com)
