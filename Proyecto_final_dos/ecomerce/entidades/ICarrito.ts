import { IRecord } from "./IRecord";
import { IProducto } from "./IProducto";

export interface ICarrito extends IRecord
{
    id: number;
    timestamp: number;
    productos: IProducto[];
}