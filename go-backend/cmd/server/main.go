package main

import (
	"context"
	"log"

	"your_project/config"
)

func main() {
	pool := config.ConnectDB()
	defer pool.Close()
	log.Println("DB connected ✅")

	// test query
	var version string
	err := pool.QueryRow(context.Background(), "SELECT version()").Scan(&version)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("PostgreSQL version:", version)
}
