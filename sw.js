// Lecture hors connexion : La Sainte Bible copte
const CACHE = "bible-copte-v18";
const CORE = ["./", "index.html", "manifest.json", "logo.svg", "favicon-32.png", "apple-touch-icon.png", "logo-192.png", "logo-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== "bible-copte-rappel" && k !== "bible-copte-liturgie").map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (u.origin !== location.origin && !fonts) return;
  // Livres de la Liturgie : gardés à part (ils restent après les mises à jour), jamais copiés en double
  if (/\/lit-[a-z-]+-\d+\.pdf$/.test(u.pathname)) {
    e.respondWith(caches.open("bible-copte-liturgie").then(c => c.match(req, { ignoreSearch: true })).then(h => h || fetch(req)));
    return;
  }
  // Documents BiblioCopte : l'appli les range elle-même dans sa bibliothèque, on ne les copie pas en double
  if (/\/bc\/[a-z0-9-]+\.pdf$/.test(u.pathname)) { e.respondWith(fetch(req)); return; }
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit || Response.error());
    return hit || net;
  }));
});

// Rappel de lecture en arrière-plan (navigateurs qui le permettent, ex. Chrome Android avec l'appli installée)
const jour = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
async function rappel() {
  const c = await caches.open("bible-copte-rappel");
  const r = await c.match("rappel.json"); if (!r) return;
  const R = await r.json(); if (!R.on) return;
  const now = new Date(), [h, m] = (R.time || "20:00").split(":").map(Number), today = jour();
  if (R.last === today || now.getHours() * 60 + now.getMinutes() < h * 60 + m) return;
  const cl = await self.clients.matchAll({ type: "window" });
  if (cl.some(x => x.visibilityState === "visible")) return;
  R.last = today;
  await c.put("rappel.json", new Response(JSON.stringify(R), { headers: { "Content-Type": "application/json" } }));
  await self.registration.showNotification("📖 La Sainte Bible copte", { body: R.text || "C'est l'heure de ta lecture.", icon: "logo-192.png", badge: "favicon-32.png", tag: "rappel-lecture", data: { url: "./#accueil" } });
}
// Verset du jour sur l'écran verrouillé (notification du matin)
async function verset() {
  const c = await caches.open("bible-copte-rappel");
  const r = await c.match("verset.json"); if (!r) return;
  const R = await r.json(); if (!R.on) return;
  const now = new Date(), [h, m] = (R.time || "07:30").split(":").map(Number), today = jour();
  if (R.last === today || now.getHours() * 60 + now.getMinutes() < h * 60 + m) return;
  const v = R.days && R.days[today]; if (!v) return;
  const cl = await self.clients.matchAll({ type: "window" });
  if (cl.some(x => x.visibilityState === "visible")) return;
  R.last = today;
  await c.put("verset.json", new Response(JSON.stringify(R), { headers: { "Content-Type": "application/json" } }));
  await self.registration.showNotification("✠ Verset du jour · " + v.r, { body: v.t, icon: "logo-192.png", badge: "favicon-32.png", tag: "verset-du-jour", data: { url: "./#accueil" } });
}
self.addEventListener("periodicsync", e => { if (e.tag === "rappel-lecture") e.waitUntil(rappel()); if (e.tag === "verset-du-jour") e.waitUntil(verset()); });
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cl => {
    for (const c of cl) { if ("focus" in c) { c.navigate && c.navigate((e.notification.data && e.notification.data.url) || "./"); return c.focus(); } }
    return self.clients.openWindow((e.notification.data && e.notification.data.url) || "./");
  }));
});
