# 🛡️ ms_login

Microservice d'authentification en .NET 8 pour une application bancaire ou multi-service. Il gère la connexion utilisateur à partir d’un fichier JSON contenant les comptes, avec hash du mot de passe (SHA-512) et génération de token.

---

## 🚀 Fonctionnalités

- Connexion via e-mail et mot de passe
- Vérification par mot de passe hashé (SHA-512)
- Génération de token unique par utilisateur
- Stockage des utilisateurs dans un fichier `db.json`
- API RESTful (endpoint : `POST /api/auth/login`)
- Sauvegarde automatique du token dans le fichier JSON
- Tests unitaires avec MSTest

---

## 📁 Structure du projet

```
ms_login/
│
├── Bdd/
│ └── db.json # Base de données locale (JSON)
│
├── Controllers/
│ └── AuthController.cs # Contrôleur d'authentification
│
├── Helper/
│ └── HashHelper.cs # SHA-512 hash utils
│
├── Models/
│ ├── User.cs
│ ├── LoginRequest.cs
│ └── UsersData.cs
│
├── Services/
│ └── AuthService.cs # Service principal d'authentification
│
├── ms_login.csproj # Fichier de projet C#
└── Program.cs / Startup.cs # Entrée principale
```

## 🧪 Lancer les tests

Les tests unitaires sont dans le projet `ms_login_test`.

```bash
cd ms_login_test
dotnet test
```

## 🧰 Exemple de payload de connexion
➤ Requête POST /api/auth/login
```JSON
{
  "login": "user1@mail.com",
  "password": "pass1"
}
```
## 🗂️ Format du fichier db.json

```JSON
{
  "users": [
    {
      "login": "user1@mail.com",
      "password": "<mot_de_passe_hashé_en_SHA512>",
      "token": "token1"
    },
    {
      "login": "user2@mail.com",
      "password": "<hash>",
      "token": null
    }
  ]
}
```

## 🔐 Les mots de passe doivent être préalablement 

### ⚙️ Lancer le projet
```bash
dotnet build
dotnet run
```
Ensuite, tu peux accéder à l'API sur :

```bash
http://localhost:<port>/api/auth/login
```

## 🎨 Swagger

### ⚙️ Lancer le swagger

Il faut avoir démarrer le projet préalablement pour se rendre sur le swagger.

```bash
http://localhost:3001/swagger/index.html
```


✅ À venir
Middleware pour vérifier les tokens

Expiration de token

Intégration avec base de données réelle

JWT au lieu de GUID

## 👨‍💻 Auteur
ZIADI Noé  – Chef de projet
