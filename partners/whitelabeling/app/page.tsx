import { auth } from "@/lib/auth";
import { SignupButton } from "./signup-button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>
        <SignupButton />
      </div>
    </div>
  );
}
