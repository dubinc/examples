"use client";

import ConfigClient from "@/components/config";
import LoginClient from "@/components/login";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Config } from "@/lib/config";
import { Session } from "@/lib/session";
import { useRouter, useSearchParams } from "next/navigation";

export default function Controller({
  config,
  session,
}: {
  config: Config;
  session: Session;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="max-w-screen-sm w-full p-8 border border-foreground-500 rounded-xl animate-fade-in">
      <Accordion
        type="single"
        value={searchParams.get("step") ?? "config"}
        onValueChange={(e) => {
          router.push(`/?step=${e}`);
        }}
      >
        <AccordionItem value="config">
          <AccordionTrigger className="text-lg font-medium">
            Set up your configuration
          </AccordionTrigger>
          <AccordionContent>
            <ConfigClient config={config} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="login">
          <AccordionTrigger className="text-lg font-medium">
            Login & checkout
          </AccordionTrigger>
          <AccordionContent>
            <LoginClient session={session} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
