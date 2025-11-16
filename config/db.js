import mongoose from "mongoose";

class Database {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
  }

  async connect() {
    try {
      console.log("🔌 Connecting to MongoDB...");

      await mongoose.connect(this.uri, {
        dbName: this.dbName,
      });

      console.log(`✅ Connected to MongoDB Database: ${this.dbName}`);
      console.log(`🌍 Host: ${mongoose.connection.host}`);
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }
}

export default Database;
