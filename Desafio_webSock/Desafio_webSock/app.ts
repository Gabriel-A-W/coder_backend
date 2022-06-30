import * as express from 'express';
import * as handlebars from 'express-handlebars';
import * as http from 'node:http';
import { FileMensajesRepository } from './chat/repositorios/impl/FileMensajesRepository';
import { ChatServer } from './chat/servicios/ChatServer';
import { RAMProductosRepository } from './ecomerce/repositorios/impl/RAMProductosRepository';
import { ProductoListServer } from './ecomerce/servicios/ProductoListServer';

import productosRouter from './routes/ProductosRouter';
import vistas from './routes/Vistas';

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
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    }
];


const app = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const prodServer = new ProductoListServer(httpServer, new RAMProductosRepository(datosPrueba), { path: "/productos" });
const chatServer = new ChatServer(httpServer, new FileMensajesRepository("chatdb.json"), { path: "/chat" });

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

app.use(express.static('public'))
app.use("/api/productos", productosRouter);
app.use("/", vistas);



httpServer.listen(port, () => {
    console.log(`Puerto: ${port}`);
});
