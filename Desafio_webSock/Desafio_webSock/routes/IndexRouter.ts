import express = require('express'); 
import { IProductosRepository } from '../ecommerce/repositorios/IProductosRepository';
import { IAuthManager } from '../sessions/AuthManager';
 

export function crearIndexRouter(contenedor : IProductosRepository, auth : IAuthManager) : express.Router
{
    const router = express.Router();

    router.use(express.static('public'));
    router.use(express.urlencoded({ extended: true }));
    router.use(auth.authGuard({ failureRedirect: "/user/login" }));

    router.get("/", (req, res) => {
        console.log(req.user);
        res.render("index", { userData: req.user });
    });

    router.post("/", async (req, res) => {
        await contenedor.add(req.body);
        res.render("index", { userData: req.user});
    });

    return router;
}

 