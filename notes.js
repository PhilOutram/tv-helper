// Setup notes for whoever looks after the TV. Not part of the step guides.

export const FAMILY_NOTES = `
<h1>Notes for family</h1>
<p>The kit: <b>Samsung UE43DU8000</b> TV (2024) and <b>Panasonic DMR-EX97</b> Freeview HD
recorder. The aerial goes into the recorder; the recorder feeds the TV by HDMI and also passes
the aerial on to the TV through its RF OUT socket.</p>

<h2>Why the TV's own picture is poor</h2>
<p>The TV gets its aerial signal second-hand, through the recorder's RF OUT loop-through.
That adds loss, and the recorder's manual says that in standby it only passes the signal on
if <b>Quick Start</b> is on or <b>RF OUT (Aerial Signal)</b> is set to On. A digital picture
that breaks up, freezes or says "no signal" is a weak-signal symptom.</p>

<h2>Getting a clear picture on the TV itself</h2>
<ol>
  <li><b>Free check first:</b> on the recorder press FUNCTION MENU &rarr; Setup &rarr;
    Basic Settings &rarr; Others &rarr; Standby Settings and set
    <b>RF OUT (Aerial Signal)</b> to <b>On</b>. Then retune the TV
    (Samsung Settings &rarr; Broadcasting &rarr; Auto Tuning) and use the HD channels
    (BBC One HD 101).</li>
  <li><b>Best fix:</b> stop looping through the recorder. Put a <b>2-way aerial splitter</b>
    on the wall cable and run one lead to the recorder's aerial IN and one straight to the
    TV. A passive splitter (about &pound;5-10) loses about 3.5 dB per leg, so if the signal is
    only just good enough, use a <b>powered 2-way distribution amplifier</b> instead
    (about &pound;20-35, e.g. Labgear, Philex or Triax). Use good double-screened coax fly
    leads, not the thin ones that come in the box.</li>
  <li>If it's still poor, the aerial itself needs a look (alignment, cable, masthead amp).
    Freeview's postcode checker shows which transmitter to point at.</li>
</ol>
<p>With a good signal on the TV, live TV needs only the Samsung remote (power, then the
channel number) and the recorder is just for recordings. The News guide would then shrink
to two steps.</p>

<h2>Making it one remote (worth trying)</h2>
<ul>
  <li><b>Panasonic remote controls the TV:</b> hold the small red <b>TV &#x23FB;</b> button
    and key <b>32</b>. If the TV doesn't respond, try 42, 43, 65 or 68 (Samsung codes from
    the recorder's manual). Then the remote's TV power, INPUT and VOL buttons work the
    Samsung.</li>
  <li><b>HDMI-CEC:</b> turn on <b>Anynet+ (HDMI-CEC)</b> on the Samsung (Settings &rarr;
    Connection &rarr; External Device Manager) and <b>VIERA Link</b> on the recorder
    (Basic Settings &rarr; TV System &rarr; HDMI Connection). The TV may then switch to the
    recorder by itself, and the Samsung remote's arrows and numbers may drive the recorder.
    Panasonic says this isn't guaranteed with other brands.</li>
</ul>

<h2>Other things to set up</h2>
<ul>
  <li><b>Amazon purchase PIN:</b> Prime Video settings &rarr; Parental Controls &rarr;
    purchase restrictions. Stops accidental rentals; the Rent guide tells her to ring you
    if it asks.</li>
  <li><b>Which HDMI?</b> The recorder is <b>HDMI3</b> in the Source list (between TV and
    Technicolor, probably the broadband router's media server). To make it plainer, in Source
    highlight HDMI3, press &#x25BC; and, if offered, choose <b>Edit</b> to rename it, e.g.
    "Recorder", then
    update step 4 of the News guide to match. HDMI3 also sits at the end of the app row on the
    home screen.</li>
  <li><b>Add to her home screen:</b> open this page on her phone or tablet, then Share
    &rarr; Add to Home Screen, so it opens like an app.</li>
</ul>
`;
