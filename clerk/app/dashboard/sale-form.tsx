"use client";

import { trackSale } from "@/actions/trackSale";
import { useActionState } from "react";

export function SaleForm() {
  const [state, formAction] = useActionState(trackSale, {
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
          className="h-7 rounded-lg border border-black bg-black px-2 text-sm font-medium text-white"
        >
          Submit
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
