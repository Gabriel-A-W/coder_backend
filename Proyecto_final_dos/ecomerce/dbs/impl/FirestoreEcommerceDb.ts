import * as firebase from 'firebase-admin'; 
import { ICarrito } from "../../entidades/ICarrito";
import { IProducto } from "../../entidades/IProducto";
import { EcommerceDb } from "../EcommerceDb";
import { IRepository } from "../../repositorios/IRepository";
import { Carrito } from "../../entidades/impls/Carrito";
import { FirestoreRepository } from "../../repositorios/impl/FirestoreRepository";
import { Producto } from "../../entidades/impls/Producto";

export class FirestoreEcommerceDb extends EcommerceDb
{
    private static readonly COLL_CARRITOS : string = "carritos";
    private static readonly COLL_PRODUCTOS : string = "productos";

    private _con : firebase.firestore.Firestore;

    constructor(cfgstr: string)
    {
        super();

        const serviceAccount = require(`../../../configs/${cfgstr}`);

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount)
        });
    
        this._con = firebase.firestore();
    }

    protected crearCarritos(): IRepository<ICarrito> 
    {
        return new FirestoreRepository<ICarrito>(this._con.collection(FirestoreEcommerceDb.COLL_CARRITOS), Carrito);
    }

    protected crearProductos(): IRepository<IProducto> 
    {
        return new FirestoreRepository<IProducto>(this._con.collection(FirestoreEcommerceDb.COLL_PRODUCTOS), Producto);
    }

}