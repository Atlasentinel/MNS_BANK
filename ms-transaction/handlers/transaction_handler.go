package handlers

import (
	"encoding/json"
	"ms-transaction/database"
	"ms-transaction/models"
	"ms-transaction/services"
	"net/http"

	"gorm.io/gorm"
)

func CreateTransactionHandler(w http.ResponseWriter, r *http.Request) {
	var tx models.Transaction
	if err := json.NewDecoder(r.Body).Decode(&tx); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	err := services.CreateTransaction(&tx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(tx)
}

func ListTransactionsHandler(w http.ResponseWriter, r *http.Request) {
	var transactions []models.Transaction
	result := database.DB.Find(&transactions)
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		http.Error(w, "Erreur DB", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(transactions)
}

func CreditTransactionHandler(w http.ResponseWriter, r *http.Request) {
	var tx models.Transaction
	if err := json.NewDecoder(r.Body).Decode(&tx); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	err := services.CreditTransaction(&tx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(tx)
}

func DebitTransactionHandler(w http.ResponseWriter, r *http.Request) {
	var tx models.Transaction
	if err := json.NewDecoder(r.Body).Decode(&tx); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	err := services.DebitTransaction(&tx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(tx)
}
