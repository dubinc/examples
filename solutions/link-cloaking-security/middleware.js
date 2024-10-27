import { next } from "@vercel/edge";

export default function middleware() {
  return next({
    headers: {
      "X-Frame-Options": "DENY",
      "Content-Security-Policy": "frame-ancestors 'self' dub.link",
      "Strict-Transport-Security":
        "max-age=31536000; includeSubDomains; preload",
    },
  });
}
