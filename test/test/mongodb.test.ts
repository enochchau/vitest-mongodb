import { MongoClient } from "mongodb";
import { describe, it, expect } from "vitest";

describe("MongoDB", () => {
  it("connects to mongodb", () => {
    expect(async () => {
      const client = new MongoClient(globalThis.__MONGO_URI__);
      try {
        const db = client.db("test");
        await db.command({ ping: 1 });
      } finally {
        await client.close();
      }
    }).not.toThrow();
  });

  it("inserts and reads a document", async () => {
    const client = new MongoClient(globalThis.__MONGO_URI__);
    await client.connect();
    const db = client.db("test");
    const users = db.collection("users");
    await users.insertOne({ username: "test123", password: "test123" });
    const user = await users.findOne({ username: "test123" });
    await client.close();

    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("password");
    expect(user.username).toBe("test123");
    expect(user.password).toBe("test123");
  });
});
