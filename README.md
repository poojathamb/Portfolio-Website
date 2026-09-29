# Pooja Thamb | Portfolio

A responsive, single-page portfolio for Pooja Thamb. It introduces her background and skills, and highlights her education, achievements, projects, and contact details.

<p align="center">
  <a href="https://poojathamb.github.io/Portfolio-Website/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_View-Live_Portfolio-ff69b4?style=for-the-badge" alt="View Live Portfolio">
  </a>
</p>

## Portfolio Sections

- **Home:** Introduction, animated role text, social links, and particle background.
- **About:** Bio, location, email, and resume link.
- **Skills:** Skill icons and names loaded from `skills.json`.
- **Education:** Computer Science and Engineering degree and diploma.
- **Achievements:** Student ambassador, competition, open-source, and AI/ML highlights.
- **Projects:** Three project cards currently written directly in `index.html`.
- **Contact:** Form submission through EmailJS, plus contact details and social links.

The page also includes responsive navigation, active-section highlighting, smooth scrolling, tilt effects, and scroll-reveal animations.

## Built With

- HTML, CSS, and JavaScript
- jQuery
- Typed.js, particles.js, Vanilla Tilt, and ScrollReveal
- EmailJS for the contact form
- Font Awesome icons and Google Fonts
- JSON data for the skills list

Third-party libraries are loaded from CDNs in `index.html`; an internet connection is needed for those libraries, remote fonts, and skill icons. particles.js is also included locally.

## Run Locally

No package installation or build step is required. Serve the project directory over HTTP so the browser can load `skills.json`:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. You can also use another local static file server.

## Project Structure

```text
.
├── index.html                 # Portfolio content and third-party script includes
├── skills.json                # Skill names and icon URLs
└── assets/
	├── css/style.css          # Layout, responsive styles, and visual theme
	├── images/                # Profile, hero, contact, and skill images
	└── js/
		├── app.js             # particles.js configuration
		├── particles.min.js   # Local particles.js library
		└── script.js          # Navigation, animations, skills, and contact form
```

## Updating Content

- Edit the page copy, education, achievements, social links, and project cards in `index.html`.
- Add or remove skills in `skills.json`. Each item has a `name` and an `icon` URL.
- Update layout and appearance in `assets/css/style.css`.
- Update interaction behavior in `assets/js/script.js` and the particle configuration in `assets/js/app.js`.
- Replace the `#` project links in the project cards with working destinations before publishing.

## Contact Form Configuration

The form uses EmailJS; it does not submit to a custom server. The EmailJS public key, service ID, and template ID are initialized in `assets/js/script.js`. To connect the form to a different EmailJS account, replace those values with the account's settings and configure the template to accept the form's `name`, `email`, `phone`, and `message` fields.
