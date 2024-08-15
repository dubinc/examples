import Controller from "@/components/controller";
import { getConfig } from "@/lib/config";
import { getSession } from "@/lib/session";

export default function Page() {
  const [config, session] = [getConfig(), getSession()];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Controller config={config} session={session} />
    </main>
  );
}
