import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  // Can also be an async function.
  async handleReturnedServerError(e) {
    return e.message;
  },
});
