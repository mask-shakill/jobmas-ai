package config

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectDB() *pgxpool.Pool {
	databaseUrl := os.Getenv("DATABASE_URL")
	pool, err := pgxpool.New(context.Background(), databaseUrl)
	if err != nil {
		log.Fatal("Unable to connect to PostgreSQL:", err)
	}
	return pool
}
