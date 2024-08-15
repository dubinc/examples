import { getSession } from "@/lib/session";
import LoginPageClient from "./page-client";

export default function LoginPage() {
  return <LoginPageClient session={getSession()} />;
}
