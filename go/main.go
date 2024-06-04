package main

import (
	"context"
	"fmt"
	"log"
	"os"

	dub "github.com/dubinc/dub-go"
	"github.com/dubinc/dub-go/models/operations"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	s := dub.New(
		dub.WithSecurity(os.Getenv("DUB_API_KEY")),
		dub.WithWorkspaceID(os.Getenv("DUB_WORKSPACE_ID")),
	)

	var request *operations.CreateLinkRequestBody = &operations.CreateLinkRequestBody{
		URL: "https://google.com",
	}

	ctx := context.Background()
	res, err := s.Links.Create(ctx, request)
	if err != nil {
		log.Fatal(err)
	}
	if res.LinkSchema != nil {
		fmt.Println(res.LinkSchema.ShortLink)
	}
}
