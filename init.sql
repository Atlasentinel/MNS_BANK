-- Extension pour UUID si besoin
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Table transactions
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id TEXT NOT NULL,
    type TEXT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc')
);

-- Table clients
CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT NOT NULL
);

-- Insertion de données de test dans transactions
INSERT INTO transactions (id, type, amount, description)
VALUES
  ('3fa85f64-5717-4562-b3fc-2c963f66afa6','account123', 'credit', 1000, 'Premier dépôt'),
  ('3fa85f64-5717-4562-b3fc-2c963f66afa6','account123', 'debit', 200, 'Achat courses'),
  ('3fa85f64-5717-4562-b3fc-2c963f66afa6','account456', 'credit', 500, 'Virement reçu'),
  ('3fa85f64-5717-4562-b3fc-2c963f66afa6','account789', 'debit', 50, 'Paiement mobile');

-- Insertion de données de test pour clients
INSERT INTO clients (id, name, login, password, token)
VALUES
  (1, 'Alice Dupont', 'alice', 'password123', 'token123'),
  (2, 'Bob Martin', 'bob', 'password456abc', 'token456'),
  (3, 'Charlie Durand', 'charlie', 'password789xyz', 'token789');
