import { LinksDemo } from "@/components/links-demo";
import { getSession } from "@/lib/actions";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="container mx-auto max-w-4xl min-h-screen flex items-center flex-col justify-center">
      <section className="w-full px-4 md:px-6 flex flex-col items-center text-center gap-6">
        <div className="max-w-lg">
          <h1 className="font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
            Kickstart your
            <br />
            <span className="bg-gradient-to-r py-1 from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Dub Integration
            </span>
          </h1>
          <h2 className="mt-5 text-gray-600 sm:text-xl">
            Integrate Dub&apos;s powerful link management infrastructure into
            your applications.
          </h2>
        </div>

        <div className="flex gap-2">
          <Link
            href="https://dub.co/docs/integrations/quickstart"
            target="_blank"
            className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-300 border-black bg-black text-white"
          >
            Read the docs
          </Link>
          <Link
            href="https://github.com/dubinc/examples/tree/main/oauth"
            target="_blank"
            className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-800 text-gray-500"
          >
            View the code
          </Link>
        </div>

        <LinksDemo />
      </section>
    </main>
  );
}
