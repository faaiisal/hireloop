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
  },
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
