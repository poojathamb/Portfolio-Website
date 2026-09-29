/* ---------------------------------------------------------
   creative-more.js — extra animations for About, Skills,
   Achievements, Projects and Contact (plus spotlight on cards).
   Load LAST:
     <script src="./assets/js/creative-more.js"></script>
   Uses individual CSS props (translate / scale / rotate) so it
   never clashes with ScrollReveal or VanillaTilt transforms.
   --------------------------------------------------------- */
(function () {
  const css = `
  /* ---- spotlight that follows the mouse inside cards ---- */
  .education .box::after,.achievements .box::after,.work .box::after{content:"";position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(circle 160px at var(--mx,50%) var(--my,50%),rgba(255,95,162,.28),transparent 70%);
    opacity:0;transition:opacity .3s;z-index:2}
  .education .box:hover::after,.achievements .box:hover::after,.work .box:hover::after{opacity:1}

  /* ---- ABOUT: orbiting sparkles, sliding info, pulsing resume ---- */
  .about .image .orbit{position:absolute;inset:-28px;border-radius:50%;pointer-events:none;z-index:2;animation:spin 12s linear infinite}
  .about .image .orbit span{position:absolute;font-size:2.2rem;color:#ff5fa2;text-shadow:0 0 10px #ff9fc8}
  .about .image .orbit span:nth-child(1){top:-6px;left:50%}
  .about .image .orbit span:nth-child(2){bottom:8%;right:2%}
  .about .image .orbit span:nth-child(3){bottom:8%;left:2%}
  .about .box-container .box p{opacity:0;translate:-40px 0;transition:opacity .7s,translate .7s}
  .about .box-container .box p:nth-child(2){transition-delay:.25s}
  .about.in-view .box-container .box p{opacity:1;translate:0 0}
  .about .box-container .box p span{position:relative}
  .about .box-container .box p:hover span{color:#ff5fa2}
  .resumebtn .btn{animation:pulseBtn 2.4s infinite}
  @keyframes pulseBtn{0%{box-shadow:0 0 0 0 rgba(255,95,162,.55)}70%{box-shadow:0 0 0 18px rgba(255,95,162,0)}100%{box-shadow:0 0 0 0 rgba(255,95,162,0)}}

  /* ---- SKILLS: wave pop-in + fisheye handled in JS ---- */
  .skills .bar{opacity:0;scale:.5;rotate:-8deg;transition:opacity .6s,scale .6s cubic-bezier(.3,1.7,.5,1),rotate .6s}
  .skills .bar.pop{opacity:1;scale:1;rotate:0deg}
  .skills .bar .info img{transition:scale .15s ease-out,transform .4s cubic-bezier(.3,1.8,.5,1)}
  .skills .bar .info span{transition:color .3s,letter-spacing .3s}
  .skills .bar:hover .info span{color:#ff5fa2;letter-spacing:.08rem}

  /* ---- ACHIEVEMENTS: pulse ring + title underline grow ---- */
  .achievements .box i::after{content:"";position:absolute}
  .achievements .box{--ring:0}
  .achievements .box:hover i{animation:wiggle .6s ease}
  @keyframes wiggle{0%,100%{rotate:0deg}25%{rotate:-18deg}50%{rotate:14deg}75%{rotate:-8deg}}
  .achievements .box h3{position:relative;display:inline-block}
  .achievements .box h3::after{content:"";position:absolute;left:0;bottom:-4px;height:3px;width:0;border-radius:3px;
    background:linear-gradient(90deg,#f8b4d0,#ff5fa2);transition:width .4s}
  .achievements .box:hover h3::after{width:100%}
  .achievements .box{animation:glowPulse 4s ease-in-out infinite}
  .achievements .box:nth-child(2){animation-delay:.8s}.achievements .box:nth-child(3){animation-delay:1.6s}.achievements .box:nth-child(4){animation-delay:2.4s}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 0 rgba(255,95,162,0)}50%{box-shadow:0 0 22px rgba(255,95,162,.35)}}

  /* ---- PROJECTS: gradient sweep on cover, title slide, floating hearts ---- */
  .work .box .cover{position:relative;overflow:hidden}
  .work .box .cover::after{content:"";position:absolute;inset:0;
    background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.45),transparent 70%);translate:-100% 0;animation:sweep 3.2s infinite}
  @keyframes sweep{60%,100%{translate:100% 0}}
  .work .box .tag h3{transition:letter-spacing .4s,color .4s}
  .work .box:hover .tag h3{letter-spacing:.12rem;color:#ff5fa2}
  .work .box .btn i{transition:transform .3s}
  .work .box .btn:hover i{transform:scale(1.4) rotate(-10deg)}
  .proj-heart{position:fixed;z-index:9996;pointer-events:none;color:#ff5fa2;font-size:1.8rem;animation:floatUp 1.1s ease-out forwards}
  @keyframes floatUp{to{transform:translate(var(--dx),-90px) scale(1.6);opacity:0}}

  /* ---- CONTACT: staggered fields, wobbling gif, flying plane ---- */
  .contact .field,.contact .message{opacity:0;translate:0 40px;transition:opacity .6s,translate .6s cubic-bezier(.3,1.4,.5,1)}
  .contact.in-view .field,.contact.in-view .message{opacity:1;translate:0 0}
  .contact.in-view .field:nth-child(1){transition-delay:.1s}.contact.in-view .field:nth-child(2){transition-delay:.25s}
  .contact.in-view .field:nth-child(3){transition-delay:.4s}.contact.in-view .message{transition-delay:.55s}
  .contact .image-box img{animation:wobble 4s ease-in-out infinite}
  @keyframes wobble{0%,100%{rotate:-3deg;scale:1}50%{rotate:3deg;scale:1.04}}
  .contact button[type=submit] i{display:inline-block;transition:translate .3s}
  .contact button[type=submit]:hover i{translate:6px -6px}
  .contact button.sending i{animation:fly 1s ease-in forwards}
  @keyframes fly{to{translate:140px -90px;opacity:0;rotate:25deg}}
  .contact textarea,.contact input{transition:box-shadow .3s,translate .3s}
  .contact input:focus,.contact textarea:focus{translate:0 -3px}

  @media (prefers-reduced-motion:reduce){
    .skills .bar,.contact .field,.contact .message,.about .box-container .box p{opacity:1!important;translate:none!important;scale:1!important;rotate:none!important}
  }`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* mouse spotlight inside cards */
  document.addEventListener("mousemove", (e) => {
    const b = e.target.closest && e.target.closest(".education .box,.achievements .box,.work .box");
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", e.clientX - r.left + "px");
    b.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* about: orbiting sparkles */
  const aboutImg = document.querySelector(".about .image");
  if (aboutImg) {
    const o = document.createElement("div");
    o.className = "orbit";
    o.innerHTML = "<span>✦</span><span>♥</span><span>✿</span>";
    aboutImg.appendChild(o);
  }

  /* in-view triggers for about + contact (re-play every time) */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.target.classList.toggle("in-view", en.isIntersecting)),
    { threshold: 0.25 }
  );
  document.querySelectorAll(".about,.contact").forEach((s) => io.observe(s));

  /* skills: wave pop-in (works for JSON-loaded skills) + fisheye */
  const skillsSec = document.getElementById("skills");
  const cont = document.getElementById("skillsContainer");
  const bars = () => [...document.querySelectorAll("#skillsContainer .bar")];
  const skillIO = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return en.target.classList.remove("pop");
      en.target.style.transitionDelay = (bars().indexOf(en.target) % 8) * 70 + "ms";
      en.target.classList.add("pop");
    }),
    { threshold: 0.2 }
  );
  const watch = () => bars().forEach((b) => skillIO.observe(b));
  if (cont) { new MutationObserver(watch).observe(cont, { childList: true }); watch(); }

  if (skillsSec) {
    skillsSec.addEventListener("mousemove", (e) => {
      bars().forEach((b) => {
        const r = b.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        const img = b.querySelector("img");
        if (img) img.style.scale = 1 + Math.max(0, 1 - d / 190) * 0.7;
      });
    });
    skillsSec.addEventListener("mouseleave", () =>
      bars().forEach((b) => { const i = b.querySelector("img"); if (i) i.style.scale = 1; }));
  }

  /* projects: hearts float up while hovering a card */
  let lastHeart = 0;
  document.addEventListener("mousemove", (e) => {
    if (!e.target.closest || !e.target.closest(".work .box")) return;
    const t = performance.now();
    if (t - lastHeart < 260) return;
    lastHeart = t;
    const h = document.createElement("span");
    h.className = "proj-heart";
    h.textContent = "♥";
    h.style.left = e.clientX + "px";
    h.style.top = e.clientY + "px";
    h.style.setProperty("--dx", Math.random() * 60 - 30 + "px");
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1100);
  });

  /* contact: hearts pop while typing + plane flies on submit */
  document.addEventListener("input", (e) => {
    if (!e.target.closest || !e.target.closest(".contact")) return;
    const r = e.target.getBoundingClientRect();
    const h = document.createElement("span");
    h.className = "proj-heart";
    h.textContent = ["♥", "✦", "✿"][Math.floor(Math.random() * 3)];
    h.style.left = r.right - 30 + "px";
    h.style.top = r.top + r.height / 2 + "px";
    h.style.setProperty("--dx", Math.random() * 40 - 20 + "px");
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1100);
  });
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", () => {
      const b = form.querySelector("button[type=submit]");
      if (!b) return;
      b.classList.add("sending");
      setTimeout(() => b.classList.remove("sending"), 1400);
    });
  }
})();
