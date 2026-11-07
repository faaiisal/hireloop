import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { getDb, mongoClient } from "@/lib/mongodb"

export const auth = betterAuth({
  database: mongodbAdapter(getDb(), {
    client: mongoClient,
    // Local MongoDB instances run standalone (no replica set) and don't
    // support transactions. Flip this back when you deploy to a replica set /
    // service that supports them (e.g. MongoDB Atlas with transactions).
    transaction: false,
  }),
  baseURL: process.env.BETTER_AUTH_URL, // [!code highlight]
  emailAndPassword: {
    enabled: true,
    // Full reset flow is wired — but there is no email provider yet.
    // DEV STUB: the reset link is logged to the server console so you can
    // test end-to-end today. When Resend/SMTP lands, replace the console.log
    // with the provider send (one-line swap, same `url` + `user.email`).
    sendResetPassword: async ({ user, url }) => {
      console.log(`[auth] password-reset link for ${user.email}: ${url}`)
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["sekker", "recruiter", "admin"],
        input: false,
      },
    },
  },
  emailVerification: {
    // Ready-but-off: flip to `sendOnSignUp: true` once an email provider
    // is configured, otherwise new users get a verification mail nobody sends.
    sendOnSignUp: false,
    // Same DEV STUB deal as sendResetPassword — swap for provider send later.
    sendVerificationEmail: async ({ user, url }) => {
      console.log(`[auth] verification link for ${user.email}: ${url}`)
    },
  },
  // Google OAuth skipped for now — re-add socialProviders when
  // GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET are configured.
  socialProviders: {
    google: {
      // [!code highlight]
      clientId: process.env.GOOGLE_CLIENT_ID as string, // [!code highlight]
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // [!code highlight]
    }, // [!code highlight]
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  plugins: [nextCookies()],
})
