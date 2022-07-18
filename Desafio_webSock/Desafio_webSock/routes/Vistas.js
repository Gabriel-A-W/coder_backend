"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearVistasRouter = void 0;
const express = require("express");
const FakerProductosRepository_1 = require("../ecommerce/repositorios/impl/FakerProductosRepository");
function crearVistasRouter(contenedor) {
    const router = express.Router();
    router.use(express.static('public'));
    router.use(express.urlencoded({ extended: true }));
    router.get("/", (req, res) => {
        res.render("index");
    });
    router.post("/", async (req, res) => {
        await contenedor.add(req.body);
        res.render("index");
    });
    router.get("/productos", async (req, res) => {
        res.render("catalogo", { values: await contenedor.getAll() });
    });
    router.get("/api/productos-test", async (req, res) => {
        const repo = new FakerProductosRepository_1.FakerProductosRepository(5);
        res.render("prodtest", { values: await repo.getAll() });
    });
    return router;
}
exports.crearVistasRouter = crearVistasRouter;
//# sourceMappingURL=Vistas.js.map