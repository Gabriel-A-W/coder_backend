import { IProducto } from "../IProducto";

export class Producto implements IProducto
{
    public id: number = null;
    public timestamp: number = null;
    public nombre: string = null;
    public descripcion: string = null;
    public codigo: string = null;
    public foto: string = null;
    public precio: number = null;
    public stock: number = null;
}