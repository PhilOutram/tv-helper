// TV Helper - step-by-step picture guides for the Samsung TV and Panasonic recorder.
import { VERSION, CHANGELOG } from "./version.js?v=v0.04";
import { REMOTES, GUIDES } from "./guides.js?v=v0.04";
import { SCREENS } from "./screens.js?v=v0.04";
import { FAMILY_NOTES } from "./notes.js?v=v0.04";

const ZOOM             = 1.9;  // display pixels per pixel of the original remote photo crop
const ZOOM_HEIGHT      = 300;  // height of the zoomed remote window, px
const RING_SIZE        = 34;   // highlight ring diameter, in original photo pixels
const SPEECH_RATE      = 0.9;  // slightly slower than normal speech
const NEWS_SOURCE_STEP = 3;    // News guide step that starts from Netflix / Amazon

const app = document.getElementById("app");
const guideById = Object.fromEntries(GUIDES.map((g) => [g.id, g]));
let channelChoice = 0;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("resize", placeZooms);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") document.querySelector("[data-next]")?.click();
  if (e.key === "ArrowLeft") document.querySelector("[data-prev]")?.click();
});

render();
renderVersionBadge();

function render() {
  window.speechSynthesis?.cancel();
  const parts = location.hash.replace(/^#\/?/, "").split("/");
  if (parts[0] === "g" && guideById[parts[1]]) {
    const guide = guideById[parts[1]];
    const n = Math.min(Math.max(parseInt(parts[2], 10) || 1, 1), guide.steps.length);
    renderStep(guide, n);
  } else if (parts[0] === "family") {
    renderFamily();
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
}

function renderHome() {
  document.title = "TV Helper";
  app.innerHTML = `
    <header class="home-head">
      <h1>Hello! 👋</h1>
      <p class="lead">What would you like to watch? Tap a card.</p>
    </header>
    <div class="cards">
      ${GUIDES.map(
        (g) => `
        <a class="card card-${g.colour}" href="#/g/${g.id}/1">
          <span class="card-icon" aria-hidden="true">${g.icon}</span>
          <span class="card-text"><b>${g.title}</b><span>${g.sub}</span></span>
          <span class="card-go" aria-hidden="true">›</span>
        </a>
        ${g.id === "news"
          ? `<a class="card-extra" href="#/g/news/${NEWS_SOURCE_STEP}">
               Watching Netflix or Amazon and want the news? <b>Start here ›</b></a>`
          : ""}`
      ).join("")}
    </div>
    <section class="remotes-key">
      <h2>Your two remotes</h2>
      <div class="key-row">
        ${["S", "P"].map((r) => `
          <div class="key">
            <img src="${REMOTES[r].img}" alt="${REMOTES[r].name} remote" />
            <div><b>${REMOTES[r].name.toUpperCase()}</b><br>${REMOTES[r].nick}</div>
          </div>`).join("")}
      </div>
      <p class="muted">Lost? Press the house button <b>⌂</b> on the Samsung remote,
        then start a guide again.</p>
    </section>
    <a class="family-link" href="#/family">Notes for family</a>`;
}

function renderStep(guide, n) {
  const step = guide.steps[n - 1];
  const total = guide.steps.length;
  document.title = `${guide.title} - step ${n}`;
  const option = step.options ? step.options[channelChoice % step.options.length] : null;

  app.innerHTML = `
    <div class="guide guide-${guide.colour}">
      <div class="topbar">
        <a class="home-btn" href="#/">⌂ Home</a>
        <span class="topbar-title">${guide.icon} ${guide.title}</span>
        <button class="speak" type="button" aria-label="Read it to me">🔊</button>
      </div>
      <div class="progress" aria-label="Step ${n} of ${total}">
        ${guide.steps.map((_, i) => `<span class="${i < n ? "on" : ""}"></span>`).join("")}
      </div>
      <article class="step ${step.warn ? "warn" : ""}">
        <div class="step-num">Step ${n} of ${total}</div>
        <h2>${step.title}</h2>
        <p class="step-text">${step.text}</p>
        ${step.options ? renderOptions(step, option) : ""}
        ${step.note ? `<p class="note">${step.note}</p>` : ""}
        ${(step.remotes || []).map((rm) => renderRemote(rm, option)).join("")}
        ${step.screen ? `<div class="tv-label">The TV screen looks like this:</div>
          <div class="tv">${SCREENS[step.screen](option)}</div>` : ""}
        ${step.photo ? `<img class="photo" src="${step.photo.src}" alt="${step.photo.alt}" />` : ""}
        ${step.jump ? `<a class="jump" href="#/g/${step.jump.guide}/${step.jump.step}">
          ${step.jump.label} ›</a>` : ""}
      </article>
      <nav class="stepnav">
        ${n > 1
          ? `<a class="nav-btn back" data-prev href="#/g/${guide.id}/${n - 1}">◀ Back</a>`
          : `<a class="nav-btn back" data-prev href="#/">◀ Home</a>`}
        ${n < total
          ? `<a class="nav-btn next" data-next href="#/g/${guide.id}/${n + 1}">Next ▶</a>`
          : `<a class="nav-btn next" data-next href="#/">All done ✔</a>`}
      </nav>
    </div>`;

  app.querySelector(".speak").addEventListener("click", () => speak(step, option));
  app.querySelectorAll("[data-opt]").forEach((b) =>
    b.addEventListener("click", () => {
      channelChoice = Number(b.dataset.opt);
      renderStep(guide, n);
    })
  );
  placeZooms();
}

function renderOptions(step, option) {
  return `
    <div class="options">
      ${step.options.map((o, i) => `
        <button type="button" data-opt="${i}" class="${o === option ? "picked" : ""}">
          ${o.label}<small>${o.num.split("").join(" ")}</small></button>`).join("")}
    </div>
    <p class="press-big">Press <b>${option.num.split("").join(" then ")}</b></p>`;
}

// One remote: a small whole-remote picture with dots, beside a zoomed-in view with rings.
function renderRemote(rm, option) {
  const remote = REMOTES[rm.r];
  const btns = option && rm.order ? option.num.split("") : rm.btns;

  // Press order, grouped per button (101 puts "1" and "3" on the same button)
  const orders = {};
  btns.forEach((b, i) => (orders[b] = orders[b] ? `${orders[b]} & ${i + 1}` : `${i + 1}`));
  const unique = [...new Set(btns)];
  const pos = unique.map((b) => remote.buttons[b]);
  const xs = pos.map((p) => p[0]);
  const ys = pos.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const pctX = (x) => `${(x / remote.w) * 100}%`;
  const pctY = (y) => `${(y / remote.h) * 100}%`;

  return `
    <div class="remote">
      <div class="remote-name remote-${rm.r}">
        ${remote.name.toUpperCase()} remote <span>${remote.nick}</span>
      </div>
      <div class="remote-body">
        <div class="mini" style="aspect-ratio:${remote.w} / ${remote.h}">
          <img src="${remote.img}" alt="" />
          ${pos.map((p) => `<i class="dot" style="left:${pctX(p[0])};top:${pctY(p[1])}"></i>`)
            .join("")}
        </div>
        <div class="zoom" style="height:${ZOOM_HEIGHT}px" data-cx="${cx}" data-cy="${cy}"
             data-w="${remote.w}" data-h="${remote.h}">
          <div class="zoom-inner" style="width:${remote.w * ZOOM}px">
            <img src="${remote.img}" alt="${remote.name} remote" />
            ${unique.map((b) => {
              const [x, y] = remote.buttons[b];
              return `<span class="ring" style="left:${pctX(x)};top:${pctY(y)};
                width:${RING_SIZE * ZOOM}px;height:${RING_SIZE * ZOOM}px">
                ${rm.order ? `<em>${orders[b]}</em>` : ""}</span>`;
            }).join("")}
          </div>
        </div>
      </div>
    </div>`;
}

// Scroll each zoomed window so the highlighted buttons sit in the middle.
function placeZooms() {
  document.querySelectorAll(".zoom").forEach((z) => {
    const inner = z.firstElementChild;
    const fullW = z.dataset.w * ZOOM;
    const fullH = z.dataset.h * ZOOM;
    const clamp = (v, max) => (max <= 0 ? max / 2 : Math.min(Math.max(v, 0), max));
    const tx = clamp(z.dataset.cx * ZOOM - z.clientWidth / 2, fullW - z.clientWidth);
    const ty = clamp(z.dataset.cy * ZOOM - z.clientHeight / 2, fullH - z.clientHeight);
    inner.style.transform = `translate(${-tx}px, ${-ty}px)`;
  });
}

function speak(step, option) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const press = option ? ` Press ${option.num.split("").join(", then ")}.` : "";
  const words = `${step.title}. ${step.text}${press} ${step.note || ""}`
    .replace(/[◀▶▲▼]/g, (c) => ({ "◀": "left", "▶": "right", "▲": "up", "▼": "down" })[c])
    .replace(/–/g, "minus");
  const u = new SpeechSynthesisUtterance(words);
  u.lang = "en-GB";
  u.rate = SPEECH_RATE;
  speechSynthesis.speak(u);
}

function renderFamily() {
  document.title = "TV Helper - notes for family";
  app.innerHTML = `
    <div class="topbar"><a class="home-btn" href="#/">⌂ Home</a></div>
    <article class="family">${FAMILY_NOTES}</article>`;
}

function renderVersionBadge() {
  const badge = document.createElement("button");
  badge.className = "version-badge";
  badge.textContent = VERSION;
  badge.title = "Changelog";
  badge.addEventListener("click", showChangelog);
  document.body.appendChild(badge);
}

function showChangelog() {
  const overlay = document.createElement("div");
  overlay.className = "changelog-overlay";
  overlay.addEventListener("click", () => overlay.remove());

  const panel = document.createElement("div");
  panel.className = "changelog";
  panel.addEventListener("click", (e) => e.stopPropagation());
  panel.innerHTML =
    "<h2>Changelog</h2>" +
    CHANGELOG.map(
      (e) =>
        `<section><h3>${e.version} <span class="muted">${e.date}</span></h3>` +
        `<ul>${e.notes.map((n) => `<li>${n}</li>`).join("")}</ul></section>`
    ).join("");
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
}
