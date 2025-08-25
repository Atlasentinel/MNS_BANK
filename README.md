

### MNS_BANK

Application microservices de gestion bancaire.

## ARCHITECTURE

Il y a 4 microservices :
- ms-login : service d'authentification en C#
- ms-dao : service de gestion des données en TS (Node.js) via express
- ms-balance : service d'API de gestion des soldes en TS (Node.js) via NestJS
- api-gateway : passerelle API en TS (Node.js) via NestJS

Les développeurs sont :
- Noe Ziadi
- Loan Keovilay
- Valentin Mignon
- Adel Boukada

## Lancement des services

Créer un fichier `.env.db` à la racine du projet avec le contenu que vous trouverer sur le trello dans la carte "Variables d'environnements"

Créer un fichier similaire du même nom dans le dossier `ms-dao` avec le même contenu.


Se rendre a la racine du projet "/MNS_BANK" et lancer la commande suivante :

```bash
docker-compose up --build
```

Le fichier init.sql sera automatiquement exécuté pour initialiser la base de données. Un petit jeu de donnée sera déjà inséré.

Néanmoins, si les données de la base de donnée ne sont pas présentes, il faudra les insérer manuellement.

il suffit de faire une requête SQL d'insertion pour client:

```sql
INSERT INTO clients (name, login, password, token)
VALUES
  ('Bob Martin', 'bobausaure', '2bcdd13ea781dd479c0e6359e01415fbbec7d4b6f1550d4dca363cda159cd00a9bb4c77331e7ea8fd84f0403c10e0e44b95390c54295eb1c63bd65362db0211a', 'token456')
```
et une seconde requête pour le compte :

```sql
INSERT INTO accounts (client_id, balance)
VALUES
  (1, 1000000.00)
```

Adminer est déjà installé et accessible à l'adresse suivante : http://localhost:8080
- Choisir postgresql comme système de gestion de base de données
- Se connecter avec les identifiants suivants :
  - Serveur : postgres
  - Utilisateur : testuser
  - Mot de passe : voir données Trello
  - Base de données : testdb

Il est possible qu'au premier démarrage le docker de postgres (mns-bank-db) se ferme, dans ce cas il faut simplement le redémarrer simplement depuis docker desktop.


## UTILISATION

Vous pourrez intéragir avec l'API via Postman, Reqbin, voir swagger pour le microservice ms-login.

Les endpoints sont les suivants (passer par l'api-gateway localhost:3100) :
- POST /auth/login : pour s'authentifier
- POST /auth/register : pour créer un compte
- POST /auth/checktoken : pour vérifier la validité d'un token
- GET /balance/:id : pour obtenir le solde d'un utilisateur (besoin d'un token valide dans les headers)

Exemple complet :

Register un utilisateur (login: test, password: test) :
Se rendre à l'endpoint http://localhost:3100/auth/register
{
    "name": "Falcon",
    "login": "FalconKub",
    "password": "Gribou",
    "token": ""
}

Login avec cet utilisateur pour obtenir un token :
Se rendre à l'endpoint http://localhost:3100/auth/login
{
    "login": "bobausaure",
    "password": "Gribou"
}

Verifier la validité du token obtenu:
Se rendre à l'endpoint http://localhost:3100/auth/checktoken
{
    "id": "1",
    "token": "token456"
}

Obtenir le solde de l'utilisateur :
Se rendre à l'endpoint http://localhost:3100/balance/1/token456

## DOCUMENTATION

Pour des informations plus précise pour chaque micro service, un README.md est disponible pour quelque micro service.

## TESTS

Pour les microservices en ts comme ms-dao ou ms-balance, des tests unitaires sont effectuer via Jest. Pour les démarrer, il suffit de se rendre dans le dossier du microservice et d'exécuter la commande suivante :

```bash
npm run test
```

Pour les microservices en C# comme ms-login, des tests unitaires sont effectués via xUnit. Pour les démarrer, il suffit de se rendre dans le dossier du microservice et d'exécuter la commande suivante :

```bash
dotnet test
```