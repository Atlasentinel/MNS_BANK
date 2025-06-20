package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TransactionType string

const (
	Credit TransactionType = "credit"
	Debit  TransactionType = "debit"
)

type Transaction struct {
	ID          uuid.UUID       `json:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	AccountID   string          `json:"index;not null" json:"account_id"`
	Type        TransactionType `json:"type:text;not null" json:"type"`
	Amount      float64         `json:"amount;not null" json:"amount"`
	Description string          `json:"description"`
	CreatedAt   time.Time       `jsonutoCreateTime" json:"created_at"`
}

func (t *Transaction) BeforeCreate(tx *gorm.DB) (err error) {
	if t.ID == uuid.Nil {
		t.ID = uuid.New()
	}
	return
}
