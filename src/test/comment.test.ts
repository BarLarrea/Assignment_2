import { loginUser } from './../controller/userController';
import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import { Express } from "express";
import userModel from "../models/userModel";
import postsModel from "../models/postModel";
import commentModel from '../models/commentModel';
import {generateAccessToken, generateRefreshToken} from "../middleWare/jwtMiddle";
import { describe, it, beforeAll, expect, test, jest } from "@jest/globals";
 
process.env.NODE_ENV = "test";
jest.setTimeout(10000);
 
describe("Comment Endpoints", () => {
  let accessToken: string;
  let refreshToken: string;
  let userId: string;
  let postId: string;
  let commentId: string;
  const invalidCommentId = "60f7b1b1b1b1b1b1b1b1b1b1";
 
  beforeAll(async () => {
    await userModel.deleteMany({});
    await postsModel.deleteMany({});
    await commentModel.deleteMany({});
    await request(app)
      .post("/users/register")
      .send({
        firstName: "bar",
        lastName: "larrea",
        email: "bar@mail.com",
        password: "123456",
      });
 
      const loginUserResponse = await request(app)
      .post("/users/login")
      .send({
        email: "bar@mail.com",
        password: "123456",
      });
    accessToken = loginUserResponse.body.accessToken;
    refreshToken = loginUserResponse.body.refreshToken;
    userId = loginUserResponse.body.id;
 
    const post =  await request(app)
  .post("/posts/create")
  .set("Authorization", `Bearer ${accessToken}`)
  .send({
    message: "Hello World",
  });
  postId = post.body._id;
});
 
  it("should create Comment", async () => {
    const comment = {
      message: "Hello World",
      postId,
    };
    const res = await request(app)
      .post("/comments/create")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(comment);
    expect(res.status).toEqual(201);
    commentId = res.body._id;
  });
  it("should not create Comment without message", async () => {
    const comment = {
      postId,
    };
    const res = await request(app)
      .post("/comments/create")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(comment);
    expect(res.status).toEqual(400);
  });
  it("Should get all comments", async () => {
    const res = await request(app)
      .get("/comments/all")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toEqual(200);
  });
  it("Should get comment by Id", async () => {
    const res = await request(app)
      .get(`/comments/${commentId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toEqual(200);
  });
  it("Should not get comment by Id", async () => {
    const res = await request(app)
      .get(`/comments/${invalidCommentId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toEqual(404);
  });
 
  it("Should get comments by user Id", async () => {
    const res = await request(app)
      .get(`/comments/user/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toEqual(200);
  });
  it("Should not get comments by user Id", async () => {
    const res = await request(app)
      .get(`/comments/user/${invalidCommentId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toEqual(404);
  });
  it("Should update comment", async () => {
    const res = await request(app)
      .put(`/comments/${commentId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        message: "Hello World",
      });
    expect(res.status).toEqual(200);
  });
  it("Should not update comment", async () => {
    const res = await request(app)
      .put(`/comments/${invalidCommentId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        message: "Hello World",
      });
    expect(res.status).toEqual(404);
  });
  it("Should delete comment", async () => {
    const res = await request(app)
      .delete(`/comments/${commentId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toEqual(200);
  });
  it("Should not delete comment", async () => {
    const res = await request(app)
      .delete(`/comments/${invalidCommentId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toEqual(404);
  });
});
 