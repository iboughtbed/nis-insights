import { createSafeActionClient } from "next-safe-action";

import { getServerAuthSession } from "~/lib/auth";

export const protectedAction = createSafeActionClient({
  async middleware() {
    const session = await getServerAuthSession();

    if (!session?.user) {
      throw new Error("Unauthenticated");
    }

    return { session };
  },
});

export const action = createSafeActionClient();
