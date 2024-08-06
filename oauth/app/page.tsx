import { LinksDemo } from "@/components/links-demo";
import SignInWithDub from "@/components/signin-with-dub";
import { getSession } from "@/lib/actions";
import { ClientOnly } from "@dub/ui";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="container mx-auto max-w-4xl">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="max-w-4xl">
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
              Kickstart your
              <br />
              <span className="bg-gradient-to-r py-1 from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
                Dub Integration
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500">
              Integrations allow you to extend the capabilities of Dub and
              seamlessly connect with third-party platforms and services.
            </p>
          </div>

          {session?.user ? (
            // Prevents SSR, which would cause hydration errors due to local storage requirements
            // TODO: Remove the outer div once the ClientOnly component accepts className
            <div className="w-full [&>div]:w-full">
              <ClientOnly>
                <LinksDemo />
              </ClientOnly>
            </div>
          ) : (
            <SignInWithDub />
          )}
        </div>
      </section>
    </main>
  );
}
