package utils

import "errors"

var (
    ErrInsufficientFunds = errors.New("solde insuffisant pour le débit")
    ErrInvalidAmount     = errors.New("montant doit être positif")
)
