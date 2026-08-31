import mongoose from "mongoose";

class DatabaseService {
  // Own connection instance (not the mongoose singleton) so models depend on it explicitly.
  readonly connection = mongoose.createConnection();
  #connected = false;
  host: string;
  username: string;
  password: string;
  port: string;
  database: string;
  uri?: string;

  constructor(host: string, username: string, password: string, port: string, database: string, uri?: string) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = port;
    this.database = database;
    this.uri = uri;
  }

  async connect() {
    if (!this.#connected) {
      try {
        const uri =
          this.uri ||
          `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}?authSource=admin`;
        await this.connection.openUri(uri);
        this.#connected = true;
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
    }
  }

  async disconnect() {
    if (this.#connected) {
      try {
        await this.connection.close();
        this.#connected = false;
        console.log("Disconnected from MongoDB");
      } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
      }
    }
  }
}

export const databaseService = new DatabaseService(
  process.env["DATABASE_HOST"] || "localhost",
  process.env["DATABASE_USERNAME"] || "admin",
  process.env["DATABASE_PASSWORD"] || "password",
  process.env["DATABASE_PORT"] || "27017",
  process.env["DATABASE_NAME"] || "cse341",
  process.env["DATABASE_URI"],
);
