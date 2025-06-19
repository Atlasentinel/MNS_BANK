# Projet de création d'une banque MNS

## Participants :
- Ziadi Noé : Chef de projet
- Keovilay Loan : architecte logiciel
- Mignon Valentin : Testeur
- Boukada Adel : développeur

## DOCUMENTATION TECHNIQUE

### Installation
```bash
git clone https://github.com/Atlasentinel/MNS_BANK.git
```
```bash
npm i
```


### Configuration
Encore aucun configuration n'est nécessaire


### Dépendances
- NodeJS
    - Express
- db.json


### Utilisation

*Démarrer l'api*
```bash
node app.js
```

### Routes Utilisables

#### **GET /api/accounts**
##### Sortie:
##### - Liste de Comptes

#### **GET /api/account/:id**
##### Sortie:
##### - Objet Compte

#### **GET /api/account/:id/amount**
##### Sortie:
##### - Nombre flottant
