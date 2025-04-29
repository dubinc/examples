export const env = {
  DUB_API_KEY: process.env.DUB_API_KEY,
  DUB_PROGRAM_ID: process.env.DUB_PROGRAM_ID || "",

  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
} as const;
