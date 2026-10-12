/* ==========================================================
   Tonight's Pick — prototype logic
   Views: home → setup → (hand-off → vote) per guest → result
   Votes: 2 = yes, 1 = maybe, 0 = not tonight
   ========================================================== */

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const state = {
  people: ["Joanne", "Riya", "Arun", "Meera"],
  moods: new Set(),
  langs: null,       // filled below with every language in the catalogue
  shortlist: [],
  votes: {},          // votes[person][filmId] = 0 | 1 | 2
  turn: 0,
  card: 0,
};

// each guest's profile creature (see avatars.js), kept in step with state.people
state.looks = ["moonshroom", "sproutling", "emberkit", "puddle"];
const look = p => state.looks[state.people.indexOf(p)];
function nextFreeLook() {
  return (AVATARS.find(a => !state.looks.includes(a.id)) || AVATARS[state.looks.length % AVATARS.length]).id;
}
const MOOD_LABEL = MOODS;
// Malayalam and English first, then the other Indian languages
const LANGS = ["Malayalam", "English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi"];
state.langs = new Set(LANGS);

// ---------- helpers ----------
function hash(s) { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; }
const hours = m => `${Math.floor(m / 60)} h ${m % 60} min`;

// a drawn poster: colours, light and title style come from the film's id and genre
function posterHTML(m, extra = "") {
  const h = hash(m.id);
  const hue = h % 360, hue2 = (hue + 30 + (h >> 7) % 90) % 360;
  const x = 20 + (h % 60), y = 15 + ((h >> 5) % 40);
  const style = m.moods.includes("romance") || m.genre.includes("Drama") ? "t-serif"
              : m.moods.includes("laugh") && !m.moods.includes("thrill") ? "t-script" : "t-sans";
  const pos = (h >> 3) % 2 ? "t-bottom" : "";
  const bg = `background:
      radial-gradient(circle at ${x}% ${y}%, hsl(${hue} 75% 62% / .9), transparent 32%),
      radial-gradient(ellipse at 50% 120%, hsl(${hue2} 60% 40%), transparent 60%),
      linear-gradient(170deg, hsl(${hue2} 45% 22%), hsl(${(hue + 200) % 360} 40% 9%));`;
  return `<div class="poster ${style} ${pos} ${extra}" style="${bg}" aria-hidden="true">
      <span class="p-title">${esc(m.title)}</span>
      <span class="p-foot">${m.year} · ${esc(m.lang)}</span>
    </div>`;
}

function go(view) {
  document.querySelectorAll(".view").forEach(v => (v.hidden = v.id !== `v-${view}`));
  $(`v-${view}`).scrollTop = 0;
  document.querySelectorAll(".side-link").forEach(b =>
    b.classList.toggle("is-active", b.dataset.go === (view === "home" ? "home" : "setup")));
  if (view === "setup") updateCount();
}
document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]");
  if (g) go(g.dataset.go);
});

// ---------- sidebar: guests + tonight's plan ----------
function renderSide() {
  const done = p => state.shortlist.length && state.shortlist.every(m => state.votes[p] && state.votes[p][m.id] !== undefined);
  $("side-guests").innerHTML = state.people.map((p, i) => `
    <li>${avatarSVG(state.looks[i], 30)}${esc(p)}
      ${done(p) ? '<span class="done" aria-label="voted">✓</span>' : ""}</li>`).join("");
}
const setPlan = text => ($("plan-movie").textContent = text);

// ---------- home ----------
$("banner-art").className = "banner-art home-art";
$("row-trending").innerHTML = MOVIES.slice().sort((a, b) => hash(a.id) % 50 - hash(b.id) % 50).slice(0, 10).map(m => posterHTML(m)).join("");

// ---------- setup ----------
function renderTickets() {
  $("tickets").innerHTML = state.people.map((p, i) => `
    <div class="ticket ${state.people.length <= 2 ? "no-remove" : ""}">
      <button class="t-pfp" data-pick="${i}" aria-label="Change ${esc(p)}'s profile picture">${avatarSVG(state.looks[i], 46)}<span class="t-edit" aria-hidden="true">✎</span></button>
      <span class="t-small">Admit one</span>
      <span class="t-name">${esc(p)}${i === 0 ? " <em>(host)</em>" : ""}</span>
      ${state.people.length > 2 ? `<button class="t-remove" data-remove="${i}" aria-label="Remove ${esc(p)}">×</button>` : ""}
    </div>`).join("");
  renderSide();
}
$("tickets").addEventListener("click", e => {
  const b = e.target.closest("[data-remove]");
  if (!b) return;
  state.people.splice(+b.dataset.remove, 1);
  state.looks.splice(+b.dataset.remove, 1);
  renderTickets(); updateCount();
});

