package main

import (
	"log"
	"os"

	dub "github.com/dubinc/dub-go"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	d := dub.New(
		dub.WithSecurity(os.Getenv("DUB_API_KEY")),
	)

	createLink(d)
	// upsertLink(d)
	// updateLink(d)
	// getAnalytics(d)
}
