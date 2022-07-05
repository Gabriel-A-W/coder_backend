import { IProducto } from "./IProducto";

export interface ICarrito
{
    id: number;
    timestamp: number;
    productos: IProducto[];
}