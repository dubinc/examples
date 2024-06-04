package main

import (
	"context"
	"fmt"
	"log"

	dub "github.com/dubinc/dub-go"
	"github.com/dubinc/dub-go/models/operations"
)

func updateLink(d *dub.Dub) {
	var request *operations.UpdateLinkRequestBody = &operations.UpdateLinkRequestBody{
		URL: "https://google.us",
	}

	ctx := context.Background()
	res, err := d.Links.Update(ctx, "LINK_ID", request)
	if err != nil {
		log.Fatal(err)
	}
	if res.LinkSchema != nil {
		fmt.Println(res.LinkSchema.ShortLink)
	}
}
