import { redirect } from "next/navigation";
import { oauth2Client } from "@/lib/oauth2Client";

export async function GET() {
  const url = await oauth2Client.authorizationCode.getAuthorizeUri({
    redirectUri: "http://localhost:3000/api/oauth/callback",
    scope: ["links.write", "tags.write", "domains.read"],
    state: "some-random-state",
  });

  return redirect(url);
}
