import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect("/dashboard");

  return (
    <div>
      <h1 className="font-display text-xl font-bold">Dub Clerk Demo</h1>
      <div className="mt-4 flex flex-col gap-1 text-black/60">
        <p>Sign up to create a lead event.</p>
        <p>Once signed in, you can also create a sale event.</p>
      </div>
    </div>
  );
}
