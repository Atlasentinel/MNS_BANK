# MICROSERVICE Balance

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
Encore aucune configuration n'est nécessaire


### Dépendances
- NodeJS
    - Express
- db.json


### Utilisation

*Démarrer l'api*
```bash
npm run dev
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
