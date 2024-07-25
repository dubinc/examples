import { CreateLink } from "@/components/create-link";
import { getSession } from "@/lib/actions";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="container mx-auto max-w-4xl py-40">
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
            <div className="space-y-20">
              <div className="text-gray-800 font-medium">
                Logged in as {session.user.name}
              </div>
              <CreateLink />
            </div>
          ) : (
            <Link
              href="/api/oauth/authorize"
              className="bg-black text-white py-2 px-4 rounded"
              prefetch={false}
            >
              Sign in with Dub
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
