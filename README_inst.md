# Initialisation du projet

## .ENV

### Front
------
Créer un fichier `.env` avec les mêmes variables que `.env.example` au même niveau à la racine du projet

1. `VITE_API_URL` fait référence à l'adresse de l'API, vous devez changer normalement que le PORT qui sont les 4 chiffres à la fin

### Back
------
Créer un fichier `.env` avec les mêmes variables que `.env.example` au même niveau dans le dossier `API`

1. `PG_URL` fait référence à la base de donnée que vous voulez utiliser, vous devez remplacer `user`, `password` et `dbname`. Si vous n'utilisez pas le port de postgres par défaut alors il faudra remplacer `5432` par le port que vous utilisez.

2. `PORT` doit avoir le même port que ce que vous avez mis dans `VITE_API_URL`, ce qui veut dire les 4 derniers chiffres

3. `TOKEN_KEY` fait référence à la clef secrète qui permettra d'identifier un token, elle doit être communiquée à personne et doit avoir un format de 32 caractères alphanumériques


## Installation des dépendances et lancement du projet

**Tout se fait à la racine du projet soit à la racine du dossier `zombieland`**

### Front
---

- Installer les dépendances: `pnpm run install-front`

- Modifer le `VITE_API_URL` par le localhost du back

- Lancer le front: `pnpm run front`



### Back
---
- Installer les dépendances: `pnpm run install-back`

-Modifer le `process.env.FRONTEND` dans `API/index.js` par `process.env.LOCAL`

- Lancer l'API: `pnpm run back`

### Base de données
---
- **Ne pas oublier de créer une base de donnée et de noter son nom, l'utilisateur de la base de donnée et le mot de passe de l'utilisateur**

- Bien vérifier dans le `.env` dans le dossier `API` d'avoir mis les bonnes valeurs pour `PG_URL`
<<<<<<< HEAD

- Pour avoir un jeu de donnée:
1. Lancer le script de `API\data\create-database.sql`

2. Lancer le script de `API\data\seeding-table.sql`
=======


- Pour avoir un jeu de donnée:
1. Lancer le script de `API\data\create-database.sql`

2. Lancer le script de `API\data\seeding-table.sql`


- Pour avoir un jeu de donnée:
1. Lancer le script de `API\data\create-database.sql`

2. Lancer le script de `API\data\seeding-table.sql`

