import { ConnectDub } from "@/components/connect-dub";
import { CreateLink } from "@/components/create-link";
import { Profile } from "@/components/profile";
import { getSession } from "@/lib/actions";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="container mx-auto max-w-4xl p-10 h-screen">
      <h1 className="text-3xl font-bold mb-10">Dub OAuth Example</h1>
      <div className="flex gap-5 flex-col">
        {session?.user ? (
          <Profile user={session.user} />
        ) : (
          <ConnectDub url="/api/oauth/authorize" />
        )}
        {session?.user && <CreateLink />}
      </div>
    </main>
  );
}
