package routes

import (
	"ms-transaction/handlers"

	"github.com/gorilla/mux"
)

func RegisterTransactionRoutes(r *mux.Router) {
	s := r.PathPrefix("/transactions").Subrouter()
	s.HandleFunc("", handlers.CreateTransactionHandler).Methods("POST")
	s.HandleFunc("", handlers.ListTransactionsHandler).Methods("GET")
	s.HandleFunc("/credit", handlers.CreditTransactionHandler).Methods("POST")
	s.HandleFunc("/debit", handlers.DebitTransactionHandler).Methods("POST")
}
