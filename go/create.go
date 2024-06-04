package main

import (
	"context"
	"fmt"
	"log"

	dub "github.com/dubinc/dub-go"
	"github.com/dubinc/dub-go/models/operations"
)

func createLink(d *dub.Dub) {
	var request *operations.CreateLinkRequestBody = &operations.CreateLinkRequestBody{
		URL: "https://google.com",
	}

	ctx := context.Background()
	res, err := d.Links.Create(ctx, request)
	if err != nil {
		log.Fatal(err)
	}
	if res.LinkSchema != nil {
		fmt.Println(res.LinkSchema.ShortLink)
	}
}
