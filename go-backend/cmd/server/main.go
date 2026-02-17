package main

import (
	"context"
	"jobfit-ai/internal/config"
	"log"
)

func main() {
	pool := config.ConnectionDb()
	defer pool.Close()
	log.Println("DB connected ✅")

	var version string
	err := pool.QueryRow(context.Background(), "SELECT version()").Scan(&version)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("PostgreSQL version:", version)
}
