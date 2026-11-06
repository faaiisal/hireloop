import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error(
    "MONGODB_URI is not set. Add it to your .env file (e.g. mongodb://localhost:27017/hireloop)."
  )
}

// Cache the client on the global object in development so Next.js HMR
// doesn't create a new connection pool on every reload.
const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient
}

export const mongoClient =
  globalWithMongo._mongoClient ??
  (globalWithMongo._mongoClient = new MongoClient(uri))

export function getDb() {
  return mongoClient.db()
}
