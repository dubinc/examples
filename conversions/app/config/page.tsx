import { getConfig } from "@/lib/config";
import ConfigPageClient from "./page-client";

export default function ConfigPage() {
  return <ConfigPageClient config={getConfig()} />;
}
