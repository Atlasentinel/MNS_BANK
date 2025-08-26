# Documentation Fonctionnelle

## L'application MNS_BANK permet de se connecter à votre compte bancaire et consulter le solde

### Se connecter
Pour se connecter il faut se rendre sur http://localhost:3100/auth/login avec comme données dans le corps de la requete:
```json
{
    "login": "bobausaure",
    "password": "Gribou"
}
```

Récupérer le token en réponse de la requete

### Vérifier le token
Ensuite simuler la vérification du token en allant sur http://localhost:3100/auth/checktoken avec comme données dans le corps de la requete :
```
{
    "id": "1",
    "token": "*token qui a été récupéré*"
}
```

Ceci va retourner Vrai ou Faux en fonction de si l'utilisateur est bien authentifié ou non

### Consulter son solde
Pour consulter son solde il faut utiliser son id utilisateur et son token en allant sur : http://localhost:3100/balance/<user_id>/<user_token>





