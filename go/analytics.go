package main

import (
	"context"
	"fmt"
	"log"

	dub "github.com/dubinc/dub-go"
	"github.com/dubinc/dub-go/models/operations"
)

// TODO:
// Fix this
func getAnalytics(d *dub.Dub) {
	var request *operations.RetrieveAnalyticsRequest = &operations.RetrieveAnalyticsRequest{
		Timezone: dub.String("America/New_York"),
	}

	ctx := context.Background()
	res, err := d.Analytics.Retrieve(ctx, request)
	if err != nil {
		log.Fatal(err)
	}
	if res.LinkSchema != nil {
		fmt.Println(res.LinkSchema.ShortLink)
	}
}
