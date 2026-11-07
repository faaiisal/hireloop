import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

// `inferAdditionalFields<typeof auth>` (type-only import — erased at build,
// nothing server-side ships to the browser) teaches the client about the
// server's `user.additionalFields` (e.g. `role`), so sign-up calls and the
// session user type accept them.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  // Same-domain default: the client talks to /api/auth on this app.
  // (Do NOT use process.env.BETTER_AUTH_URL here — it is not a
  // NEXT_PUBLIC_ var, so it resolves to `undefined` in the browser.)
})

export const { signIn, signUp, useSession } = authClient
