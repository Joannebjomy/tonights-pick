// Little movie-night creatures for profile pictures.
// Original designs, drawn as SVG so they stay sharp at any size.

const face = (y, opts = {}) => {
  const eye = opts.light
    ? (x) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff8ea"/><circle cx="${x}" cy="${y + 0.6}" r="3.2" fill="#24181a"/><circle cx="${x + 1.2}" cy="${y - 0.8}" r="1.1" fill="#fff"/>`
    : (x) => `<circle cx="${x}" cy="${y}" r="4.2" fill="#24181a"/><circle cx="${x + 1.3}" cy="${y - 1.3}" r="1.5" fill="#fff"/>`;
  const gap = opts.gap ?? 8;
  return `${eye(50 - gap)}${eye(50 + gap)}
    <ellipse cx="${50 - gap - 7}" cy="${y + 6}" rx="4.5" ry="2.6" fill="#ff8fa3" opacity=".55"/>
    <ellipse cx="${50 + gap + 7}" cy="${y + 6}" rx="4.5" ry="2.6" fill="#ff8fa3" opacity=".55"/>
    <path d="M46 ${y + 6} Q50 ${y + 10} 54 ${y + 6}" fill="none" stroke="#24181a" stroke-width="2" stroke-linecap="round"/>`;
};
const shadow = `<ellipse cx="50" cy="93" rx="26" ry="4" fill="#000" opacity=".25"/>`;

