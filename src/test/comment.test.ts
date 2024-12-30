import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import { describe, it, afterEach, beforeAll, expect } from "@jest/globals";

process.env.NODE_ENV = "test";

let testUserId: string;
let testPostId: string;
let accessToken: string;

beforeAll(async () => {
  const userResponse = await request(app).post("/users/register").send({
    email: "testuser@gmail.com",
    password: "password123",
  });
  testUserId = userResponse.body._id;

  const loginResponse = await request(app).post("/users/login").send({
    email: "testuser@gmail.com",
    password: "password123",
  });
  accessToken = loginResponse.body.accessToken;

  if (!testUserId || !accessToken) {
    throw new Error("User creation or login failed");
  }

  const postResponse = await request(app).post("/posts/create").set('auth', `Bearer ${accessToken}`).send({
    message: "Test Post",
    userId: testUserId,
  });
  testPostId = postResponse.body._id;
});

describe("POST /comments", () => {
  it("should create a new comment", async () => {
    const newComment = {
      message: "This is a test comment",
      userId: testUserId,
      postId: testPostId,
    };

    const response = await request(app)
      .post("/comments")
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newComment);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", newComment.message);
    expect(response.body).toHaveProperty("postId", newComment.postId);
  });
});

afterEach(async () => {
  await mongoose.connection.collection("comments").deleteMany({});
  await mongoose.connection.collection("posts").deleteMany({});
  await mongoose.connection.collection("users").deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});
