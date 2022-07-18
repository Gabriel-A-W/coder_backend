import express = require('express');
import { get } from 'http';
import { FakerProductosRepository } from '../ecommerce/repositorios/impl/FakerProductosRepository';
import { IProductosRepository } from '../ecommerce/repositorios/IProductosRepository';
import { SessionManager } from '../sessions/SessionManager';



export function crearVistasRouter(contenedor : IProductosRepository) : express.Router
{
    const router = express.Router();

    router.use(express.static('public'));
    router.use(express.urlencoded({ extended: true }));


    router.get("/", SessionManager.authGuard(), (req, res) => {

        
        res.render("index", { userData: req.session.userData });
    });

    router.get("/login", (req, res) => {
        res.render("login");
    });

    router.post("/", SessionManager.authGuard(), async (req, res) => {
        await contenedor.add(req.body);
        res.render("index");
    });

    router.get("/productos", SessionManager.authGuard(), async (req, res) => {
        res.render("catalogo", { values: await contenedor.getAll() });
    });

    router.get("/api/productos-test", SessionManager.authGuard(), async (req, res) => {
        const repo = new FakerProductosRepository(5);
        res.render("prodtest", { values: await repo.getAll() });

    });

    return router;
}

 