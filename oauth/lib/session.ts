import type { SessionOptions } from "iron-session";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SessionData {
  user?: User;
  accessToken?: string;
  codeVerifier?: string;
}

export const sessionOptions: SessionOptions = {
  password: `${process.env.SECRET_COOKIE_PASSWORD}`,
  cookieName: "iron-session/examples/next.js",
  // Secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
