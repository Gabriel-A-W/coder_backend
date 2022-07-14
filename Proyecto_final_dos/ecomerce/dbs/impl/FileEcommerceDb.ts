import  * as path from "path";
import { ICarrito } from "../../entidades/ICarrito";
import { Carrito } from "../../entidades/impls/Carrito";
import { Producto } from "../../entidades/impls/Producto";
import { IProducto } from "../../entidades/IProducto";
import { EcommerceDb } from "../EcommerceDb";
import { FileRepository } from "../../repositorios/impl/FileRepository";
import { IRepository } from "../../repositorios/IRepository"; 

export class FileEcommerceDb extends EcommerceDb
{

    private _dirPath: string;

    constructor(dirPath: string)
    {
        super();
        this._dirPath = dirPath;
    }

    protected crearCarritos(): IRepository<ICarrito> 
    {
        return new FileRepository<ICarrito>(path.join(process.cwd(), this._dirPath, "carritosdb.json"));
    }

    protected crearProductos(): IRepository<IProducto> 
    {
        return  new FileRepository<IProducto>(path.join(process.cwd(), this._dirPath, "productosdb.json"));
    }

}