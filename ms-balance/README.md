# MICROSERVICE Balance

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

#### **GET /clients**
##### Sortie:
##### - Liste des Clients

#### **GET /client/:id/balance/:token**
##### Sortie:
##### - Nombre flottant

#### **GET /client/:id**
##### Sortie:
##### - Objet Client
