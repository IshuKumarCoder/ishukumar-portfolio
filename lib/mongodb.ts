import mongoose, { type Mongoose } from "mongoose";

function getMongoUri(): string {
  const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside .env.local"
    );
  }
  return uri;
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = getMongoUri();
    cached.promise = mongoose.connect(uri).then((conn) => {
      console.log("MongoDB connected");
      return conn;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
};
