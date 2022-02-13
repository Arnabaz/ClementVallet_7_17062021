
# Groupomania

---

## Projet 7 - Formation Développeur Web - OpenClassrooms

### Objectif du projet : Créer un réseau social d'entreprise

### Compétences évaluées :

- Authentifier un utilisateur et maintenir sa session

- Personnaliser le contenu envoyé à un client web

- Gérer un stockage de données à l'aide de SQL

- Implémenter un stockage de données sécurisé en utilisant SQL

---

## Pré-requis :

### 1. Installation

- Installer Node js (v.16.14.0). <br />

- Dans le dossier *backend*, installer les dépendances avec : `npm install`.

- Dans le dossier *frontend*, installer les dépendances avec : `npm install`.

### 2. Création de la base de données mysql

- Installer mysql,

- Créer une base de données,

- Importer la structure de la base de données avec le fichier */backend/config/db-create.sql*.

### 3. Paramétrage des variables d'environnement (dotenv)

- Dans le dossier backend, utiliser le fichier *.env-sample*, en le renommant *.env* et en remplacant les valeurs des variables d'environnement.

NB : le port est déjà indiqué pour les besoins du projet.

### 4. Lancement du projet
Pour lancer le projet :

- Dans le dossier backend : `npm start`.

- Dans le dossier frontend: `npm start`.

Si le navigateur ne se lance pas automatiquement, rendez-vous sur http://localhost:3000/.

### 5. Accéder au projet en tant qu'admin

Pour accéder au projet en tant qu'admin, créer d'abord un utilisateur puis dans la base de données :
dans la table *users*, mettez à jour la ligne de l'utilisateur nouvellement créé et correspondant à la colonne *is_admin*  avec la valeur *1*.

---

## Dépendances :

- Projet : Node.js | Base de données : mySQL.

- Frontend : React, Create-React-App, React-Router, axios, dayjs, sass, fontawesome.

- Backend : Express, mysql, bcrypt, jsonwebtoken, multer, dotenv, nodemon.

---

## Auteur

Arnabaz - Clément Vallet - 2022
