

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
Body (raw, JSON) :
{
    "name": "Test",
    "login": "test",
    "password": "test",
    "token": ""
}

Login avec cet utilisateur pour obtenir un token :
Se rendre à l'endpoint http://localhost:3100/auth/login
Body (raw, JSON) :
{
    "login": "test",
    "password": "test"
}

Verifier la validité du token obtenu:
Se rendre à l'endpoint http://localhost:3100/auth/checktoken
Body (raw, JSON) :
{
    "id": "2"
    "token": "token456"
}

Obtenir le solde de l'utilisateur :
Se rendre à l'endpoint http://localhost:3100/balance/2/token456

## DOCUMENTATION

Pour des informations plus précise pour chaque micro service, un README.md est disponible pour quelque micro service.

## TESTS