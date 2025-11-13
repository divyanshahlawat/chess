import { MongoClient } from "mongodb";


class Database {
  constructor(uri, dbName) {
    this.client = null;
    this.db = null;
    this.uri = uri;
    this.dbName = dbName;
  }
async connect() {
  try {
    if (this.db && this.client) {
      console.log("♻️ Using cached MongoDB connection");
      return this.db;
    }

    console.log("🔌 Connecting to MongoDB...");

    this.client = new MongoClient(this.uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });

    await this.client.connect();

    this.db = this.client.db(this.dbName);

    console.log(`✅ Connected to MongoDB Database: ${this.dbName}`);
    console.log(`🌍 Host: ${this.client.s.options.srvHost || this.uri}`);

    return this.db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); 
  }
}

  collection(name) {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db.collection(name);
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

export default Database;