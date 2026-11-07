import { MongoClient } from "mongodb"

const uri = process.env.BETTER_AUTH_DB_URI ?? process.env.MONGODB_URI

if (!uri) {
  throw new Error(
    "No database URI is set. Add BETTER_AUTH_DB_URI to your .env file (e.g. mongodb://localhost:27017/hireloop)."
  )
}

// Pinned after the guard so every consumer below sees `string`, not `string | undefined`.
const dbUri: string = uri

// Cache the client on the global object in development so Next.js HMR
// doesn't create a new connection pool on every reload.
const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient
}

export const mongoClient =
  globalWithMongo._mongoClient ??
  (globalWithMongo._mongoClient = new MongoClient(dbUri))

export function getDb() {
  // The Atlas URI in .env carries no database path (ends in "/"), and
  // client.db() with no name silently falls back to "test" — so resolve
  // the name explicitly, defaulting to "hireloop".
  let name = "hireloop"
  try {
    name = new URL(dbUri).pathname.replace(/^\//, "") || "hireloop"
  } catch {
    // Non-standard URI shape — keep the default.
  }
  return mongoClient.db(name)
}
