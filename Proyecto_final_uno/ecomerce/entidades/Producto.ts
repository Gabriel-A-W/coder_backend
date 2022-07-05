import { IProducto } from "./IProducto";

export class Producto implements IProducto
{
    id: number;
    timestamp: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;


    constructor()
    {
    }

    copy(otro: Partial<IProducto>): void
    {
        
        this.id = otro.id;
        this.timestamp = otro.timestamp;
        this.nombre = otro.nombre;
        this.descripcion = otro.descripcion;
        this.codigo = otro.codigo;
        this.foto = otro.foto;
        this.precio = otro.precio;
        this.stock = otro.stock; 
    }


    static Copy(otro: Partial<IProducto>): Producto
    {
        const p: Producto = new Producto();
        p.id = otro.id;
        p.timestamp = otro.timestamp;
        p.nombre = otro.nombre;
        p.descripcion = otro.descripcion;
        p.codigo = otro.codigo;
        p.foto = otro.foto;
        p.precio = otro.precio;
        p.stock = otro.stock;

        return p;
    }
}