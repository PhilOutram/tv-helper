// Simple drawings of what the TV screen shows at each step.
// Not real screenshots - just enough to recognise the screen. The yellow glow marks
// where to go.

const tile = (label, cls = "") => `<div class="tile ${cls}">${label}</div>`;
const poster = (label, cls = "") => `<div class="poster ${cls}"><span>${label}</span></div>`;

export const SCREENS = {
  source: () => `
    <div class="scr scr-home">
      <div class="scr-caption">Sources</div>
      <div class="row">
        ${tile("📺<br>TV")}
        ${tile("HDMI<br><small>Panasonic</small>", "hot")}
        ${tile("HDMI 2")}
        ${tile("USB")}
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
