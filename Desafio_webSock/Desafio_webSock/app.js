"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const handlebars = require("express-handlebars");
const http = require("node:http");
const FileMensajesRepository_1 = require("./chat/repositorios/impl/FileMensajesRepository");
const ChatServer_1 = require("./chat/servicios/ChatServer");
const RAMProductosRepository_1 = require("./ecomerce/repositorios/impl/RAMProductosRepository");
const ProductoListServer_1 = require("./ecomerce/servicios/ProductoListServer");
const ProductosRouter_1 = require("./routes/ProductosRouter");
const Vistas_1 = require("./routes/Vistas");
const datosPrueba = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    },
    {
        "title": "Globo Terr�queo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    }
];
const app = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const prodServer = new ProductoListServer_1.ProductoListServer(httpServer, new RAMProductosRepository_1.RAMProductosRepository(datosPrueba), { path: "/productos" });
const chatServer = new ChatServer_1.ChatServer(httpServer, new FileMensajesRepository_1.FileMensajesRepository("chatdb.json"), { path: "/chat" });
const engines = {
    hbs() {
        app.engine("hbs", handlebars.engine());
        app.set("view engine", "hbs");
    },
    pug() {
        app.set("view engine", "pug");
    },
    ejs() {
        app.set("view engine", "ejs");
    }
};
//Seteo del view engine
if (process.argv.length < 3) {
    throw new Error("Elija view engine pug|hbs|ejs");
}
try {
    const viewEngine = process.argv[2];
    engines[viewEngine]();
    app.set('views', `./views/${viewEngine}`);
}
catch (err) {
    throw new Error("Elija view engine pug|hbs|ejs");
}
app.use(express.static('public'));
app.use("/api/productos", ProductosRouter_1.default);
app.use("/", Vistas_1.default);
httpServer.listen(port, () => {
    console.log(`Puerto: ${port}`);
});
//# sourceMappingURL=app.js.map