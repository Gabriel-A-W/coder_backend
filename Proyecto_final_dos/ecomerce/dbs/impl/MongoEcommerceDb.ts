import * as mongoose from 'mongoose';
import { ICarrito } from "../../entidades/ICarrito";
import { IProducto } from "../../entidades/IProducto";
import { EcommerceDb } from "../EcommerceDb";
import { IRepository } from "../../repositorios/IRepository";
import { MongoRepository } from "../../repositorios/impl/MongoRepository";
import { CarritoMongoModel } from "../../mongo/CarritoMongoModel";
import { ProductoMongoModel } from "../../mongo/ProductoMongoModel";

export class MongoEcommerceDb extends EcommerceDb
{

    private _con: mongoose.Connection;

    

    constructor(connstr: string)
    {
        super();
        this._con = mongoose.createConnection(connstr);
    }

    protected crearCarritos(): IRepository<ICarrito> 
    {
        return new MongoRepository<ICarrito>(CarritoMongoModel(this._con));
    }

    protected crearProductos(): IRepository<IProducto> 
    {
        return new MongoRepository<IProducto>(ProductoMongoModel(this._con));
    }

}