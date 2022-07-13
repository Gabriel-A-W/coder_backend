import { ICarrito } from "../ICarrito";
import { IProducto } from "../IProducto";


export class Carrito implements ICarrito
{
    id: number = undefined;
    timestamp: number = Date.now();
    productos: IProducto[] = [];

    constructor()
    {
    }
}