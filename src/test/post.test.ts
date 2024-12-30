import { loginUser } from './../controller/userController';
import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import { Express } from "express";
import userModel from "../models/userModel";
import postsModel from "../models/postModel";
import {generateAccessToken, generateRefreshToken} from "../middleWare/jwtMiddle";
import { describe, it, beforeAll, expect, test, jest } from "@jest/globals";

process.env.NODE_ENV = "test";
jest.setTimeout(10000);

describe("Post Endpoints", () => {
    let accessToken: string;
    let refreshToken: string;
    let userId: string;
    let postId: string;
    const invalidPostId = "60f7b1b1b1b1b1b1b1b1b1b1";
    

    beforeAll(async () => {
        await userModel.deleteMany({});
        await postsModel.deleteMany({});
        await request(app)
            .post("/users/register")
            .send({
                firstName: "Omer",
                lastName: "Smith",
                email: "Omer@gmail.com",
                password: "123456"
            });
        
        const loginUserResponse = await request(app)
            .post("/users/login")
            .send({
                email: "Omer@gmail.com",
                password: "123456"
            });
        accessToken = loginUserResponse.body.accessToken;
        refreshToken = loginUserResponse.body.refreshToken;
        userId = loginUserResponse.body.id;
    });
 
    it("should create Post", async () => {
        const post = {
            "message": "Hello World"
        }
        const res = await request(app)
            .post("/posts/create")
            .set("Authorization", `Bearer ${accessToken}`)
            .send(post);
        expect(res.status).toEqual(201);
        postId = res.body._id;
 ;
    });
    it("should not create Post without message", async () => {
        const post = {
        }
        const res = await request(app)
            .post("/posts/create")
            .set("Authorization", `Bearer ${accessToken}`)
            .send(post);
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual("Invalid post data");
    });
    it("should get all posts", async () => {
        const res = await request(app)
            .get("/posts/all")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(res.status).toEqual(200);
    });
    it("should get post by Id", async () => {
       const res = await request(app)
            .get(`/posts/${postId}`)
            .set("Authorization", `Bearer ${accessToken}`);
        expect(res.status).toEqual(200);
    });
    it("should get post by Id", async () => {
        const res = await request(app)
             .get(`/posts/${invalidPostId}`)
             .set("Authorization", `Bearer ${accessToken}`);
         expect(res.status).toEqual(404);
         expect(res.body.message).toEqual("Post not found");
     });
     it("should update post", async () => {
        const post = {
            "message": "Hello World Updated"
        }
        const res = await request(app)
            .put(`/posts/${postId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(post);
        expect(res.status).toEqual(200);
    });
    it("should not update post id", async () => {
        const post = {
            "message": "Hello World Updated"
        }
        const res = await request(app)
            .put(`/posts/${invalidPostId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(post);
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual("Post not found");
    });
    it("should not update post without message", async () => {
        const post = {
        }
        const res = await request(app)
            .put(`/posts/${postId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(post);
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual("Invalid post data");
    });
    it("should delete post", async () => {
        const res = await request(app)
            .delete(`/posts/${postId}`)
            .set("Authorization", `Bearer ${accessToken}`);
        expect(res.status).toEqual(200);
    });
    it("should not delete post with invalid id", async () => {
        const res = await request(app)
            .delete(`/posts/${invalidPostId}`)
            .set("Authorization", `Bearer ${accessToken}`);
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual("Post not found");
    });
});