// ---------- profile picture picker ----------
let picking = -1, pickerReturn = null;
function openPicker(i) {
  picking = i;
  pickerReturn = document.activeElement;
  const p = state.people[i];
  $("picker-title").textContent = `Pick ${p}'s movie buddy`;
  $("picker-grid").innerHTML = AVATARS.map(a => {
    const owner = state.people[state.looks.indexOf(a.id)];
    const mine = state.looks[i] === a.id;
    return `<button class="pick ${mine ? "is-mine" : ""}" data-look="${a.id}" aria-pressed="${mine}">
        ${avatarSVG(a.id, 76, false)}
        <span class="pick-name">${esc(a.name)}</span>
        <span class="pick-line">${esc(a.line)}</span>
        ${owner && !mine ? `<span class="pick-owner">${esc(owner)}'s</span>` : ""}
      </button>`;
  }).join("");
  $("picker").hidden = false;
  $("picker").querySelector(".is-mine")?.focus({ preventScroll: true });
}
function closePicker() {
  $("picker").hidden = true;
  if (pickerReturn && document.contains(pickerReturn)) pickerReturn.focus({ preventScroll: true });
}
$("tickets").addEventListener("click", e => {
  const b = e.target.closest("[data-pick]");
  if (b) openPicker(+b.dataset.pick);
});
$("picker-grid").addEventListener("click", e => {
  const b = e.target.closest("[data-look]");
  if (!b) return;
  const id = b.dataset.look, other = state.looks.indexOf(id);
  if (other !== -1 && other !== picking) state.looks[other] = state.looks[picking];   // swap with whoever had it
  state.looks[picking] = id;
  renderTickets();
  closePicker();
  const t = $("tickets").querySelectorAll(".t-pfp")[picking];
  if (t) t.focus({ preventScroll: true });
});
$("picker-close").addEventListener("click", closePicker);
$("picker").addEventListener("click", e => { if (e.target.id === "picker") closePicker(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("picker").hidden) closePicker(); });
$("add-ticket").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("new-name"), name = input.value.trim();
  if (!name || state.people.length >= 8) return;
  if (state.people.some(p => p.toLowerCase() === name.toLowerCase())) { input.select(); return; }
  state.people.push(name);
  state.looks.push(nextFreeLook());
  input.value = "";
  renderTickets(); updateCount();
});

const pill = (group, value, label, checked) =>
  `<label><input type="checkbox" name="${group}" value="${value}" ${checked ? "checked" : ""}><span>${esc(label)}</span></label>`;
$("moods").innerHTML = Object.entries(MOOD_LABEL).map(([k, v]) => pill("mood", k, v, false)).join("");
$("langs").innerHTML = LANGS.map(l => pill("lang", l, l, true)).join("");

document.addEventListener("change", e => {
  if (e.target.name === "mood") e.target.checked ? state.moods.add(e.target.value) : state.moods.delete(e.target.value);
  if (e.target.name === "lang") e.target.checked ? state.langs.add(e.target.value) : state.langs.delete(e.target.value);
  if (["mood", "lang", "time"].includes(e.target.name)) updateCount();
});

// films that fit the group's time, languages and mood; best mood matches first
function makeShortlist() {
  const limit = +document.querySelector('input[name="time"]:checked').value;
  return MOVIES.filter(m => m.mins <= limit && state.langs.has(m.lang))
    .map(m => ({ m, score: m.moods.filter(x => state.moods.has(x)).length }))
    .filter(x => state.moods.size === 0 || x.score > 0)
    .sort((a, b) => b.score - a.score || (b.m.fav ? 1 : 0) - (a.m.fav ? 1 : 0) || hash(a.m.id) % 97 - hash(b.m.id) % 97)
    .slice(0, 8).map(x => x.m);
}
function updateCount() {
  const n = makeShortlist().length, btn = $("build-list");
  btn.disabled = n === 0 || state.people.length < 2;
  btn.textContent = state.people.length < 2 ? "Add at least one friend"
    : n === 0 ? "No films match. Try fewer filters." : `Build our shortlist (${n} films)`;
}
$("build-list").addEventListener("click", () => {
  state.shortlist = makeShortlist();
  startVoting();
});

// ---------- voting ----------
const demoMode = () => $("demo-friends").checked;

function startVoting() {
  state.votes = {};
  state.people.forEach(p => (state.votes[p] = {}));
  state.turn = 0;
  if (demoMode()) fillDemoVotes();
  setPlan("being chosen…");
  renderSide();
  handOff();
}

// friends' votes come from their tastes (DEMO_TASTES in movies.js)
function fillDemoVotes() {
  state.people.slice(1).forEach((p, i) => {
    const taste = DEMO_TASTES[i % DEMO_TASTES.length];
    state.shortlist.forEach(m => {
      const score = m.moods.filter(x => taste.love.includes(x)).length
                  - m.moods.filter(x => taste.avoid.includes(x)).length
                  + ((hash(p + m.id) % 3) - 1) * 0.5;
      state.votes[p][m.id] = score >= 1 ? 2 : score >= 0 ? 1 : 0;
    });
  });
}

function handOff() {
  const p = state.people[state.turn];
  $("handoff-name").textContent = p;
  $("handoff-pfp").innerHTML = avatarSVG(look(p), 88);
  $("handoff-title").textContent = state.turn === 0 ? `${p}, you're up first` : `Pass the remote to ${p}`;
  $("handoff-note").textContent = demoMode()
    ? "Your friends' votes are already in. Your votes stay secret too."
    : `Guest ${state.turn + 1} of ${state.people.length}. Your votes stay secret until everyone's done.`;
  $("start-turn").textContent = `I'm ${p}, let's vote`;
  go("handoff");
  $("start-turn").focus({ preventScroll: true });
}
$("start-turn").addEventListener("click", () => {
  state.card = 0;
  go("vote");
  renderCard();
});

const card = $("card");
function renderShortlistRow() {
  const p = state.people[state.turn];
  $("row-shortlist").innerHTML = state.shortlist.map((m, i) => {
    const v = state.votes[p][m.id];
    const cls = i === state.card ? "is-current" : v !== undefined ? "is-done" : "";
    const mark = v === undefined ? "" : `<span class="mark v${v}">${["✕", "~", "♥"][v]}</span>`;
    return posterHTML(m, cls).replace("</div>", `${mark}</div>`);
  }).join("");
  const cur = $("row-shortlist").children[state.card];
  if (cur) $("row-shortlist").scrollTo({ left: cur.offsetLeft - 20, behavior: "smooth" });
  $("shortlist-note").textContent = `${state.shortlist.length} films for ${state.people.length} people`;
}
function renderCard() {
  const p = state.people[state.turn], m = state.shortlist[state.card];
  $("vote-who").innerHTML = `${avatarSVG(look(p), 26, false)}${esc(p)}`;
  $("vote-count").textContent = `Film ${state.card + 1} of ${state.shortlist.length}`;
  card.style.transform = ""; card.style.opacity = "";
  card.setAttribute("aria-label", `${m.title}, ${m.year}, ${m.lang}`);
  card.innerHTML = `
    ${posterHTML(m)}
    <div class="f-info">
      <h3>${esc(m.title)}</h3>
      <p class="f-meta">${m.year} · ${esc(m.lang)} · ${esc(m.genre)} · ${hours(m.mins)}</p>
      <div class="f-moods">${m.moods.map(x => `<span>${esc(MOOD_LABEL[x])}</span>`).join("")}</div>
      <p class="f-pitch">${esc(m.pitch)}</p>
    </div>
    <span class="stamp stamp-yes" aria-hidden="true">YES</span>
    <span class="stamp stamp-no" aria-hidden="true">NOPE</span>`;
  renderShortlistRow();
}

let busy = false;
function vote(v) {
  if (busy) return;
  busy = true;
  const p = state.people[state.turn], m = state.shortlist[state.card];
  state.votes[p][m.id] = v;
  const dir = v === 2 ? 1 : v === 0 ? -1 : 0;
  card.style.transform = `translate(${dir * 60}%, ${dir === 0 ? -16 : 0}px) rotate(${dir * 6}deg)`;
  card.style.opacity = "0";
  setTimeout(() => { busy = false; nextCard(); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
}
function nextCard() {
  state.card += 1;
  if (state.card < state.shortlist.length) return renderCard();
  renderSide();
  if (!demoMode() && state.turn < state.people.length - 1) { state.turn += 1; return handOff(); }
  showResult();
}
document.querySelectorAll(".vote").forEach(b => b.addEventListener("click", () => vote(+b.dataset.vote)));
document.addEventListener("keydown", e => {
  if ($("v-vote").hidden || e.target.closest("input")) return;
  if (e.key === "ArrowRight") vote(2);
  if (e.key === "ArrowLeft") vote(0);
  if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); vote(1); }
});

// drag the film: right = yes, left = not tonight
let drag = null;
card.addEventListener("pointerdown", e => {
  if (e.button !== 0) return;
  drag = { x: e.clientX, dx: 0 };
  card.setPointerCapture(e.pointerId);
  card.classList.add("dragging");
});
card.addEventListener("pointermove", e => {
  if (!drag) return;
  drag.dx = e.clientX - drag.x;
  card.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 40}deg)`;
  card.querySelector(".stamp-yes").style.opacity = Math.max(0, Math.min(1, drag.dx / 100));
  card.querySelector(".stamp-no").style.opacity = Math.max(0, Math.min(1, -drag.dx / 100));
});
function endDrag() {
  if (!drag) return;
  card.classList.remove("dragging");
  const dx = drag.dx; drag = null;
  if (dx > 100) vote(2);
  else if (dx < -100) vote(0);
  else { card.style.transform = ""; card.querySelectorAll(".stamp").forEach(s => (s.style.opacity = 0)); }
}
card.addEventListener("pointerup", endDrag);
card.addEventListener("pointercancel", endDrag);

// ---------- the fair pick ----------
// Least misery: highest lowest-vote first, then most yes votes, then the shorter film.
function rank() {
  return state.shortlist.map(m => {
    const vs = state.people.map(p => state.votes[p][m.id]);
    return {
      m, vs,
      worst: Math.min(...vs),
      yes: vs.filter(v => v === 2).length,
      maybe: vs.filter(v => v === 1).length,
      no: vs.filter(v => v === 0).length,
    };
  }).sort((a, b) => b.worst - a.worst || b.yes - a.yes || a.m.mins - b.m.mins);
}

function reasonFor(top, all) {
  const n = state.people.length;
  if (top.worst === 2) return `Everyone said yes. That's ${n} out of ${n}!`;
  if (top.worst === 1) {
    const beaten = all.find(r => r !== top && r.yes >= top.yes && r.no > 0);
    let text = `Nobody said "not tonight": ${top.yes} yes and ${top.maybe} maybe.`;
    if (beaten) text += ` ${beaten.m.title} had ${beaten.yes > top.yes ? "more" : "just as many"} yes votes, but ${beaten.no === 1 ? "someone" : beaten.no + " people"} really didn't want it.`;
    return text;
  }
  return `Every film got at least one "not tonight", so this is the one most of you wanted (${top.yes} yes, ${top.maybe} maybe). Try voting again on the top 3.`;
}

const MARK = { 2: ["♥", "yes"], 1: ["~", "maybe"], 0: ["✕", "not tonight"] };
function showResult() {
  const ranked = rank(), top = ranked[0], m = top.m;
  const h = hash(m.id), hue = h % 360, hue2 = (hue + 30 + (h >> 7) % 90) % 360;
  $("win-art").style.cssText = `background:
      radial-gradient(circle at 78% 35%, hsl(${hue} 75% 62% / .85), transparent 30%),
      radial-gradient(ellipse at 90% 100%, hsl(${hue2} 60% 40%), transparent 55%),
      linear-gradient(120deg, hsl(${hue2} 40% 14%), hsl(${(hue + 200) % 360} 40% 18%));`;
  $("result-title").textContent = m.title;
  $("win-meta").textContent = `${m.year} · ${m.lang} · ${m.genre} · ${hours(m.mins)}`;
  $("reason").textContent = reasonFor(top, ranked);
  $("toast").hidden = true;

  const head = `<tr><th scope="col">Film</th>${state.people.map(p => `<th scope="col">${avatarSVG(look(p), 30)}<span>${esc(p)}</span></th>`).join("")}</tr>`;
  const rows = ranked.slice(0, 5).map((r, i) => `<tr class="${i === 0 ? "top" : ""}"><td>${esc(r.m.title)}</td>${r.vs.map(v =>
    `<td class="v${v}"><span aria-hidden="true">${MARK[v][0]}</span><span class="sr">${MARK[v][1]}</span></td>`).join("")}</tr>`).join("");
  $("votes").innerHTML = `<thead>${head}</thead><tbody>${rows}</tbody>`;
  $("revote").hidden = state.shortlist.length <= 3;
  setPlan(m.title);
  renderSide();
  go("result");
}

$("play").addEventListener("click", () => {
  $("toast").textContent = "Lights down… enjoy the film! 🍿";
  $("toast").hidden = false;
});
$("revote").addEventListener("click", () => {
  state.shortlist = rank().slice(0, 3).map(r => r.m);
  startVoting();
});
$("restart").addEventListener("click", () => {
  state.shortlist = [];
  setPlan("not chosen yet");
  renderSide();
  go("setup");
});

// ---------- start ----------
setPlan("not chosen yet");
renderTickets();
updateCount();
go("home");
