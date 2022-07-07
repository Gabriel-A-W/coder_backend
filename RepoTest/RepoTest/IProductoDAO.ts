import { IProducto } from "./IProducto";

export interface IProductoDAO
{
    add(p: Partial<IProducto>): number;
    deleteById(id: number): boolean;
    getById(id: number): IProducto;
    getAll(): IProducto[]
    update(p: IProducto): void;
}
