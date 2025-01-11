# Clerk + Next.js – Dub Conversions

This is an example of how to use Dub Conversions to track signups on a Next.js + Clerk app.

## Getting Started

First, make sure you have all the required environment variables set:

### Clerk

To start building, [create a Clerk application](https://dashboard.clerk.com/apps/new) and get your publishable key and secret key:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

You'll also need to [add a custom claim](https://clerk.com/docs/references/nextjs/add-onboarding-flow#add-custom-claims-to-your-session-token) to access the user’s public metadata.

### Dub

Learn how to [get a Dub API key here](https://dub.co/docs/api-reference/tokens):

- `DUB_API_KEY`

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
