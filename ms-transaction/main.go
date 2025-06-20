package main

import (
	"log"
	"net/http"
	"os"

	"ms-transaction/database"
	"ms-transaction/routes"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// Charge les variables d'environnement
	godotenv.Load()

	// Connexion à la base de données
	database.InitDB()

	// Initialise le routeur
	r := mux.NewRouter()
	routes.RegisterTransactionRoutes(r)

	r.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("pong"))
	}).Methods("GET")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Println("🚀 Transaction service en écoute sur le port", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
