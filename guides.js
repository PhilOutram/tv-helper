// Remote photos and the step-by-step guides.
//
// Button positions are pixel centres measured on the ORIGINAL photo crops
// (Panasonic 224 x 790, Samsung 200 x 662). The webp files are those crops at 3x.

export const REMOTES = {
  P: {
    name: "Panasonic",
    nick: "the recorder remote (blue buttons)",
    img: "img/panasonic.webp",
    w: 224,
    h: 790,
    buttons: {
      power: [38, 75], tvpower: [82, 78], input: [82, 113], tvvol: [121, 95],
      1: [40, 158], 2: [78, 158], 3: [122, 158],
      4: [40, 197], 5: [78, 197], 6: [122, 197],
      7: [40, 234], 8: [78, 234], 9: [122, 234], 0: [80, 270],
      ch: [163, 197], guide: [109, 414], exit: [175, 402],
      up: [108, 455], down: [108, 518], left: [75, 486], right: [140, 486], ok: [108, 486],
      back: [178, 550], sttl: [175, 620],
    },
  },
  S: {
    name: "Samsung",
    nick: "the TV remote (thin, black)",
    img: "img/samsung.webp",
    w: 200,
    h: 662,
    buttons: {
      power: [43, 44], source: [138, 44],
      1: [46, 82], 2: [93, 82], 3: [140, 80], 0: [93, 185],
      vol: [46, 258], mute: [96, 232], ch: [143, 258],
      netflix: [46, 325], home: [96, 322], prime: [143, 322],
      up: [98, 368], down: [98, 452], left: [50, 409], right: [147, 409], ok: [98, 410],
      return: [52, 450], exit: [147, 450], pause: [118, 546], play: [82, 546],
    },
  },
};

