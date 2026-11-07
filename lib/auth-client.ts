import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  // Same-domain default: the client talks to /api/auth on this app.
  // (Do NOT use process.env.BETTER_AUTH_URL here — it is not a
  // NEXT_PUBLIC_ var, so it resolves to `undefined` in the browser.)
})

export const { signIn, signUp, useSession } = authClient
