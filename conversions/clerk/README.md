# Clerk + Next.js – Dub Conversions

This is an example of how to use Dub Conversions to track signups on a Next.js + Clerk app.

## Step 1: Set up environment variables

### Dub

Learn how to [get a Dub API key here](https://dub.co/docs/api-reference/tokens). Add it to your `.env` file as the `DUB_API_KEY` variable.

### Clerk

[Create a Clerk application](https://dashboard.clerk.com/apps/new) and get your publishable key and secret key:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

You'll also need to [add a custom claim](https://clerk.com/docs/references/nextjs/add-onboarding-flow#add-custom-claims-to-your-session-token) to access the user’s public metadata. You can do that under [Configure > Sessions > Customize session token](https://dashboard.clerk.com/last-active?path=sessions).

![CleanShot 2025-01-10 at 17 15 31](https://github.com/user-attachments/assets/037789ed-f8d3-4464-ab51-77efcdaf1c27)

## Step 2: Start the project

Then, install the dependencies and run the development server:

```bash
npm install && npm run dev
# or
yarn && yarn dev
# or
pnpm install && pnpm dev
# or
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the login screen:

![CleanShot 2025-01-10 at 17 19 37](https://github.com/user-attachments/assets/6c7cb0f1-b609-4fc3-b1d7-a1e0951c9f0a)

## Step 3: Track signup conversions

Follow this guide to continue to track conversions 
