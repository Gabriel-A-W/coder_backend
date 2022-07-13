import { IRecord } from "./IRecord";

export interface IProducto extends IRecord
{
    id: number;
    timestamp: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;
}