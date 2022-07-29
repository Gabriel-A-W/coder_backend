import express = require('express'); 
import { IProductosRepository } from '../ecommerce/repositorios/IProductosRepository';
import { IAuthManager } from '../sessions/AuthManager';
 

export function crearIndexRouter(contenedor : IProductosRepository, auth : IAuthManager) : express.Router
{
    const router = express.Router();
    const authGuard = auth.authGuard({ failureRedirect: "/user/login" });
    router.use(express.static('public'));
    router.use(express.urlencoded({ extended: true }));
     
    router.get("/", authGuard, (req, res) => {
        console.log(req.user);
        res.render("index", { userData: req.user });
    });

    router.post("/", authGuard, async (req, res) => {
        await contenedor.add(req.body);
        res.render("index", { userData: req.user});
    });

    return router;
}

 