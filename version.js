export const VERSION = "v0.04";

// Newest first. Bump VERSION and prepend an entry on EVERY publish, so the live
// app always shows exactly what shipped. Dates are YYYY-MM-DD.
export const CHANGELOG = [
  {
    version: "v0.04",
    date: "2026-10-27",
    notes: [
      "Netflix and Amazon guides now start by turning the TV on - the app buttons don't.",
    ],
  },
  {
    version: "v0.03",
    date: "2026-10-27",
    notes: ["Netflix guide: the profile screen now matches the real one (John, then OK)."],
  },
  {
    version: "v0.02",
    date: "2026-10-27",
    notes: [
      "News guide: the recorder is HDMI3 in the Source list, drawn to match the real TV.",
      "Turning the TV on now shows its home screen with the advert, so it looks familiar.",
    ],
  },
  {
    version: "v0.01",
    date: "2026-10-27",
    notes: [
      "Four picture guides: News, Netflix, Amazon programmes, rent a film.",
      "Notes for family on getting a clearer aerial signal to the TV.",
    ],
  },
];
