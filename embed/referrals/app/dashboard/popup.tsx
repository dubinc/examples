"use client";

import { useEffect, useState } from "react";

import { useFormStatus } from "react-dom";
import { trackConversion } from "./track-conversion";
import Cookies from "js-cookie";

export function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const dubId = Cookies.get("dub_id");
    if (dubId) {
      setShowPopup(true);
    }
  }, [showPopup]);

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-200 fade-in-0 zoom-in-95">
      <div className="relative max-w-sm">
        {/* Background blur */}
        <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl border border-black/20 dark:border-white/20 shadow-2xl" />

        {/* Content */}
        <div className="relative bg-white dark:bg-black rounded-2xl p-6 border border-black/20 dark:border-white/20 shadow-xl">
          <div className="flex flex-col gap-2 pb-4">
            <h3 className="font-semibold text-black dark:text-white">
              Simulate a conversion event
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70">
              We&apos;ll track a lead and sale event on Dub using the TypeScript
              SDK.{" "}
              <a
                href="https://github.com/dubinc/examples/tree/main/embed/referrals"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the code ↗
              </a>
            </p>
          </div>

          <form action={trackConversion}>
            <FormButton />
          </form>
        </div>
      </div>
    </div>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full px-3 cursor-pointer py-1.5 rounded-lg font-medium transition-all duration-200 transform ${
        pending
          ? "bg-black/10 dark:bg-white/10 text-black/50 dark:text-white/50"
          : "bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 hover:scale-102"
      } shadow-md hover:shadow-lg disabled:cursor-not-allowed border border-black/20 dark:border-white/20`}
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
