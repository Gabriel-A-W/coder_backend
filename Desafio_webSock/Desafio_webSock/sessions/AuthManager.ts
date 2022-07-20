import express = require("express")
import passport = require("passport");
import bcryptjs = require("bcryptjs");
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import type { IUserRepository } from "./repositorios/IUserRepository";
import type { IUser } from "./entidades/IUser";  


//Esconde la implementacion
export interface AuthOpts extends passport.AuthenticateOptions
{
    
};


export interface IAuthManager
{
    authenticate(opts: AuthOpts): express.RequestHandler;
    register(opts: AuthOpts): express.RequestHandler;
    logOut(opts: AuthOpts): express.RequestHandler;
    authGuard(opts: AuthOpts): express.RequestHandler;
}

passport.serializeUser((user: IUser, done) => {
    done(null, { name: user.name, email: user.email, username: user.username });

});

passport.deserializeUser(async (user, done) => {
    try {
        //const u = await userRepo.get(username);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});



export class LocalAuthManager implements IAuthManager
{
    
    private _repo: IUserRepository = null;
    private static  _instance: LocalAuthManager;


    constructor(repo : IUserRepository)
    {
        this._repo = repo; 

        passport.use(new LocalStrategy(this.verify.bind(this))); 
    }

    public session() : express.RequestHandler
    {
        return passport.session();
    }

    public static getInstance(): LocalAuthManager
    {
        if (!this._instance)
        {
            throw new Error("Debe inicializar primero");
        }

        return this._instance;
    }

    private crearHash(p: string): string
    {
        return bcryptjs.hashSync(p, bcryptjs.genSaltSync(10))
    }

    private passwordCompare(a: string, b: string): boolean
    {
        return bcryptjs.compareSync(a, b);
    }

    private async verify(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) : Promise<void>
    {
        try
        {
            const user: IUser = await this._repo.get(username);

            if (!user || !this.passwordCompare(password, user.password))
            {
                return done(null, false, { message: "Usuario o clave invalidos" });
            }

            return done(null, user);
        }
        catch (err)
        {
            return done(err);
        }
    }


    public register(opts: AuthOpts): express.RequestHandler 
    {
        return async (req, res, next) => {

            const user: IUser =
            {
                username: req.body.username,
                email: req.body.email,
                password: this.crearHash(req.body.password),
                name: req.body.name
            };

            try
            {
                const realUser: IUser = await this._repo.add(user);

                if (realUser)
                {
                    if (opts.successRedirect)
                    {
                        req.logIn(realUser, (err) => {
                            if (err)
                                next(err)
                            else
                                res.redirect(opts.successRedirect)
                        }); 

                        return;
                    }
                    
                }
                else
                {
                    if (opts.failureRedirect)
                        return res.redirect(opts.failureRedirect+`?errm=${encodeURI("No se pudo registrar, verifique los datos ingresados")}`)
                }

                next();
            }
            catch (err)
            {
                next(err);
            } 
        } 
    }

    public logOut(opts: AuthOpts): express.RequestHandler 
    {
        return (req, res, next) => {
            req.logOut({ keepSessionInfo: false }, (err) => {
                if (err)
                {
                    next(err);
                }
                else if (opts.successRedirect)
                {
                    res.redirect(opts.successRedirect);
                }
                else
                {
                    next();
                } 
            }); 
        };
    }


    public authGuard(opts : AuthOpts): express.RequestHandler 
    {
        return (req, res, next) => {
            if (!req.isAuthenticated())
            { 
                if (opts.failureRedirect)
                    return res.redirect(opts.failureRedirect)
                else if (opts.failureMessage)
                   return res.status(403).send(opts.failureMessage);
                
            }
            else if (opts.successRedirect)
            {
               return res.redirect(opts.successRedirect)
            }
             
            return next();
            
        }
    }

    public authenticate(opts: AuthOpts): express.RequestHandler 
    { 
        return passport.authenticate("local", opts);
    } 
}

 