-- Extension pour UUID si besoin (pas nécessaire ici, mais on garde au cas où)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table clients
CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT
);

-- Table accounts
CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    client_id INTEGER NOT NULL,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Insertion de données de test pour clients (sans les IDs manuels)
INSERT INTO clients (name, login, password, token)
VALUES
  ('Alice Dupont', 'alice', 'password123', 'token123'),
  ('Bob Martin', 'bob', 'password456abc', 'token456'),
  ('Charlie Durand', 'charlie', 'password789xyz', 'token789');

-- Insertion de comptes (récupère les IDs clients dynamiquement)
-- Cela suppose que l'ordre des insertions clients est bien : Alice (1), Bob (2), Charlie (3)
-- Sinon, utiliser des sous-requêtes SELECT

INSERT INTO accounts (client_id, balance)
VALUES
  (1, 1000.00),
  (2, 1500.50),
  (3, 2000.75);