// Each step: title, text, optional note / warn, then any of:
//   remotes: [{ r: "S" | "P", btns: [...], order: true }]  (order = number the presses)
//   screen:  name of a TV-screen drawing in screens.js
//   photo:   an extra picture
//   options: channel choices that swap the highlighted buttons
//   jump:    { guide, step, label } link to another guide
export const GUIDES = [
  {
    id: "news",
    icon: "📰",
    title: "Watch the News",
    sub: "BBC News or Sky News, with the good clear picture",
    colour: "news",
    steps: [
      {
        title: "Turn the TV on",
        text:
          "Press the red power button on the SAMSUNG remote. The TV's home screen " +
          "appears, with a big advert at the top. That's normal - just carry on.",
        note: "TV already on? Just go to the next step.",
        remotes: [{ r: "S", btns: ["power"] }],
        screen: "tvHome",
      },
      {
        title: "Turn the recorder on",
        text: "Press the red power button at the top-left of the PANASONIC remote.",
        note: "The good, clear picture comes from the recorder, so it must be on.",
        remotes: [{ r: "P", btns: ["power"] }],
        photo: { src: "img/recorder.webp", alt: "The Panasonic recorder" },
      },
      {
        title: "Press SOURCE",
        text: "On the SAMSUNG remote, press SOURCE (top-right corner).",
        remotes: [{ r: "S", btns: ["source"] }],
      },
      {
        title: "Pick the recorder",
        text:
          "A row of boxes appears along the bottom. Press ▶ to move to HDMI3 " +
          "(just right of TV), then press the middle OK button.",
        note: "HDMI3 is the recorder. Don't pick TV - that's the fuzzy picture.",
        remotes: [{ r: "S", btns: ["right", "ok"] }],
        screen: "source",
      },
      {
        title: "Choose the channel",
        text: "On the PANASONIC remote, press the numbers one after the other.",
        options: [
          { label: "BBC News", num: "231" },
          { label: "Sky News", num: "233" },
          { label: "BBC One", num: "101" },
        ],
        remotes: [{ r: "P", btns: ["2", "3", "1"], order: true }],
        screen: "channel",
      },
      {
        title: "Louder or quieter",
        text: "Use VOL + and – on the SAMSUNG remote.",
        remotes: [{ r: "S", btns: ["vol"] }],
      },
      {
        title: "Finished? Turn both off",
        text: "Press the red power button on BOTH remotes.",
        remotes: [{ r: "S", btns: ["power"] }, { r: "P", btns: ["power"] }],
        done: true,
      },
    ],
  },
  {
    id: "netflix",
    icon: "🎬",
    title: "Watch Netflix",
    sub: "Films and series on Netflix",
    colour: "netflix",
    logo: "netflix",
    steps: [
      {
        title: "Turn the TV on",
        text:
          "Press the red power button on the SAMSUNG remote and wait for the home " +
          "screen with the big advert.",
        note: "TV already on? Just go to the next step.",
        remotes: [{ r: "S", btns: ["power"] }],
        screen: "tvHome",
      },
      {
        title: "Press NETFLIX",
        text: "On the SAMSUNG remote, press the white NETFLIX button.",
        remotes: [{ r: "S", btns: ["netflix"] }],
      },
      {
        title: "Choose a profile",
        text:
          "Netflix asks you to choose a profile. John (the blue smiley face) is " +
          "already picked, so just press the middle OK button.",
        note: "Picked the wrong one? Use ▲ ▼ to move up and down the list.",
        remotes: [{ r: "S", btns: ["ok"] }],
        screen: "nfProfiles",
      },
      {
        title: "Have a look around",
        text:
          "Use ▲ ▼ to move between the rows and ◀ ▶ to move along a row. " +
          "Press OK on something you like, then OK again on Play.",
        remotes: [{ r: "S", btns: ["up", "down", "left", "right", "ok"] }],
        screen: "nfBrowse",
      },
      {
        title: "Looking for something by name?",
        text:
          "Keep pressing ◀ until a menu opens on the left. Go ▲ to the magnifying " +
          "glass (Search) and press OK. Spell the name with the arrows and OK.",
        remotes: [{ r: "S", btns: ["left", "up", "ok"] }],
        screen: "nfSearch",
      },
      {
        title: "While you're watching",
        text: "Press OK to pause, and OK again to carry on. Press RETURN to go back a screen.",
        remotes: [{ r: "S", btns: ["ok", "return"] }],
      },
      {
        title: "Back to the news, or off",
        text:
          "To see the news, follow the News guide from Press SOURCE. " +
          "To finish, press the red power button on the SAMSUNG remote.",
        remotes: [{ r: "S", btns: ["power"] }],
        jump: { guide: "news", step: 3, label: "Take me to the news" },
        done: true,
      },
    ],
  },
  {
    id: "prime",
    icon: "📺",
    title: "Amazon programmes",
    sub: "Series and films included with Prime",
    colour: "prime",
    logo: "prime",
    steps: [
      {
        title: "Turn the TV on",
        text:
          "Press the red power button on the SAMSUNG remote and wait for the home " +
          "screen with the big advert.",
        note: "TV already on? Just go to the next step.",
        remotes: [{ r: "S", btns: ["power"] }],
        screen: "tvHome",
      },
      {
        title: "Press prime video",
        text: "On the SAMSUNG remote, press the white prime video button.",
        remotes: [{ r: "S", btns: ["prime"] }],
      },
      {
        title: "Who's watching?",
        text: "Use the arrows to move to your name, then press the middle OK button.",
        remotes: [{ r: "S", btns: ["left", "right", "ok"] }],
        screen: "pvProfiles",
      },
      {
        title: "Free, or costs extra?",
        text:
          "Look under each picture. “Included with Prime” and a blue tick means " +
          "it's free to watch. A little shopping bag means it costs extra.",
        screen: "pvBadges",
      },
      {
        title: "Find a programme",
        text:
          "Use the arrows to look along the rows. To search by name, keep pressing " +
          "◀ until the menu opens on the left, go ▲ to the magnifying glass and press OK.",
        remotes: [{ r: "S", btns: ["up", "down", "left", "right", "ok"] }],
        screen: "pvMenu",
      },
      {
        title: "Start watching",
        text:
          "Press OK on the programme. For a series, move ▼ to pick the series and " +
          "episode. Then press OK on Play.",
        remotes: [{ r: "S", btns: ["down", "ok"] }],
        screen: "pvPlay",
      },
      {
        title: "While you're watching",
        text: "Press OK to pause, and OK again to carry on. Press RETURN to go back a screen.",
        remotes: [{ r: "S", btns: ["ok", "return"] }],
      },
      {
        title: "Back to the news, or off",
        text:
          "To see the news, follow the News guide from Press SOURCE. " +
          "To finish, press the red power button on the SAMSUNG remote.",
        remotes: [{ r: "S", btns: ["power"] }],
        jump: { guide: "news", step: 3, label: "Take me to the news" },
        done: true,
      },
    ],
  },
  {
    id: "rent",
    icon: "🎟️",
    title: "Rent a film on Amazon",
    sub: "For example Les Misérables",
    colour: "rent",
    logo: "prime",
    steps: [
      {
        title: "Turn the TV on",
        text:
          "Press the red power button on the SAMSUNG remote and wait for the home " +
          "screen with the big advert.",
        note: "TV already on? Just go to the next step.",
        remotes: [{ r: "S", btns: ["power"] }],
        screen: "tvHome",
      },
      {
        title: "Press prime video",
        text: "On the SAMSUNG remote, press the white prime video button.",
        remotes: [{ r: "S", btns: ["prime"] }],
      },
      {
        title: "Who's watching?",
        text: "Use the arrows to move to your name, then press the middle OK button.",
        remotes: [{ r: "S", btns: ["left", "right", "ok"] }],
        screen: "pvProfiles",
      },
      {
        title: "Open Search",
        text:
          "Keep pressing ◀ until the menu opens on the left. Go ▲ to the " +
          "magnifying glass and press OK.",
        remotes: [{ r: "S", btns: ["left", "up", "ok"] }],
        screen: "pvMenu",
      },
      {
        title: "Spell the name",
        text:
          "Use the arrows to move to each letter and press OK: L E S, space, M I S. " +
          "Then press ▶ to move across to the pictures and press OK on Les Misérables.",
        remotes: [{ r: "S", btns: ["up", "down", "left", "right", "ok"] }],
        screen: "pvKeyboard",
      },
      {
        title: "Rent or Buy?",
        text:
          "The film's page shows Rent and Buy with prices. Move to the one you " +
          "want and press OK. Choose HD for the best picture.",
        note:
          "Rent: start it within 30 days, then you have 48 hours to finish. " +
          "Buy: yours to keep and watch again.",
        remotes: [{ r: "S", btns: ["down", "right", "ok"] }],
        screen: "pvRentBuy",
      },
      {
        title: "Check the price, then confirm",
        text:
          "The TV shows the price. Press OK on the confirm button to pay. " +
          "It goes on the Amazon account.",
        note: "If it asks for a PIN and you don't know it, stop and ring the family.",
        remotes: [{ r: "S", btns: ["ok"] }],
        screen: "pvConfirm",
      },
      {
        title: "Careful: avoid “free trial”",
        text:
          "Don't press buttons that say “Start free trial”, “Subscribe” or “Join”. " +
          "Those start a monthly payment. Press RETURN to get away from them.",
        remotes: [{ r: "S", btns: ["return"] }],
        screen: "pvTrial",
        warn: true,
      },
      {
        title: "Watch it",
        text:
          "Press OK on Play. To find the film again later, open the menu on the " +
          "left (◀) and choose My Stuff.",
        remotes: [{ r: "S", btns: ["ok", "left"] }],
        screen: "pvPlayFilm",
        done: true,
      },
    ],
  },
];
