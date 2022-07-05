"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("node:http");
const FileCarritosRepository_1 = require("./ecomerce/repositorios/impl/FileCarritosRepository");
const FileProductosRepository_1 = require("./ecomerce/repositorios/impl/FileProductosRepository");
const ProductosRouter_1 = require("./routes/ProductosRouter");
const CarritosRouter_1 = require("./routes/CarritosRouter");
const app = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const carritosRepo = new FileCarritosRepository_1.FileCarritosRepository("carritosdb.json");
const productosRepo = new FileProductosRepository_1.FileProductosRepository("productosdb.json");
let esAdminMode = false;
const adminCheckMiddleware = (req, res, next) => {
    if (esAdminMode || req.method == "GET") {
        next();
    }
    else {
        res.status(404).json({ errm: `${req.originalUrl} no se encuentra en el servidor` });
    }
};
app.use(express.json());
app.use(express.static('public'));
app.get("/admin", (req, res) => {
    esAdminMode = !esAdminMode;
    res.status(200).json({ esAdmin: esAdminMode });
});
app.use("/api/productos", adminCheckMiddleware, (0, ProductosRouter_1.ProductosRouterBuilder)(productosRepo));
app.use("/api/carrito", (0, CarritosRouter_1.CarritosRouterBuilder)(carritosRepo, productosRepo));
httpServer.listen(port, () => {
    console.log(`Puerto: ${port}`);
});
//# sourceMappingURL=app.js.map