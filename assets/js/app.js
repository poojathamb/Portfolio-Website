/* ---------------------------------------------------------
   PINK PARTICLE UNIVERSE  (drop-in replacement for app.js)
   - hearts + stars + circles floating in blush/rose/plum
   - glowing pink connection lines
   - hover: grab + bubble (lines snap to cursor, dots swell)
   - click: pushes a burst of new particles
   - cursor sparkle trail + slow animated pink gradient bg
   --------------------------------------------------------- */

// tiny pink heart as an inline SVG (used as a particle shape)
const HEART_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29">' +
      '<path fill="#e893b0" d="M16 28C4 18 0 12 0 8a8 8 0 0 1 16-3a8 8 0 0 1 16 3c0 4-4 10-16 20z"/>' +
      "</svg>"
  );

particlesJS("particles-js", {
  particles: {
    number: { value: 90, density: { enable: true, value_area: 900 } },

    // pink palette: blush, hot pink, rose, soft lilac, plum
    color: {
      value: ["#e893b0", "#ff5fa2", "#c97b86", "#f8b4d0", "#b565a7", "#3e2a4d"],
    },

    // mix of shapes for a chaotic-but-cute look
    shape: {
      type: ["circle", "star", "image"],
      stroke: { width: 0, color: "#ffffff" },
      polygon: { nb_sides: 5 },
      image: { src: HEART_SVG, width: 100, height: 100 },
    },

    opacity: {
      value: 0.7,
      random: true,
      anim: { enable: true, speed: 1.2, opacity_min: 0.15, sync: false },
    },

    // pulsing sizes = "breathing" particles
    size: {
      value: 9,
      random: true,
      anim: { enable: true, speed: 4, size_min: 2, sync: false },
    },

    line_linked: {
      enable: true,
      distance: 160,
      color: "#e893b0",
      opacity: 0.55,
      width: 1.4,
    },

    move: {
      enable: true,
      speed: 3.2,
      direction: "top", // float upward like bubbles / confetti
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: true, rotateX: 800, rotateY: 1400 },
    },
  },

  interactivity: {
    detect_on: "window", // works even though text sits above the canvas
    events: {
      onhover: { enable: true, mode: ["grab", "bubble"] },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 220, line_linked: { opacity: 1 } },
      bubble: { distance: 200, size: 18, duration: 2, opacity: 0.9, speed: 3 },
      repulse: { distance: 180, duration: 0.4 },
      push: { particles_nb: 8 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});

/* ---------- extra magic: gradient bg + sparkle trail ---------- */

(function () {
  const home = document.getElementById("home");
  if (!home) return;

  // animated pink gradient behind the particles
  const style = document.createElement("style");
  style.textContent = `
    .home {
      background: linear-gradient(120deg, #fff0f6, #ffd6e7, #f8b4d0, #ffe3ef, #fff0f6);
      background-size: 400% 400%;
      animation: pinkFlow 14s ease infinite;
    }
    @keyframes pinkFlow {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 9997;
      font-size: 1.6rem;
      color: #ff5fa2;
      text-shadow: 0 0 8px #ff9fc8, 0 0 16px #ff5fa2;
      animation: sparkleFade 0.9s ease-out forwards;
    }
    @keyframes sparkleFade {
      to { transform: translate(var(--dx), var(--dy)) scale(0.2) rotate(180deg); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .home { animation: none; }
      .sparkle { display: none; }
    }
  `;
  document.head.appendChild(style);

  // cursor sparkle trail (now runs on the WHOLE website)
  const glyphs = ["✦", "✧", "♥", "✿", "★"];
  let last = 0;
  document.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - last < 45) return; // throttle
    last = now;

    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    s.style.setProperty("--dx", (Math.random() * 60 - 30) + "px");
    s.style.setProperty("--dy", (Math.random() * 60 + 10) + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  });
})();