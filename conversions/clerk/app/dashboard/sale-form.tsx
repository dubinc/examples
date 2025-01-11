"use client";

import { trackSale } from "@/actions/track-sale";
import { LoadingCircle } from "@/components/loading-circle";
import { cn } from "@/lib/cn";
import { useActionState } from "react";

export function SaleForm() {
  const [state, formAction, isPending] = useActionState(trackSale, {
    message: "",
    ok: true,
  });

  return (
    <form className="mt-4" action={formAction}>
      <div className="flex flex-wrap gap-2">
        <input
          name="amount"
          type="number"
          placeholder="Amount (dollars)"
          className="rounded-lg border border-black/30 px-2 py-1 text-sm placeholder-black/30"
        />
        <button
          type="submit"
          className={cn(
            "flex h-7 w-16 items-center justify-center rounded-lg border border-black bg-black text-sm font-medium text-white",
            isPending && "cursor-not-allowed opacity-50",
          )}
          disabled={isPending}
        >
          {isPending ? <LoadingCircle /> : "Submit"}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`mt-1 text-sm ${state?.ok ? "text-green-600" : "text-red-600"}`}
        role="status"
      >
        {state?.message}
      </p>
    </form>
  );
}
