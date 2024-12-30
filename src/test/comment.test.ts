import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import User from "../models/userModel"
import Comment from "../models/commentModel"
import { describe, it, afterEach, beforeAll, expect } from "@jest/globals";

process.env.NODE_ENV = "test";

let userId: string;
let testPostId: string;
let accessToken: string;
let refreshToken: string

jest.setTimeout(10000);

beforeAll(async () => {
  const userResponse = await request(app)
  .post("/users/register")
  .send({
    firstName: "shimi",
    lastName: "angel",
    email: "testuser@gmail.com",
    password: "password123",
  });


  const loginResponse = await request(app)
  .post("/users/login")
  .send({
    email: "testuser@gmail.com",
    password: "password123",
  });
  accessToken = loginResponse.body.accessToken;
  refreshToken = loginResponse.body.refreshToken
  userId = loginResponse.body.id;


  const postResponse = await request(app)
    .post("/posts/create")
    .set('Authorization', `Bearer ${accessToken}`).send({
    message: "Test Post",
    userId: userId,
  });
  testPostId = postResponse.body._id;
});

describe("Comments endpoints", () => {
  it("should create a new comment", async () => {
    const newComment = {
      message: "This is a test comment",
      userId: userId,
      postId: testPostId,
    };

    const response = await request(app)
      .post("/comments/create")
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newComment);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", newComment.message);
    expect(response.body).toHaveProperty("postId", newComment.postId);
  });

  it("should not create a new comment with missing fields ", async () => {
    const newComment = {
      message: "This is a test comment",
      userId: userId,
    };

    const response = await request(app)
      .post("/comments/create")
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newComment);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe("All fields are required")
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
