import * as express from 'express';
import * as  http from 'node:http';
import { ProductosRouterBuilder } from './routes/ProductosRouter';
import { CarritosRouterBuilder } from './routes/CarritosRouter';
import { EcommerceDb } from './ecomerce/dbs/EcommerceDb';
import { CrearEcommerceDb } from './ecomerce/dbs/EcommerceDbFactory';
import { Esquema } from './ecomerce/repositorios/Esquema';
import { IProducto } from './ecomerce/entidades/IProducto';
import { ICarrito } from './ecomerce/entidades/ICarrito';
import { Producto } from './ecomerce/entidades/impls/Producto';

 
   
async function run() 
{
    const app = express();
    const port = process.env.PORT || 3000;
    const httpServer = http.createServer(app);
    
    const db : EcommerceDb = CrearEcommerceDb(require('./configs/dbconfigs.json'));
    
    let esAdminMode = true;

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



    app.use("/api/productos", adminCheckMiddleware, ProductosRouterBuilder(db.productos));
    app.use("/api/carrito", CarritosRouterBuilder(db.carritos, db.productos));

    
    db.productos.add(EcommerceDb._EsquemaProductos.create())
    httpServer.listen(port, () => {
        console.log(`Puerto: ${port}`);
    });
    
}

run();