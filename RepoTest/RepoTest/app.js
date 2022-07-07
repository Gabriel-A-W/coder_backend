"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const RAMProductoDAO_1 = require("./RAMProductoDAO");
const ProductosRouter_1 = require("./routes/ProductosRouter");
const app = express();
const port = process.env.PORT || 3000;
app.use("/api/productos", (0, ProductosRouter_1.CrearProductosRouter)(new RAMProductoDAO_1.RAMProductoDAO()));
app.listen(port, () => {
    console.log(`Puerto: ${port}`);
});
//# sourceMappingURL=app.js.map