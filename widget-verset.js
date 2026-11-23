// ✠ Verset du jour – La Sainte Bible copte
// Widget pour l'app Scriptable (iPhone / iPad).
// Il change tout seul chaque jour à minuit (heure française)
// et marche aussi sans connexion une fois lancé une première fois.

const SITE = "https://mickaelgendi-hue.github.io/LA-SAINTE-BIBLE-COPTE/";
const DONNEES = SITE + "vdj.json";
const APPLI = SITE + "#accueil";

// 1. Les versets : on les télécharge, et on garde une copie sur le téléphone
const fm = FileManager.local();
const fichier = fm.joinPath(fm.documentsDirectory(), "verset-du-jour.json");
let data = null;
try {
  const req = new Request(DONNEES);
  req.timeoutInterval = 10;
  data = await req.loadJSON();
  if (data && data.v && data.v.length) fm.writeString(fichier, JSON.stringify(data));
  else data = null;
} catch (e) { data = null; }
if (!data && fm.fileExists(fichier)) {
  try { data = JSON.parse(fm.readString(fichier)); } catch (e) { data = null; }
}

// 2. Le jour en France (le verset change à 00h00, heure de Paris)
function heureParis(d) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  });
  const p = {};
  for (const x of f.formatToParts(d)) p[x.type] = x.value;
  return p;
}
const maintenant = new Date();
const P = heureParis(maintenant);
const jour = Date.UTC(+P.year, +P.month - 1, +P.day) / 86400000;

let ref = "Verset du jour", texte = "Ouvre ce widget une fois avec internet pour charger les versets.";
if (data) {
  const n = data.v.length;
  const i = (((jour - data.base) % n) + n) % n;
  ref = data.v[i][0];
  texte = data.v[i][1];
}

// 3. Le widget
const famille = config.widgetFamily || "medium";
const w = new ListWidget();
w.url = APPLI;

if (famille.startsWith("accessory")) {
  // Écran verrouillé
  if (famille === "accessoryInline") {
    w.addText("✠ " + ref);
  } else if (famille === "accessoryCircular") {
    w.addAccessoryWidgetBackground = true;
    const c = w.addText("✠");
    c.font = Font.boldSystemFont(16);
    c.centerAlignText();
    const r = w.addText(ref);
    r.font = Font.semiboldSystemFont(9);
    r.minimumScaleFactor = 0.5;
    r.lineLimit = 2;
    r.centerAlignText();
  } else {
    const r = w.addText("✠ " + ref);
    r.font = Font.boldSystemFont(12);
    r.lineLimit = 1;
    const t = w.addText(texte);
    t.font = Font.systemFont(11);
    t.lineLimit = 3;
    t.minimumScaleFactor = 0.6;
  }
} else {
  // Écran d'accueil : ciel bleu, comme dans l'appli
  const g = new LinearGradient();
  g.colors = [new Color("#2f6fc4"), new Color("#4f8fdc"), new Color("#8dbcec")];
  g.locations = [0, 0.55, 1];
  w.backgroundGradient = g;
  const pad = famille === "small" ? 12 : 16;
  w.setPadding(pad, pad, pad, pad);

  const l = w.addText("Verset du jour");
  l.font = Font.semiboldSystemFont(famille === "small" ? 11 : 13);
  l.textColor = new Color("#ffffff", 0.9);
  w.addSpacer(2);

  const r = w.addText(ref);
  r.font = Font.boldSystemFont(famille === "small" ? 14 : 17);
  r.textColor = Color.white();
  w.addSpacer(famille === "small" ? 4 : 6);

  const tailles = { small: 15, medium: 18, large: 24, extraLarge: 26 };
  const lignes = { small: 5, medium: 4, large: 10, extraLarge: 8 };
  const t = w.addText("« " + texte + " »");
  t.font = new Font("Georgia-Bold", tailles[famille] || 18);
  t.textColor = Color.white();
  t.lineLimit = lignes[famille] || 4;
  t.minimumScaleFactor = 0.55;
  t.shadowColor = new Color("#0a285a", 0.45);
  t.shadowRadius = 3;
  w.addSpacer();
}

// 4. Se remettre à jour juste après minuit (heure française)
const resteSec = 86400 - (+P.hour * 3600 + +P.minute * 60 + +P.second);
w.refreshAfterDate = new Date(maintenant.getTime() + (resteSec + 60) * 1000);

if (config.runsInWidget) {
  Script.setWidget(w);
} else {
  await w.presentMedium();
}
Script.complete();
