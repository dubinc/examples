import { CreateLink } from "@/components/create-link";
import SignInWithDub from "@/components/signin-with-dub";
import { getSession } from "@/lib/actions";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="container mx-auto max-w-4xl">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-5xl font-bold text-black max-w-xl mx-auto">
              Kickstart your Integration with Dub
            </h1>
            <p className="text-lg text-gray-500">
              Integrations allow you to extend the capabilities of Dub and
              seamlessly connect with third-party platforms and services.
            </p>
          </div>

          {session?.user ? (
            <div className="grid gap-y-10">
              <div className="text-gray-800 font-medium">
                Logged in as {session.user.name}
              </div>
              <CreateLink />
            </div>
          ) : (
            <SignInWithDub />
          )}
        </div>
      </section>
    </main>
  );
}
