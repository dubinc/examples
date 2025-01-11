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
import SuccessClient from "./success";
import { BarChartIcon, GearIcon, IdCardIcon } from "@radix-ui/react-icons";

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
          <AccordionTrigger>
            <div className="text-lg font-medium flex items-center gap-2">
              <GearIcon className="size-5" /> Set up your configuration
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ConfigClient config={config} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="login">
          <AccordionTrigger>
            <div className="text-lg font-medium flex items-center gap-2">
              <IdCardIcon className="size-5" /> Login & checkout
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <LoginClient session={session} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="success">
          <AccordionTrigger>
            <div className="text-lg font-medium flex items-center gap-2">
              <BarChartIcon className="size-5" /> View Conversion Results
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SuccessClient />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
