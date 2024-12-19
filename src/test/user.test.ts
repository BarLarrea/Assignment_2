import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
// import postsModel from "../models/posts_model";
import { Express } from "express";
import userModel from "../models/userModel";
import postsModel from "../models/postModel";
import { describe, it, beforeAll, expect } from "@jest/globals";

process.env.NODE_ENV = "test";


describe("User Endpoints", () => {

    it("should login a user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                email: "Omer@gmail.com",
                password: "123456"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("accessToken");
        expect(res.body).toHaveProperty("refreshToken");
    });
});