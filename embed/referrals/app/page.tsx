import { auth } from "@/lib/auth";
import { SignupButton } from "./signup-button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Grid } from "@/ui/grid";
import Image from "next/image";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObject = await searchParams;
  const searchParamsString = Object.fromEntries(
    Object.entries(searchParamsObject).map(([key, value]) => [
      key,
      String(value),
    ])
  );
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect(
      `/dashboard?${new URLSearchParams(searchParamsString).toString()}`
    );
  }

  return (
    <div className="relative grow flex items-center justify-center bg-background py-8 px-2">
      <div className="absolute inset-0 blur-sm opacity-90">
        <div className="absolute inset-x-4 top-0 bottom-4 rounded-xl bg-foreground/5 overflow-hidden">
          <div className="absolute left-1/2 w-full max-w-screen-lg top-0 aspect-[2/3] -translate-x-1/2 sm:block hidden">
            <Image src="/screenshots/full-light.jpg" alt="Screenshot" fill className="object-contain object-top dark:hidden" />
            <Image src="/screenshots/full-dark.jpg" alt="Screenshot" fill className="object-contain object-top dark:block hidden" />
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[470px] bg-background rounded-xl overflow-hidden border border-foreground/15">
        <div className="h-[200px] bg-foreground/5 border-b border-foreground/5 relative overflow-hidden">
          <Grid
            cellSize={34}
            patternOffset={[-5, -12]}
            className="text-foreground/15 left-1/2 -translate-x-1/2 inset-y-0 w-[600px] [mask-image:radial-gradient(150%_100%_at_50%_0%,transparent,black)]"
          />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-[min(320px,90%)] bg-background h-[85%] rounded-t-lg border-x border-t border-foreground/10">
            <div className="absolute inset-x-1 top-1 bottom-0 overflow-hidden rounded-t-lg">
              {/* Screenshots (light/dark) */}
              <Image src="/screenshots/small-light.jpg" alt="Screenshot" fill className="object-cover object-top dark:hidden" />
              <Image src="/screenshots/small-dark.jpg" alt="Screenshot" fill className="object-cover object-top hidden dark:block" />
            </div>
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-lg font-semibold text-foreground">
            Dub Partners Referrals Embed Demo
          </h1>
          <p className="mt-2 text-foreground/70 text-sm leading-normal">
            Explore the Dub Partners demo. Click the event triggers, and explore the different tabs
            to see how Dub can help convert your users into advocates effortlessly within your app.
          </p>
          <div className="mt-8">
            <SignupButton />
          </div>
        </div>
      </div>
    </div>
  );
}
