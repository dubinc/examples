# Dub Conversions Demo App

[Dub Conversions](https://dub.co/help/article/dub-conversions) is a powerful tool that lets you to turn any [short link you create on Dub](https://dub.co/help/article/how-to-create-link) into a full attribution engine. This allows you to understand how well your links are translating to actual users and revenue dollars.

This example app demonstrates the end-to-end flow of Dub Conversions – from a user clicking on a conversion-enabled link, to signing up for an account, and making a purchase via Stripe.

- Read the docs: https://dub.co/docs/conversions/sales/stripe
- Check out the live demo: https://conversions.dub.sh

## Step 1: Enable the Stripe Integration on Dub

1. Navigate to the [Stripe integration page](https://app.dub.co/integrations/stripe) in your Dub workspace.
2. Click on the "Enable" button to enable the Stripe integration, which will redirect you to the Stripe App installation flow.

![stripe-integration-dub](https://github.com/user-attachments/assets/15c27c66-9869-4822-874a-1140066fc707)

3. Select the Stripe account to install the app on, and select "Install App".

![2](https://github.com/user-attachments/assets/5f0a0c00-5fdf-4960-bfc7-a0110a009b96)

4. Once this is done, you will be redirected back to your Dub workspace and you should see that the integration is now installed.

## Step 2: Create a Stripe product in test mode

1. In the Stripe account that you installed the Dub Conversions app, create a product in test mode.
2. Copy the price ID for the product – you'll need it in Step 5.

![3](https://github.com/user-attachments/assets/5ea2258b-d9eb-4a87-af67-8c00defcfd67)

## Step 3: Create a Dub API Key

1. Create a [Workspace API key](https://app.dub.co/settings/tokens) in your Stripe dashboard.
2. Copy the value of the API key that's generated – you'll need it in Step 5.

![4](https://github.com/user-attachments/assets/a2e994b4-a583-489a-ab91-403fd25c1d02)

## Step 4: Go through the conversion flow on the demo app

In this step, we will go through the end-to-end journey of a customer clicking on a referral link, signing up, and making a purchase.

![5](https://github.com/user-attachments/assets/046d8359-cf9d-4ae1-aa30-f1b4015e3b51)

1. Create a short link on your [Dub dashboard](https://app.dub.co) with https://conversions.dub.sh as the destination URL and Conversion Tracking enabled.
2. When you click on this link it'll bring you to the conversion demo app. You'll notice that there is a `?dclid` query parameter in the browser URL bar, and that it is also stored as a first-party cookie as well.
3. In the demo app, under "Set up your configuration", enter the values that you got from previous steps:
   - DUB_API_KEY: the Dub API key value from step 4
   - STRIPE_SECRET_KEY: your Stripe test mode secret key (https://dashboard.stripe.com/test/apikeys)
   - STRIPE_PUBLISHABLE_KEY: your Stripe test mode publishable key (https://dashboard.stripe.com/test/apikeys)
   - STRIPE_PRICE_ID: the Stripe price ID from step 3
4. Under "Login & checkout", enter dummy values for Name, email, and password. All these values (along with the config values) will be stored in cookies for simplicity.
5. Click "Signup" and you will be redirected to the Stripe checkout flow with the test mode Stripe product you configured earlier.
6. Complete the checkout flow, and you will be redirected back to the Conversion demo app

## Step 5: View conversion results

1. Navigate to your [Dub Analytics dashboard](https://app.dub.co/analytics?view=funnel) to view your conversion results.
2. You should also be able to see the real-time events stream on the [Events dashboard](https://app.dub.co/events).

![6](https://github.com/user-attachments/assets/adffccd4-e328-4c7a-b6f5-27e4879a7968)


