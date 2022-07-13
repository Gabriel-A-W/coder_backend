import * as express from 'express';
import * as  http from 'node:http';
import * as  mongodb from  'mongoose';
import * as firebase from 'firebase-admin'; 
import { ProductosRouterBuilder } from './routes/ProductosRouter';
import { CarritosRouterBuilder } from './routes/CarritosRouter';
import { IProducto } from './ecomerce/entidades/IProducto'; 
import { ProductoMongoModel } from './ecomerce/mongo/ProductoMongoModel';
import { MongoRepository } from './ecomerce/repositorios/impl/MongoRepository';
import { IRepository } from './ecomerce/repositorios/IRepository';
import { ICarrito } from './ecomerce/entidades/ICarrito';
import { CarritoMongoModel } from './ecomerce/mongo/CarritoMongoModel';
 
import { FirestoreRepository } from './ecomerce/repositorios/impl/FirestoreRepository';
import { Producto } from './ecomerce/entidades/impls/Producto';
import { Carrito } from './ecomerce/entidades/impls/Carrito';
import { EcommerceDb } from './ecomerce/dbs/EcommerceDb';
import { CrearEcommerceDb } from './ecomerce/dbs/EcommerceDbFactory';

 
  
   
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

    httpServer.listen(port, () => {
        console.log(`Puerto: ${port}`);
    });
    
}

run();