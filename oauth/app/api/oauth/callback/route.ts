import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextApiRequest } from "next";
import {} from "iron-session";
import { SessionData, User, sessionOptions } from "@/lib/session";

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url!);
  const code = searchParams.get("code");

  if (!code) {
    return redirect("/");
  }

  // Exchange the code for an access token
  const response = await fetch(`${process.env.DUB_API_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/api/oauth/callback",
      client_id: `${process.env.DUB_CLIENT_ID}`,
      client_secret: `${process.env.DUB_CLIENT_SECRET}`,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data);
  }

  // Fetch the user's profile
  const userResponse = await fetch(
    `${process.env.DUB_API_URL}/oauth/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );

  const user = (await userResponse.json()) as User;

  // Save the user to the session cookie
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.user = user;
  await session.save();

  return redirect("/");
}
