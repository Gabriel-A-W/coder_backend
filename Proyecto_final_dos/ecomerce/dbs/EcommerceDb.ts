import { ICarrito } from "../entidades/ICarrito";
import { IProducto } from "../entidades/IProducto";
import { Esquema } from "../repositorios/Esquema";
import { IRepository } from "../repositorios/IRepository";
import { RepoEsquematizado } from "../repositorios/RepoEsquematizado";


export abstract class EcommerceDb
{
    
    private _carritos! : IRepository<ICarrito>;
    private _productos! : IRepository<IProducto>;

    public static _EsquemaProductos : Esquema<IProducto> =  new Esquema<IProducto>({
        id: Number,
        timestamp: Number,
        nombre: String,
        descripcion: String,
        codigo: String,
        foto: String,
        precio: Number,
        stock: Number,
    }); 

    private static _EsquemaCarritos : Esquema<ICarrito> = new Esquema<ICarrito>({
        id: Number,
        timestamp: Number, 
        productos:  [EcommerceDb._EsquemaProductos]
    });

    get carritos() : IRepository<ICarrito>
    {
        if(!this._carritos)
        {
            this._carritos = new RepoEsquematizado<ICarrito>(this.crearCarritos(), EcommerceDb._EsquemaCarritos);
        }
        
        return this._carritos;
    }

    get productos() : IRepository<IProducto>
    {
        if(!this._productos)
        {
            this._productos = new RepoEsquematizado<IProducto>(this.crearProductos(), EcommerceDb._EsquemaProductos);
        }

        return this._productos;
    }

    protected abstract crearCarritos() : IRepository<ICarrito>;
    protected abstract crearProductos() : IRepository<IProducto>;
    

}