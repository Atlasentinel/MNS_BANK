# API GATEWAY

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

### Utilisation

*Démarrer l'api*
```bash
npm run start
```


### Routes Utilisables

#### **POST /auth/login**
##### Entrée:
##### - login
##### - mot de passe
##### Sortie:
##### - Un token

#### **POST /auth/checktoken**
##### Entrée:
##### - token
##### Sortie:
##### - Booléen true or false


#### **GET /balance/{clientID}**
##### Sortie:
##### - Nombre floattant