import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextApiRequest } from "next";
import {} from "iron-session";
import { SessionData, User, sessionOptions } from "@/lib/session";
import { oauth2Client } from "@/lib/oauth2Client";

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url!);
  const code = searchParams.get("code");

  if (!code) {
    return redirect("/?error=code_not_found");
  }

  // Exchange the code for an access token
  const { accessToken, refreshToken, expiresAt } =
    await oauth2Client.authorizationCode.getToken({
      code,
      redirectUri: "http://localhost:3000/api/oauth/callback",
    });

  console.log("token", { accessToken, refreshToken, expiresAt });

  // Fetch the user's profile using the access token from the previous step
  const userResponse = await fetch(
    `${process.env.DUB_API_URL}/oauth/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const user = (await userResponse.json()) as User;

  console.log("profile", user);

  // In production, you should save the access_token to your database and read it from there.
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.user = user;
  session.accessToken = accessToken;
  await session.save();

  return redirect("/");
}
