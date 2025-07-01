"use client";

import { useEffect, useState } from "react";

import { useFormStatus } from "react-dom";
import { trackConversion } from "./track-conversion";
import Cookies from "js-cookie";
import { CircleDotted } from "../icons/nucleo/circle-dotted";
import { CircleCheckFill } from "../icons/nucleo/circle-check-fill";

const STEPS = [
  "Copy your referral link",
  "Paste it in this tab and go"
]

export function Popup() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const dubId = Cookies.get("dub_id");
    if (dubId)
      setIsReady(true);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 animate-in slide-in-from-bottom-2 duration-200 fade-in-0 zoom-in-95">
        {/* Content */}
        <div className="max-w-[340px] relative bg-background rounded-xl border border-foreground/15 shadow-lg overflow-hidden">
          <div className="flex flex-col gap-2 bg-neutral-900 text-white p-4">
            <h3 className="font-semibold text-base">
              Simulate a conversion event
            </h3>
            <p className="text-sm text-white/70">
              We&apos;ll track a lead and sale on Dub with the TypeScript
              SDK.{" "}
              <a
                href="https://github.com/dubinc/examples/tree/main/embed/referrals"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the code&nbsp;↗
              </a>
            </p>
          </div>

          <div className="p-4 flex flex-col gap-4">

            <div className="rounded-lg border border-foreground/10 flex flex-col divide-y divide-foreground/10">
              {STEPS.map((step, index) => (
                <div key={index} className="flex items-center gap-2 h-11 px-3 cursor-default">
                  {isReady ? <CircleCheckFill className="size-[1.125rem] text-green-600" /> : <CircleDotted className="size-[1.125rem] text-foreground/40" />}
                  <span className={`text-sm font-medium ${isReady ? "text-foreground/40" : "text-foreground/60"}`}>{step}</span>
                </div>
              ))}
            </div>

            <form action={trackConversion}>
              <FormButton disabled={!isReady} />
            </form>
          </div>
        </div>
    </div>
  );
}

function FormButton({disabled}: {disabled: boolean}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className={
        [
          "flex items-center justify-center w-full h-8 px-3 transition-colors duration-150",
          "rounded-lg text-sm font-medium cursor-pointer bg-foreground text-background hover:bg-foreground/90",
          "disabled:bg-foreground/5 dark:disabled:bg-foreground/10 disabled:border-foreground/5 disabled:border disabled:text-foreground/40 disabled:cursor-not-allowed",
        ].join(" ")
      }
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Converting...
        </div>
      ) : (
        "Simulate event"
      )}
    </button>
  );
}
