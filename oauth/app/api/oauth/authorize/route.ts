import { redirect } from "next/navigation";

export function GET() {
  const searchParams = new URLSearchParams({
    client_id: `${process.env.DUB_CLIENT_ID}`,
    redirect_uri: "http://localhost:3000/api/oauth/callback",
    response_type: "code",
  });

  return redirect(
    `${process.env.DUB_AUTHORIZATION_URL}?${searchParams.toString()}`
  );
}
