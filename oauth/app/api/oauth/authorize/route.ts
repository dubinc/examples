import { redirect } from "next/navigation";
import { oauth2Client } from "@/lib/oauth2Client";

export async function GET() {
  const url = await oauth2Client.authorizationCode.getAuthorizeUri({
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback`,
    scope: ["links.write", "tags.write", "domains.read"],
    state: "some-random-state",
  });

  return redirect(url);
}
