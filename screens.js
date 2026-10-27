// Simple drawings of what the TV screen shows at each step.
// Not real screenshots - just enough to recognise the screen. The yellow glow marks
// where to go.

const tile = (label, cls = "") => `<div class="tile ${cls}">${label}</div>`;
const poster = (label, cls = "") => `<div class="poster ${cls}"><span>${label}</span></div>`;

export const SCREENS = {
  // The Samsung home screen: a big advert at the top and a row of apps along the bottom.
  tvHome: () => `
    <div class="scr scr-tvhome">
      <div class="side">👤<br>🔍<br>⌂</div>
      <div class="ad">Big advert<small>(changes every day)</small></div>
      <div class="tabs"><span class="on">For You</span><span>Live</span><span>Apps</span></div>
      <div class="apps">
        <span>Live TV</span><span class="a-nf">NETFLIX</span><span class="a-pv">prime video</span>
        <span>iPlayer</span><span>…</span><span class="a-hdmi">HDMI3</span>
      </div>
    </div>`,

  // The Source bar along the bottom of the picture. HDMI3 is the Panasonic recorder.
  source: () => `
    <div class="scr scr-src">
      <div class="srcbar">
        <span>✳<br>SmartThings</span>
        <span class="on">📺<br>TV</span>
        <span class="hot">▭<br>HDMI3</span>
        <span>▭<br>Technicolor…</span>
        <span>⇄<br>Connection Guide</span>
      </div>
    </div>`,

  channel: (opt) => `
    <div class="scr scr-live">
      <div class="live-pic">${opt ? opt.label : "BBC News"}</div>
      <div class="banner"><b>${opt ? opt.num : "231"}</b> ${opt ? opt.label : "BBC News"}
        <span class="banner-sub">Now: the news</span></div>
    </div>`,

  nfProfiles: () => `
    <div class="scr scr-nf">
      <div class="scr-title">Who's watching?</div>
      <div class="row profiles">
        <div class="prof p1 hot"></div><div class="prof p2"></div><div class="prof p3"></div>
      </div>
    </div>`,

  nfBrowse: () => `
    <div class="scr scr-nf">
      <div class="nf-logo">NETFLIX</div>
      <div class="rowlabel">Continue watching</div>
      <div class="row">${poster("", "hot")}${poster("")}${poster("")}${poster("")}</div>
      <div class="rowlabel">Popular</div>
      <div class="row">${poster("")}${poster("")}${poster("")}${poster("")}</div>
    </div>`,

  nfSearch: () => `
    <div class="scr scr-nf scr-split">
      <div class="sidemenu">
        <div class="hot">🔍 Search</div><div>⌂ Home</div><div>Series</div><div>Films</div>
      </div>
      <div class="split-main"><div class="row">${poster("")}${poster("")}${poster("")}</div></div>
    </div>`,

  pvProfiles: () => `
    <div class="scr scr-pv">
      <div class="scr-title">Who's watching?</div>
      <div class="row profiles">
        <div class="prof q1 hot"></div><div class="prof q2"></div><div class="prof q3"></div>
      </div>
    </div>`,

  pvBadges: () => `
    <div class="scr scr-pv">
      <div class="row badges">
        <div class="bcard">${poster("")}<div class="badge free">✔ Included with Prime</div></div>
        <div class="bcard">${poster("")}<div class="badge paid">🛍 Rent or buy</div></div>
      </div>
    </div>`,

  pvMenu: () => `
    <div class="scr scr-pv scr-split">
      <div class="sidemenu">
        <div class="hot">🔍 Search</div><div>⌂ Home</div><div>Films</div><div>TV</div>
        <div>My Stuff</div>
      </div>
      <div class="split-main"><div class="row">${poster("")}${poster("")}${poster("")}</div></div>
    </div>`,

  pvPlay: () => `
    <div class="scr scr-pv scr-detail">
      <div class="d-title">A programme</div>
      <div class="badge free">✔ Included with Prime</div>
      <div class="row">${tile("▶ Play", "btn hot")}${tile("Episodes", "btn")}</div>
    </div>`,

  pvKeyboard: () => `
    <div class="scr scr-pv scr-split">
      <div class="kbd">
        <div class="typed">LES MIS</div>
        <div class="keys">${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          .split("")
          .map((c) => `<span${c === "S" ? ' class="hot"' : ""}>${c}</span>`)
          .join("")}<span class="wide">space</span></div>
      </div>
      <div class="split-main"><div class="row">
        ${poster("Les Misérables", "hot tall")}${poster("", "tall")}
      </div></div>
    </div>`,

  pvRentBuy: () => `
    <div class="scr scr-pv scr-detail">
      <div class="d-title">Les Misérables</div>
      <div class="badge paid">🛍 Rent or buy</div>
      <div class="row">${tile("Rent HD £", "btn hot")}${tile("Buy HD £", "btn")}${tile("+", "btn sq")}</div>
    </div>`,

  pvConfirm: () => `
    <div class="scr scr-pv scr-dialog">
      <div class="dialog">
        <div>Rent <b>Les Misérables</b> (HD)</div>
        <div class="price">£ price shown here</div>
        <div class="row">${tile("Confirm", "btn hot")}${tile("Cancel", "btn")}</div>
      </div>
    </div>`,

  pvTrial: () => `
    <div class="scr scr-pv scr-detail">
      <div class="d-title">Some channel</div>
      <div class="row">
        <div class="tile btn nope">Start free trial</div>
        <div class="tile btn nope">Subscribe</div>
      </div>
    </div>`,

  pvPlayFilm: () => `
    <div class="scr scr-pv scr-detail">
      <div class="d-title">Les Misérables</div>
      <div class="row">${tile("▶ Play", "btn hot")}${tile("Trailer", "btn")}</div>
    </div>`,
};
