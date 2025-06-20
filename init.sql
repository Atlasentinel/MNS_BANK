-- Extension pour UUID si besoin
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table transaction 
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id TEXT NOT NULL,
    type TEXT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc')
);

-- Insertion de données de test
INSERT INTO transactions (account_id, type, amount, description)
VALUES
  ('account123', 'credit', 1000, 'Premier dépôt'),
  ('account123', 'debit', 200, 'Achat courses'),
  ('account456', 'credit', 500, 'Virement reçu'),
  ('account789', 'debit', 50, 'Paiement mobile');