import { ICarrito } from "../entidades/ICarrito";
import { IProducto } from "../entidades/IProducto";
import { IRepository } from "../repositorios/IRepository";


export abstract class EcommerceDb
{
    
    private _carritos! : IRepository<ICarrito>;
    private _productos! : IRepository<IProducto>;


    get carritos() : IRepository<ICarrito>
    {
        if(!this._carritos)
        {
            this._carritos = this.crearCarritos();
        }
        return this._carritos;
    }

    get productos() : IRepository<IProducto>
    {
        if(!this._productos)
        {
            this._productos = this.crearProductos();
        }

        return this._productos;
    }

    protected abstract crearCarritos() : IRepository<ICarrito>;
    protected abstract crearProductos() : IRepository<IProducto>;
    

}