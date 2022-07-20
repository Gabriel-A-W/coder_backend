import express = require('express');
import { IProducto } from '../../ecommerce/entidades/IProducto'; 
import { FakerProductosRepository } from '../../ecommerce/repositorios/impl/FakerProductosRepository';
import { IProductosRepository } from '../../ecommerce/repositorios/IProductosRepository';
import { IAuthManager } from '../../sessions/AuthManager';
 
export function crearAPIProductosRouter(contenedor : IProductosRepository, auth: IAuthManager) : express.Router
{
    const router = express.Router();
 

    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.use(auth.authGuard({ failureMessage: "No autorizado" }));

    router.get("/", async (req, res) => {
        const data = await contenedor.getAll();
        res.json(data);
    });

    router.get("/:id", async (req, res) => {
        const data = await contenedor.getById(parseInt(req.params.id));
        res.json(data);
    });

    router.post("/", async (req, res) => {
        const o: IProducto = Object.assign({}, req.body);
        res.json(await contenedor.add(o));
    });

    router.put("/:id", async (req, res) => {
        const data: IProducto = await contenedor.getById(parseInt(req.params.id));
        if (data) {
            const id = data.id;
            Object.assign(data, req.body);
            data.id = id;
            res.status(200);
            res.send();
        }
    });

    router.delete("/:id", async (req, res) => {
        if (await contenedor.deleteById(parseInt(req.params.id))) {
            res.status(200);
            res.send();
        }
        else {
            res.status(404);
            res.send();
        }
    });

    router.get("/test", async (req, res) => {
        const repo = new FakerProductosRepository(5);
        res.render("prodtest", { values: await repo.getAll() });

    });

    return router;
}
 