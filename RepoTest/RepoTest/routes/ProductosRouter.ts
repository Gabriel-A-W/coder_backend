import * as express from "express";
import { IProductoDAO } from "../IProductoDAO"


export function CrearProductosRouter(productosDAO: IProductoDAO) : express.Router
{
    const router = express.Router();
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.get("/", (req, res) => {
        res.json(productosDAO.getAll());
    });


    return router;
}

