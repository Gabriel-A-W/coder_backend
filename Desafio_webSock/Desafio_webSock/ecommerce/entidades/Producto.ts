import { IProducto } from "./IProducto";

export class Producto implements IProducto
{
    public id: number;
    public title: string;
    public price: number;
    public thumbnail: string;

    constructor()
    {
    }

    static Copy(otro: Partial<IProducto>): Producto
    {
        const p: Producto = new Producto();
        p.id = otro.id;
        p.title = otro.title;
        p.price = otro.price;
        p.thumbnail = otro.thumbnail;

        return p;
    }
}