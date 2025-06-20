package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"ms-transaction/database"
	"ms-transaction/models"
	"net/http"
	"os"
)

type BalanceResponse struct {
	Balance float64 `json:"balance"`
}

func CreateTransaction(tx *models.Transaction) error {
	// Vérification du type
	if tx.Type != "credit" && tx.Type != "debit" {
		return errors.New("type de transaction invalide")
	}

	// Appel au service de solde si débit
	if tx.Type == "debit" {
		balance, err := getBalance(tx.AccountID)
		if err != nil {
			return err
		}
		if tx.Amount > balance {
			return errors.New("solde insuffisant")
		}
	}

	tx.CreatedAt = tx.CreatedAt.UTC()
	result := database.DB.Create(tx)
	if result.Error != nil {
		return result.Error
	}

	return updateBalance(tx)
}

func getBalance(accountId string) (float64, error) {
	url := fmt.Sprintf("%s/balance/%s", os.Getenv("BALANCE_SERVICE_URL"), accountId)
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode != 200 {
		return 0, errors.New("erreur lors de la récupération du solde")
	}
	defer resp.Body.Close()
	var data BalanceResponse
	json.NewDecoder(resp.Body).Decode(&data)
	return data.Balance, nil
}

func updateBalance(tx *models.Transaction) error {
	url := fmt.Sprintf("%s/balance/%s", os.Getenv("BALANCE_SERVICE_URL"), tx.AccountID)
	payload := map[string]interface{}{
		"type":   tx.Type,
		"amount": tx.Amount,
	}
	jsonData, _ := json.Marshal(payload)
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil || resp.StatusCode != 200 {
		return errors.New("échec de mise à jour du solde")
	}
	return nil
}

func CreditTransaction(tx *models.Transaction) error {
	// Vérifie que le type est bien "credit"
	tx.Type = models.Credit

	// On peut ajouter ici une vérification du montant
	if tx.Amount <= 0 {
		return errors.New("le montant doit être positif")
	}

	tx.CreatedAt = tx.CreatedAt.UTC()
	result := database.DB.Create(tx)
	if result.Error != nil {
		return result.Error
	}

	// Met à jour le solde du compte via le service externe
	return updateBalance(tx)
}

func DebitTransaction(tx *models.Transaction) error {
	tx.Type = models.Debit

	if tx.Amount <= 0 {
		return errors.New("le montant doit être positif")
	}

	tx.CreatedAt = tx.CreatedAt.UTC()
	result := database.DB.Create(tx)
	if result.Error != nil {
		return result.Error
	}

	return updateBalance(tx)
}
