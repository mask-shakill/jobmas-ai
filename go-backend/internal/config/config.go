package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func ConnectionDb() *pgxpool.Pool {
    
	err := godotenv.Load()
    fmt.Println("Host:", os.Getenv("DB_HOST"))
    if err != nil {
        log.Println("Warning: .env file not found, using system env")
		godotenv.Load("../.env")
    }
    dsn := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=%s",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_NAME"),
        os.Getenv("DB_SSLMODE"),
    )
    config, err := pgxpool.ParseConfig(dsn)
    if err != nil {
        log.Fatalf("Config parse করতে সমস্যা হয়েছে: %v", err)
    }
    config.MaxConns = 10                      
    config.MinConns = 2                       
    config.MaxConnIdleTime = 5 * time.Minute  

    pool, err := pgxpool.NewWithConfig(context.Background(), config)
    if err != nil {
        log.Fatalf("Database not connected: %v", err)
    }

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    
    err = pool.Ping(ctx)
    if err != nil {
        log.Fatalf("Database ping failed: %v", err)
    }

    log.Println("Database connected successfully! ✅")
    return pool
}