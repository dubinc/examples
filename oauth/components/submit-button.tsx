"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer"
      disabled={pending}
      type="submit"
    >
      {pending ? "Creating..." : "Create Link"}
    </button>
  );
}
