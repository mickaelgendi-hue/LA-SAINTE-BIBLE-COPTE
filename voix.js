/* =========================================================
   La Sainte Bible copte : lecture à voix haute (voix.js)
   Tout ce qui concerne la voix est dans ce fichier.
   Marche sans internet avec les voix installées sur l'appareil.
   ========================================================= */
(function(){
  // ---------- Ambiances de voix ----------
  // rate = vitesse, pitch = hauteur, pause = silence entre deux versets (ms)
  const AMBIANCES = {
    douce:    {label:"🌸 Douce",    rate:0.88, pitch:1.06, pause:420},
    radieuse: {label:"☀️ Radieuse", rate:0.95, pitch:1.14, pause:330},
    calme:    {label:"🕊️ Calme",    rate:0.80, pitch:0.98, pause:550},
    normale:  {label:"Normale",     rate:1.00, pitch:1.00, pause:250}
  };
  const VITESSES = [["0.85","Lente"],["1","Normale"],["1.15","Rapide"],["1.35","Très rapide"]];

  // Voix connues pour être naturelles et agréables (classement)
  const BELLES = /(natural|neural|naturel|premium|enhanced|améliorée|amelioree|wavenet|studio)/i;
  const DOUCES = /(amélie|amelie|audrey|aurélie|aurelie|marie|julie|denise|hortense|léa|lea|céline|celine|virginie|eloise|éloïse|vivienne|sylvie|chantal|google français|google francais)/i;

  // ---------- Style ----------
  const css = `
.ttsbar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);width:min(560px,calc(100% - 20px));background:linear-gradient(135deg,#6b1e1e,#8a2c2c);color:#fff;border-radius:18px;box-shadow:0 10px 30px -10px rgba(60,20,10,.55);padding:10px 12px;z-index:26;display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-family:var(--sans)}
.ttsbar[hidden]{display:none}
.ttsbar button{border:0;border-radius:999px;background:rgba(255,255,255,.16);color:#fff;font:600 14px var(--sans);padding:8px 12px;cursor:pointer}
.ttsbar button.big{background:#fff;color:#6b1e1e;min-width:46px;font-size:16px}
.ttsbar select{border-radius:10px;border:0;padding:6px;font:13px var(--sans);max-width:150px;background:#fff;color:#3a1a12}
.ttsbar .tl{flex:1 1 100%;font:13px var(--sans);opacity:.95;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ttsbar .tt-help{flex:1 1 100%;background:rgba(255,255,255,.12);border-radius:12px;padding:10px 12px;font-size:13px;line-height:1.45}
.ttsbar .tt-help[hidden]{display:none}
.ttsbar .tt-help b{color:#ffe7b8}
#rt p.speaking{background:rgba(176,141,87,.22);border-radius:8px;box-shadow:0 0 0 4px rgba(176,141,87,.22);transition:background .3s}
body.tts-on .wrap{padding-bottom:220px}
body.notes-on .ttsbar{left:calc((100vw - var(--npw))/2);width:min(560px,calc(100vw - var(--npw) - 16px))}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---------- Barre de lecture ----------
  const bar = document.createElement("div");
  bar.className = "ttsbar"; bar.id = "ttsbar"; bar.hidden = true;
  bar.innerHTML = `
  <div class="tl" id="ttsLbl">🔊 Lecture à voix haute</div>
  <button id="ttsPrev" aria-label="Verset précédent">⏮</button>
  <button class="big" id="ttsPlay" aria-label="Lecture / pause">⏸</button>
  <button id="ttsNext" aria-label="Verset suivant">⏭</button>
  <select id="ttsAmb" aria-label="Ambiance de la voix">${Object.entries(AMBIANCES).map(([k,a])=>`<option value="${k}">${a.label}</option>`).join("")}</select>
  <select id="ttsRate" aria-label="Vitesse">${VITESSES.map(([v,l])=>`<option value="${v}">${l}</option>`).join("")}</select>
  <select id="ttsVoice" aria-label="Voix"></select>
  <button id="ttsHelpB" aria-label="Conseils pour une plus belle voix">💡</button>
  <button id="ttsStop" aria-label="Arrêter">✕</button>
  <div class="tt-help" id="ttsHelp" hidden>
    <b>Pour une voix encore plus douce</b>, installe une voix française de haute qualité sur ton téléphone (gratuit, une seule fois, puis elle marche sans internet) :<br>
    • <b>iPhone / iPad</b> : Réglages → Accessibilité → Contenu énoncé → Voix → Français → choisis « Amélie » ou « Audrey » en version <b>améliorée</b> ou <b>premium</b> et télécharge-la.<br>
    • <b>Android</b> : Paramètres → Accessibilité (ou Gestion globale) → Synthèse vocale → moteur Google → Installer les données vocales → Français → choisis une voix et télécharge-la.<br>
    • <b>Ordinateur</b> : Edge propose des voix « Natural » très douces (avec internet).<br>
    Ensuite, ferme et rouvre l'app : la meilleure voix est choisie toute seule (marquée ⭐).
  </div>`;
  document.body.appendChild(bar);
  const $ = id => document.getElementById(id);

  // ---------- Moteur ----------
  window.TTS = {on:false, playing:false, i:0, chunks:[], ci:0, list:[], gen:0};
  const ok = () => "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  const amb = () => AMBIANCES[$("ttsAmb").value] || AMBIANCES.douce;

  function score(v){
    let s = 0;
    if (/^fr[-_]FR/i.test(v.lang)) s += 6; else if (/^fr/i.test(v.lang)) s += 3;
    if (BELLES.test(v.name)) s += 40;
    if (DOUCES.test(v.name)) s += 15;
    if (v.localService) s += 12;           // marche sans internet
    else if (!navigator.onLine) s -= 100;  // voix en ligne inutilisable hors connexion
    if (/compact|espeak|robot/i.test(v.name)) s -= 30;
    return s;
  }
  function voixFr(){
    if (!ok()) return [];
    const all = speechSynthesis.getVoices(), fr = all.filter(v => /^fr/i.test(v.lang));
    return (fr.length ? fr : all).slice().sort((a,b) => score(b) - score(a));
  }
  function nomVoix(v, best){
    const q = /(améliorée|amelioree|premium|enhanced|natural)/i.exec(v.name); const n = (v.name.replace(/Microsoft |Google |Apple |\(.*?\)|- French.*$|French/gi, "").replace(/\s+/g," ").trim() || v.name) + (q ? " (" + q[1].toLowerCase().replace("enhanced","améliorée") + ")" : "");
    return (best ? "⭐ " : "") + n + (v.localService ? "" : " (internet)");
  }
  function remplirVoix(){
    const s = $("ttsVoice"), vs = voixFr();
    if (!vs.length){ s.innerHTML = '<option value="">Voix par défaut</option>'; return; }
    s.innerHTML = vs.map((v,i) => `<option value="${esc(v.voiceURI)}">${esc(nomVoix(v, i===0 && score(v)>=20))}</option>`).join("");
    const pref = (state.ttsVoice && vs.find(v => v.voiceURI === state.ttsVoice)) || vs[0];
    s.value = pref.voiceURI;
  }
  if (ok()){ remplirVoix(); speechSynthesis.onvoiceschanged = remplirVoix; }
  $("ttsAmb").value = AMBIANCES[state.ttsAmb] ? state.ttsAmb : "douce";
  $("ttsRate").value = VITESSES.some(v => v[0] === String(state.ttsSpeed)) ? String(state.ttsSpeed) : "1";

  function decouper(t){
    t = t.replace(/\s+/g," ").trim(); const out = []; let cur = "";
    for (const s of t.split(/(?<=[.;:!?])\s+/)){
      if ((cur+" "+s).length > 220 && cur){ out.push(cur); cur = s; } else cur = cur ? cur+" "+s : s;
    }
    if (cur) out.push(cur);
    return out.flatMap(c => c.length <= 260 ? [c] : c.match(/.{1,240}(\s|$)/g));
  }
  function marquer(){
    document.querySelectorAll("#rt p.speaking").forEach(p => p.classList.remove("speaking"));
    const v = TTS.list[TTS.i]; if (v == null) return;
    const p = document.querySelector(`#rt p[data-v="${v}"]`);
    if (p){ p.classList.add("speaking"); const r = p.getBoundingClientRect();
      if (r.top < 80 || r.bottom > innerHeight - 160) p.scrollIntoView({block:"center", behavior:"smooth"}); }
    const b = curRead && curRead.b;
    $("ttsLbl").textContent = "🔊 " + (b ? (b.ch.length===1 ? b.name : b.name+" "+curRead.c) : "") + " · verset " + v + " / " + TTS.list[TTS.list.length-1];
  }
  function parler(){
    if (!TTS.on || !TTS.playing) return;
    const gen = ++TTS.gen;
    if (TTS.i >= TTS.list.length){ fin(); return; }
    if (TTS.ci === 0){ TTS.chunks = decouper(verseText(TTS.list[TTS.i])); marquer(); }
    const u = new SpeechSynthesisUtterance(TTS.chunks[TTS.ci] || " ");
    let vv = voixFr().find(v => v.voiceURI === $("ttsVoice").value);
    if (vv && !vv.localService && !navigator.onLine) vv = voixFr().find(v => v.localService) || vv; // hors connexion : voix de l'appareil
    if (vv){ u.voice = vv; u.lang = vv.lang; } else u.lang = "fr-FR";
    const a = amb();
    u.rate = Math.min(2, a.rate * (+$("ttsRate").value || 1));
    u.pitch = a.pitch; u.volume = 1;
    u.onend = () => { if (gen !== TTS.gen) return;
      TTS.ci++; let pause = 120;
      if (TTS.ci >= TTS.chunks.length){ TTS.ci = 0; TTS.i++; pause = a.pause; }
      setTimeout(() => { if (gen === TTS.gen) parler(); }, window.__ttsRapide ? 0 : pause); };
    u.onerror = e => { if (gen !== TTS.gen) return; if (e.error === "interrupted" || e.error === "canceled") return;
      TTS.ci = 0; TTS.i++; parler(); };
    speechSynthesis.speak(u);
  }
  function relancer(){ if (TTS.playing){ TTS.gen++; speechSynthesis.cancel(); TTS.ci = 0; setTimeout(parler, 80); } }
  function fin(){
    TTS.playing = false; $("ttsPlay").textContent = "▶";
    document.querySelectorAll("#rt p.speaking").forEach(p => p.classList.remove("speaking"));
    $("ttsLbl").textContent = "✓ Chapitre lu en entier"; TTS.i = 0;
  }

  // ---------- Fonctions utilisées par l'app ----------
  window.ttsStart = function(depuis){
    if (!ok()){ toast("La lecture à voix haute n'est pas disponible sur ce navigateur."); return; }
    if (!curRead){ toast("Attends que le texte soit chargé."); return; }
    TTS.list = curRead.vs.map(v => v[0]);
    TTS.i = Math.max(0, depuis != null ? TTS.list.indexOf(depuis) : 0); TTS.ci = 0;
    TTS.on = true; TTS.playing = true; bar.hidden = false; document.body.classList.add("tts-on");
    $("ttsPlay").textContent = "⏸"; $("ttsLbl").textContent = "🔊 Lecture…"; speechSynthesis.cancel(); setTimeout(parler, 80);
  };
  window.ttsStop = function(){
    TTS.on = false; TTS.playing = false; TTS.gen++; if (ok()) speechSynthesis.cancel();
    bar.hidden = true; $("ttsHelp").hidden = true; document.body.classList.remove("tts-on");
    document.querySelectorAll("#rt p.speaking").forEach(p => p.classList.remove("speaking"));
  };
  function pause(){ TTS.playing = false; TTS.gen++; speechSynthesis.cancel(); TTS.ci = 0; $("ttsPlay").textContent = "▶"; }
  function reprendre(){ TTS.playing = true; $("ttsPlay").textContent = "⏸"; parler(); }
  function sauter(d){
    if (!TTS.on) return; TTS.gen++; speechSynthesis.cancel();
    TTS.i = Math.min(Math.max(0, TTS.i + d), TTS.list.length - 1); TTS.ci = 0;
    if (TTS.playing) setTimeout(parler, 80); else marquer();
  }

  $("ttsPlay").onclick = () => TTS.playing ? pause() : reprendre();
  $("ttsPrev").onclick = () => sauter(-1);
  $("ttsNext").onclick = () => sauter(1);
  $("ttsStop").onclick = window.ttsStop;
  $("ttsHelpB").onclick = () => { $("ttsHelp").hidden = !$("ttsHelp").hidden; };
  $("ttsAmb").onchange = e => { state.ttsAmb = e.target.value; save(); relancer(); toast("Voix " + AMBIANCES[e.target.value].label.replace(/^\S+\s/,"").toLowerCase()); };
  $("ttsRate").onchange = e => { state.ttsSpeed = +e.target.value; save(); relancer(); };
  $("ttsVoice").onchange = e => { state.ttsVoice = e.target.value; save(); relancer(); };
  window.ttsDecouper = decouper; // utilisé pour les vérifications
  const sp = $("selspeak");
  if (sp) sp.onclick = () => { const vv = [...sel].sort((x,y) => x-y); clearSel(); window.ttsStart(vv[0]); };
})();
