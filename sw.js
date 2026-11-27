// Lecture hors connexion : La Sainte Bible copte
const CACHE = "bible-copte-v26";
const CORE = ["./", "index.html", "manifest.json", "logo.svg", "favicon-32.png", "apple-touch-icon.png", "logo-192.png", "logo-512.png", "cat/chants.jpg", "cat/fetes.jpg", "cat/laVieDesSaints.jpg", "cat/lecturesDimanche.jpg", "cat/livresSpirituels.jpg", "cat/messe-jour.jpg", "cat/messe.jpg", "cat/sacrementAutresRites.jpg", "cat/semaineSainte.jpg", "cat/tasbeha.jpg", "th/ancien-testament-pere-tadros-malaty.jpg", "th/blaspheme-contre-l-esprit-pape-chenouda-3.jpg", "th/chants-et-cantiques.jpg", "th/chants-vendredi-saint.jpg", "th/christ-avant-l-age-de-trente-ans-pape-chenouda-3.jpg", "th/conseils-pour-la-priere-par-le-pere-matta-el-maskine.jpg", "th/contemplation-de-la-resurrection-pape-shenouda-3.jpg", "th/createur-du-bien-createur-du-mal-pape-chenouda-3.jpg", "th/creation-et-l-opinion-des-geologues-pape-chenouda-3.jpg", "th/dialogue-avec-moise-le-prophete-jeunant-pere-tadros-y-malaty.jpg", "th/dieu-et-rien-d-autre-pape-shenouda-3.jpg", "th/dimanche-et-veille-du-lundi-saint.jpg", "th/divine-liturgie-cathedrale.jpg", "th/divine-liturgie.jpg", "th/eglise-copte-pape-chenouda-3.jpg", "th/eglise-la-sainte-vierge-marie-haret-zouila-naguib-mahfouz-naguib.jpg", "th/eglise-maison-d-amour-abouna-tadros-yacoub-malaty.jpg", "th/eglise-st-menas-le-miracule-vieux-caire-naguib-mahfouz-naguib.jpg", "th/eglises-coptes-au-vieux-caire-naguib-mahfouz-naguib.jpg", "th/elan-de-esprit-pape-shenouda-3.jpg", "th/epiphanie-et-saint-jean-baptiste-pape-shenouda-3.jpg", "th/et-cette-generation-est-passee-pape-chenouda-3.jpg", "th/explication-du-credo-pape-chenouda-3.jpg", "th/femmes-pecheresses-dans-la-genealogie-de-jesus-pape-chenouda-3.jpg", "th/fete-de-la-presentation-du-christ-dans-le-temple-pere-tadros-malaty.jpg", "th/fils-de-dieu-et-les-filles-des-hommes-pape-chenouda-3.jpg", "th/funerailles-generales.jpg", "th/genealogie-a-travers-joseph-pape-chenouda-3.jpg", "th/histoire-du-proche-orient-egypte-copte.jpg", "th/hymnes-glorifications-de-la-communion-des-saints.jpg", "th/introduction-a-la-bible-nouveau-testament-pere-tadros-y-malaty.jpg", "th/jesus-le-crucifie.jpg", "th/jeudi-saint.jpg", "th/l-eglise-de-la-sainte-vierge-marie-babylone-al-darag-al-damchiria-naguib-mahfouz-naguib.jpg", "th/l-eglise-de-la-sainte-vierge-marie-eglise-suspendue-naguib-mahfouz-naguib.jpg", "th/l-eglise-saint-philopater-mercure-abu-seifin-vieux-caire-naguib-mahfouz-naguib.jpg", "th/l-orthodoxie.jpg", "th/la-cathedrale-de-saint-marc-a-alexandrie-naguib-mahfouz-naguib.jpg", "th/la-fete-de-la-croix-pape-chenouda-3.jpg", "th/la-foi-des-temoins-de-jehovah-refutee-pape-chenouda-3.jpg", "th/la-nature-du-christ-pape-chenouda-3.jpg", "th/la-resurrection-et-la-vie-pape-shenouda-3.jpg", "th/la-spiritualite-du-jeune-pape-chenouda-3.jpg", "th/la-tentation-sur-la-montagne-pape-shenouda-3.jpg", "th/la-terre-promise-anba-grigorios.jpg", "th/la-theologie-comparative-i-pape-shenouda-3.jpg", "th/la-transfiguration-pape-chenouda-3.jpg", "th/la-vie-de-ss-le-pape-cyril-vi.jpg", "th/le-careme-et-la-paque-chretienne-pere-tadros-malaty.jpg", "th/le-lien-entre-les-deux-testaments-anba-moussa.jpg", "th/le-prophete-jonas-pape-chenouda-3.jpg", "th/le-sacrement-du-sacerdoce.jpg", "th/le-silence-sacre-et-la-conversation-secrete-avec-le-seigneur-pere-tadros--malaty.jpg", "th/lectures-dimanche-50-jours-pascal.jpg", "th/lectures-dimanche-abib.jpg", "th/lectures-dimanche-amshir.jpg", "th/lectures-dimanche-babah.jpg", "th/lectures-dimanche-baounah.jpg", "th/lectures-dimanche-bashans.jpg", "th/lectures-dimanche-grand-careme.jpg", "th/lectures-dimanche-hatour.jpg", "th/lectures-dimanche-kiahk.jpg", "th/lectures-dimanche-misra.jpg", "th/lectures-dimanche-nasi.jpg", "th/lectures-dimanche-thout.jpg", "th/lectures-dimanche-toubah.jpg", "th/les-7-paroles-de-notre-seigneur-sur-la-croix-pape-shenouda-3.jpg", "th/les-combats-spirituels-pape-shenouda-3.jpg", "th/les-coptes-et-lidentite-egyptienne-dr-kamal-farid-ishaq.jpg", "th/les-deux-saints-pierre-et-paul.jpg", "th/les-eglises-de-saint-menas-a-mariout-naguib-mahfouz-naguib.jpg", "th/les-eglises-des-forts-des-monasteres-naguib-mahfouz-naguib.jpg", "th/les-eglises-du-monastere-de-saint-beshoy-naguib-mahfouz-naguib.jpg", "th/les-icones-vues-par-leglise-copte.jpg", "th/les-miracles-du-pape-cyril-6-1.jpg", "th/les-monuments-coptes-dans-les-anciens-temples-egyptiens-naguib-mahfouz-naguib.jpg", "th/les-sept-paroles-pape-chenouda-3.jpg", "th/les-styles-architecturaux-utilises-dans-la-construction-et-architecture-des-eglises-coptes.jpg", "th/les-trois-personnes-abraham-recut-pape-chenouda-3.jpg", "th/les-vagues-de-la-mer-cherchent-jonas-pere-tadros-malaty.jpg", "th/lit-chants-cantiques.jpg", "th/lit-psalmodie-annuelle.jpg", "th/lit-psalmodie-diapos.jpg", "th/lit-psalmodie-kiahk.jpg", "th/lit-semaine-sainte.jpg", "th/lit-service-diacre.jpg", "th/livre-de-la-priere-de-la-benediction-des-maisons.jpg", "th/livre-de-la-procession-pour-les-rameaux-et-la-fete-de-la-croix.jpg", "th/livre-de-la-sainte-psalmodie-annuelle.jpg", "th/livre-de-la-sainte-psalmodie-de-kiahk.jpg", "th/livre-de-la-semaine-sainte.jpg", "th/livre-des-prieres-de-la-prosternation.jpg", "th/livre-du-lakkan-de-la-theophanie.jpg", "th/livre-du-lakkan-des-apotres.jpg", "th/livre-du-rite-de-l-ordination-du-pretre.jpg", "th/livre-du-rite-de-la-consecration-des-autels-et-du-baptistere.jpg", "th/livre-du-rite-de-la-nuit-de-l-apocalypse.jpg", "th/livre-du-rite-de-samedi-de-lazare-et-dimanche-des-rameaux.jpg", "th/livre-du-rite-des-funerailles-pour-les-femmes.jpg", "th/livre-du-rite-des-funerailles-pour-les-hommes.jpg", "th/livre-du-rite-du-bapteme-et-de-la-confirmation.jpg", "th/livre-du-sacrement-de-l-onction-des-malades-kandil.jpg", "th/livre-du-service-du-diacre.jpg", "th/livre-glorification-de-la-vierge.jpg", "th/lundi-saint.jpg", "th/mardi-saint.jpg", "th/mercredi-saint.jpg", "th/monastere-de-la-sainte-vierge-marie-assiut-naguib-mahfouz-naguib.jpg", "th/montee-et-la-descente-dans-la-genealogie-de-jesus-pape-chenouda-3.jpg", "th/montre-moi-ta-foi-anba-raphael.jpg", "th/nombre-de-generations-pape-chenouda-3.jpg", "th/notre-nouveau-jonas-pere-tadros-malaty.jpg", "th/notre-pere-pape-chenouda-3.jpg", "th/nuit-de-lapocalypse.jpg", "th/pourquoi-devrai-je-croire-en-dieu-pere-louka.jpg", "th/pourquoi-fr-daoud-lamei.jpg", "th/priere-de-la-prosternation.jpg", "th/priere-du-lakkan-de-la-fete-des-apotres.jpg", "th/psalmodie-annuelle.jpg", "th/psalmodie-kiahk.jpg", "th/questions-concernant-noel-pape-shenouda-3.jpg", "th/rite-de-l-onction-des-malades-kandil.jpg", "th/rite-des-fiancailles-et-du-mariage.jpg", "th/rite-des-funerailles-pour-les-femmes.jpg", "th/rite-des-funerailles-pour-les-hommes.jpg", "th/rite-du-lakkan-de-la-theophanie.jpg", "th/rite-du-sacrement-du-mariage.jpg", "th/saint-abanob.jpg", "th/saint-abraam-l-eveque.jpg", "th/saint-antoine.jpg", "th/saint-mina-le-heros-egyptien-faiseur-de-miracles.jpg", "th/saint-philopatir-mercorios.jpg", "th/saint-samuel-le-confesseur.jpg", "th/sainte-catherine.jpg", "th/sainte-demiana.jpg", "th/sainte-justine.jpg", "th/sainte-mahraile.jpg", "th/sainte-marina.jpg", "th/saints-maximos-et-dometios.jpg", "th/satan-son-origine-sa-chute-son-travail-sa-tromperie-et-sa-fin-pape-chenouda-3.jpg", "th/synaxaire-1er-trimestre.jpg", "th/synaxaire-2eme-trimestre.jpg", "th/synaxaire-3eme-trimestre.jpg", "th/synaxaire-4eme-trimestre.jpg", "th/tous-ceux-qui-sont-venus-avant-moi-sont-des-voleurs-et-des-brigands-pape-chenouda-3.jpg", "th/toute-lecriture-est-inspiree-de-dieu-anba-raphael.jpg", "th/un-ou-trois-anba-raphael.jpg", "th/veille-du-jeudi-saint.jpg", "th/veille-du-mardi-saint.jpg", "th/veille-du-mercredi-saint.jpg", "th/veille-du-vendredi-saint.jpg", "th/vendredi-saint.jpg", "th/vie-de-foi-pape-shenouda-3.jpg", "th/vie-de-penitence-et-de-purete-pape-shenouda-3.jpg", "th/vie-desperance-pape-shenouda-3.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== "bible-copte-rappel" && k !== "bible-copte-liturgie" && k !== "bible-copte-messe").map(k => caches.delete(k)))).then(() => self.clients.claim()));
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
  // Lectures de la Messe : gardées à part (elles restent après les mises à jour)
  if (/\/messe\/[a-z-]+\.(json|woff2)$/.test(u.pathname)) {
    e.respondWith(caches.open("bible-copte-messe").then(c => c.match(req, { ignoreSearch: true })).then(h => h || fetch(req)));
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
