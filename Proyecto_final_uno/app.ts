import * as express from 'express';
import * as http from 'node:http';
import { FileCarritosRepository } from './ecomerce/repositorios/impl/FileCarritosRepository';
import { FileProductosRepository } from './ecomerce/repositorios/impl/FileProductosRepository';
import { ICarritosRepository } from './ecomerce/repositorios/ICarritosRepository';
import { IProductosRepository } from './ecomerce/repositorios/IProductosRepository';
import { ProductosRouterBuilder } from './routes/ProductosRouter';
import { CarritosRouterBuilder } from './routes/CarritosRouter';
 
const app = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);

const carritosRepo : ICarritosRepository = new FileCarritosRepository("carritosdb.json");
const productosRepo : IProductosRepository = new FileProductosRepository("productosdb.json");

 
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
app.use(express.static('public'))

app.get("/admin", (req, res) => {
    esAdminMode = !esAdminMode;
    res.status(200).json({esAdmin: esAdminMode});
});

app.use("/api/productos", adminCheckMiddleware, ProductosRouterBuilder(productosRepo));
app.use("/api/carrito", CarritosRouterBuilder(carritosRepo, productosRepo));

httpServer.listen(port, () => {
    console.log(`Puerto: ${port}`);
});
