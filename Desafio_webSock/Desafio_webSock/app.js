"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const handlebars = require("express-handlebars");
const knex_1 = require("knex");
const http = require("node:http");
const ProductosRouter_1 = require("./routes/ProductosRouter");
const Vistas_1 = require("./routes/Vistas");
const ChatKnexDbContext_1 = require("./chat/knexdb/ChatKnexDbContext");
const KnexMensajesRepository_1 = require("./chat/repositorios/impl/KnexMensajesRepository");
const EcommerceKnexDbSetuper_1 = require("./ecommerce/knexdb/EcommerceKnexDbSetuper");
const KnexProductosRepository_1 = require("./ecommerce/repositorios/impl/KnexProductosRepository");
const ProductoListServer_1 = require("./websockets/ProductoListServer");
const ChatServer_1 = require("./websockets/ChatServer");
const Main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    const port = process.env.PORT || 3000;
    const httpServer = http.createServer(app);
    const ecommerceDbConfigs = {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: "productosdb.sqlite"
        }
    };
    const chatDbConfigs = {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: '',
            password: '',
            database: 'chatdb'
        }
    };
    const ecommerceDBConn = new EcommerceKnexDbSetuper_1.EcommerceKnexDbContext((0, knex_1.default)(ecommerceDbConfigs));
    const chatDBConn = new ChatKnexDbContext_1.ChatKnexDbContext((0, knex_1.default)(chatDbConfigs));
    yield ecommerceDBConn.setup();
    yield chatDBConn.setup();
    const prodRepo = new KnexProductosRepository_1.KnexProductosRepository(ecommerceDBConn);
    const chatRepo = new KnexMensajesRepository_1.KnexMensajesRepository(chatDBConn);
    const prodServer = new ProductoListServer_1.ProductoListServer(httpServer, prodRepo, { path: "/productos" });
    const chatServer = new ChatServer_1.ChatServer(httpServer, chatRepo, { path: "/chat" });
    app.engine("hbs", handlebars.engine());
    app.set("view engine", "hbs");
    app.set('views', `./views/hbs`);
    app.use(express.static('public'));
    app.use("/api/productos", ProductosRouter_1.default);
    app.use("/", Vistas_1.default);
    httpServer.listen(port, () => {
        console.log(`Puerto: ${port}`);
    });
});
Main();
//# sourceMappingURL=app.js.map