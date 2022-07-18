import { RequestHandler } from 'express';
import * as expressSession  from 'express-session';
import MongoStore = require('connect-mongo');

export class SessionManager
{
    private static _url: string;
    private static _loginPath: string;
    private static _expressMidware: RequestHandler;
    private static _authGuard: RequestHandler;


    static init(url: string, loginPath: string = "/login"): void
    {
        this._url = url;
        this._loginPath = loginPath;
        this._expressMidware = expressSession({
            store: MongoStore.create({
                mongoUrl: `${this._url}`,
            }),
            secret: "UnS3cr3t0",
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 600000 }
            
        });

        this._authGuard = (req, res, next) => {
            if (!req.session.userData) {
                res.redirect(this._loginPath);
            }
            else {

                next();
            }
        };

        

    }

    static middleware(): RequestHandler {
        if (!this._expressMidware)
            throw new Error("SessionManager debe ser inicializado!");
        return this._expressMidware;
    }

    static authGuard(): RequestHandler {
        if (!this._authGuard)
            throw new Error("SessionManager debe ser inicializado!");

        console.log("this._authGuard!!!!!!", this._authGuard);
        return this._authGuard;
    }
}