const AVATARS = [
  {
    id: "moonshroom", name: "Moonshroom", line: "Shy, but glows when the film starts",
    bg: "#2e4a40",
    svg: `${shadow}
      <ellipse cx="50" cy="74" rx="21" ry="18" fill="#f4e6cf"/>
      <path d="M12 56 Q14 16 50 15 Q86 16 88 56 Q50 67 12 56Z" fill="#3f6b5c"/>
      <circle cx="32" cy="38" r="5" fill="#ffd77a"/><circle cx="52" cy="28" r="6" fill="#ffd77a"/>
      <circle cx="70" cy="42" r="4.5" fill="#ffd77a"/><circle cx="44" cy="48" r="3" fill="#ffd77a"/>
      <path d="M22 58 q2 8 -1 14 M78 58 q-2 8 1 14" stroke="#7fb06a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${face(74, { gap: 7 })}`,
  },
  {
    id: "sproutling", name: "Sproutling", line: "Grows a new leaf every rom-com",
    bg: "#3d4f25",
    svg: `${shadow}
      <path d="M50 42 V28" stroke="#5d8f3f" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 30 Q34 12 22 24 Q36 38 50 30Z" fill="#7fbf55"/>
      <path d="M50 30 Q66 12 78 24 Q64 38 50 30Z" fill="#6aad46"/>
      <ellipse cx="50" cy="66" rx="29" ry="27" fill="#bcd86c"/>
      <ellipse cx="50" cy="76" rx="15" ry="11" fill="#d7e99a"/>
      ${face(62)}`,
  },
  {
    id: "emberkit", name: "Emberkit", line: "Loves action films and spicy snacks",
    bg: "#5a2a1c",
    svg: `${shadow}
      <path d="M20 58 L6 46 L12 66Z M80 58 L94 46 L88 66Z" fill="#d9673f"/>
      <path d="M36 42 L32 26 L44 38Z M64 42 L68 26 L56 38Z" fill="#fff1c7"/>
      <ellipse cx="50" cy="64" rx="28" ry="28" fill="#f29a5b"/>
      <ellipse cx="50" cy="76" rx="16" ry="13" fill="#ffd9a8"/>
      <path d="M44 38 l3 -5 l3 5 l3 -5 l3 5" fill="none" stroke="#d9673f" stroke-width="2.5" stroke-linejoin="round"/>
      ${face(60)}`,
  },
  {
    id: "blinko", name: "Blinko", line: "Never blinks during a thriller",
    bg: "#3b2b5e",
    svg: `${shadow}
      <path d="M36 32 L32 20 L42 29Z M64 32 L68 20 L58 29Z" fill="#7a55b8"/>
      <path d="M22 82 Q19 30 50 28 Q81 30 78 82 Q72 90 66 82 Q60 91 54 82 Q48 91 42 82 Q36 91 30 82 Q26 90 22 82Z" fill="#a988e0"/>
      <circle cx="50" cy="52" r="13" fill="#fff8ea"/><circle cx="50" cy="53" r="7.5" fill="#24181a"/><circle cx="53" cy="49.5" r="2.5" fill="#fff"/>
      <ellipse cx="33" cy="68" rx="4.5" ry="2.6" fill="#ff8fa3" opacity=".6"/><ellipse cx="67" cy="68" rx="4.5" ry="2.6" fill="#ff8fa3" opacity=".6"/>
      <path d="M42 70 Q50 78 58 70" fill="#5b2a3a"/>
      <circle cx="30" cy="46" r="2.5" fill="#8f6bcc"/><circle cx="70" cy="60" r="3" fill="#8f6bcc"/>`,
  },
  {
    id: "puddle", name: "Puddle", line: "Cries at every ending, happily",
    bg: "#5c2d45",
    svg: `${shadow}
      <path d="M22 50 q-14 -6 -16 -14 M20 58 q-15 0 -18 -6 M23 66 q-12 6 -17 2" stroke="#e98ab0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M78 50 q14 -6 16 -14 M80 58 q15 0 18 -6 M77 66 q12 6 17 2" stroke="#e98ab0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="62" rx="30" ry="28" fill="#f7bdd2"/>
      <ellipse cx="50" cy="76" rx="16" ry="11" fill="#fbd6e3"/>
      ${face(58)}`,
  },
  {
    id: "nightbit", name: "Nightbit", line: "Only watches after midnight",
    bg: "#211b33",
    svg: `${shadow}
      <path d="M26 60 Q6 44 4 66 Q14 62 18 72 Q22 64 28 70Z M74 60 Q94 44 96 66 Q86 62 82 72 Q78 64 72 70Z" fill="#3a2f52"/>
      <path d="M32 44 L28 18 L46 38Z M68 44 L72 18 L54 38Z" fill="#4e4170"/>
      <ellipse cx="50" cy="62" rx="27" ry="27" fill="#5b4d82"/>
      <ellipse cx="50" cy="74" rx="14" ry="10" fill="#7466a0"/>
      ${face(58, { light: true })}
      <path d="M44 64 l1.5 3 l1.5 -3" fill="#fff"/>`,
  },
  {
    id: "snowpuff", name: "Snowpuff", line: "Brings the blanket, always",
    bg: "#2c3e5c",
    svg: `${shadow}
      <path d="M34 34 L30 22 L40 30Z M66 34 L70 22 L60 30Z" fill="#7ea8e0"/>
      <g fill="#eef3ff"><circle cx="34" cy="48" r="16"/><circle cx="66" cy="48" r="16"/><circle cx="50" cy="40" r="17"/>
      <circle cx="28" cy="68" r="17"/><circle cx="72" cy="68" r="17"/><circle cx="50" cy="74" r="20"/></g>
      <ellipse cx="50" cy="58" rx="17" ry="14" fill="#c7dbf5"/>
      ${face(56, { gap: 7 })}`,
  },
  {
    id: "kernel", name: "Kernel", line: "In charge of the popcorn",
    bg: "#5a2320",
    svg: `${shadow}
      <path d="M26 54 L74 54 L68 92 L32 92Z" fill="#fff4dc"/>
      <path d="M33 54 L41 54 L40 92 L35 92Z M50 54 L58 54 L55 92 L50 92Z M67 54 L74 54 L68 92 L65 92Z" fill="#d9503f" opacity=".95"/>
      <g fill="#fff3d0"><circle cx="34" cy="48" r="10"/><circle cx="50" cy="40" r="13"/><circle cx="66" cy="48" r="10"/>
      <circle cx="42" cy="50" r="9"/><circle cx="58" cy="50" r="9"/></g>
      <g fill="#f2c27a" opacity=".6"><circle cx="45" cy="36" r="3"/><circle cx="62" cy="44" r="2.5"/></g>
      ${face(68, { gap: 9 })}`,
  },
  {
    id: "glimmer", name: "Glimmer", line: "Picks the movie by vibes",
    bg: "#4f421c",
    svg: `${shadow}
      <path d="M50 14 L60 38 L86 40 L66 57 L73 83 L50 69 L27 83 L34 57 L14 40 L40 38Z" fill="#ffd36b" stroke="#ffd36b" stroke-width="8" stroke-linejoin="round"/>
      <path d="M50 24 L57 40 L74 42" fill="none" stroke="#fff3c4" stroke-width="3" stroke-linecap="round" opacity=".8"/>
      ${face(54, { gap: 7 })}
      <circle cx="84" cy="20" r="2" fill="#fff3c4"/><circle cx="16" cy="24" r="1.6" fill="#fff3c4"/>`,
  },
];

function avatarSVG(id, size = 40, ring = true) {
  const a = AVATARS.find(x => x.id === id) || AVATARS[0];
  return `<span class="pfp${ring ? "" : " no-ring"}" style="--s:${size}px;--bg:${a.bg}" aria-hidden="true">
    <svg viewBox="0 0 100 100">${a.svg}</svg></span>`;
}
