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
  ('Bob Martin', 'bobausaure', '2bcdd13ea781dd479c0e6359e01415fbbec7d4b6f1550d4dca363cda159cd00a9bb4c77331e7ea8fd84f0403c10e0e44b95390c54295eb1c63bd65362db0211a', 'token456')

INSERT INTO accounts (client_id, balance)
VALUES
  (1, 1000000.00)

