"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearProductosRouter = void 0;
const express = require("express");
function CrearProductosRouter(productosDAO) {
    const router = express.Router();
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    router.get("/", (req, res) => {
        res.json(productosDAO.getAll());
    });
    return router;
}
exports.CrearProductosRouter = CrearProductosRouter;
//# sourceMappingURL=ProductosRouter.js.map