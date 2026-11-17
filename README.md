<p align="center"><img src="logo-banniere.png" alt="La Sainte Bible copte" width="600"></p>

# La Sainte Bible copte

Une application web pour lire **toute la Bible de l'Église copte orthodoxe** en 13 étapes et 406 jours.

- **Ancien Testament** : la Septante, dans la traduction française de P. Giguet (1872, version révisée).
- **Nouveau Testament** : traduction Louis Segond (1910), faite sur le texte grec original.
- Avant chaque étape, chaque livre et chaque chapitre : une explication pour comprendre ce qu'on va lire.
- Les mots anciens ou difficiles sont remplacés par des mots courants (bouton « Texte d'origine » pour la traduction exacte).
- Recherche d'un chapitre (« Jean 3 », « Ps 50 ») ou d'une phrase dans toute la Bible.
- « Mes versets » : enregistrer ses passages préférés, surligner en couleur, copier.
- Paramètres : 1 à 4 chapitres par jour, ou toute la Bible en 6 mois à 4 ans.
- Lecture sans connexion après téléchargement.
- Lecture chapitre par chapitre : « Chapitre suivant » valide automatiquement le chapitre lu.
- Livres propres à la Bible copte inclus : Tobie, Judith, Sagesse, Siracide, Baruch, 1-2 Maccabées, Daniel 13-14, Esther grec, Psaume 151.
- Numérotation des Psaumes de la Septante (la même que l'Agpeya).

## Mettre l'app en ligne avec GitHub Pages

1. Envoyer tous les fichiers de ce dossier dans le dépôt (en gardant les dossiers `` et `data/`).
2. Dans le dépôt : **Settings → Pages**.
3. Source : **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
4. Après une ou deux minutes, l'app est en ligne à l'adresse indiquée (du type `https://ton-nom.github.io/nom-du-depot/`).

Sur téléphone, « Ajouter à l'écran d'accueil » installe l'app avec son logo.
La progression est enregistrée dans le navigateur.

> L'app ne marche pas en ouvrant `index.html` directement depuis l'ordinateur (double-clic) : les textes bibliques se chargent depuis les fichiers .json, ce qui demande un vrai site web comme GitHub Pages.

## Sources des textes

Textes du domaine public : Septante de Giguet issue de [scrollmapper/bible_databases](https://github.com/scrollmapper/bible_databases) (FreLXX, FreLXXGiguet) ; Louis Segond 1910 issue de [BibleCorps/FRA-B-LSG1910-PD-UBS](https://github.com/BibleCorps/FRA-B-LSG1910-PD-UBS).
