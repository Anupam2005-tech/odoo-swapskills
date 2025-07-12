const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); // Make sure your app is exported in index.js

const testUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "test123",
};

let agent = request.agent(app); // To persist cookies across requests

describe("User API Tests", () => {
  afterAll(async () => {
    // Cleanup DB and close connection
    await mongoose.connection.db.collection('users').deleteOne({ email: testUser.email });
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await agent.post("/api/users/register").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toMatch(/Account created successfully/i);
  });

  it("should NOT register the same user again", async () => {
    const res = await agent.post("/api/users/register").send(testUser);
    expect(res.statusCode).toBe(409);
    expect(res.body.msg).toMatch(/User already exists/i);
  });

  it("should login the user", async () => {
    const res = await agent.post("/api/users/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Login successful");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should NOT login with wrong password", async () => {
    const res = await agent.post("/api/users/login").send({
      email: testUser.email,
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toMatch(/Invalid email or password/i);
  });

  it("should logout the user", async () => {
    const res = await agent.post("/api/users/logout");
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Logged out successfully");
  });

  it("should login again to test delete", async () => {
    const res = await agent.post("/api/users/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
  });

  it("should delete the user account", async () => {
    const res = await agent.delete("/api/users/delete");
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toMatch(/Account deleted successfully/i);
  });
});