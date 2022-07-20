import expressSession = require("express-session");

import MongoStore = require("connect-mongo");

import { RequestHandler } from 'express';

 
export const sessionManager = (mongoUrl: string): RequestHandler => {
    return expressSession({
        store: MongoStore.create({
            mongoUrl: mongoUrl,
        }),
        secret: "UnS3cr3t0",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 }
    });
};
