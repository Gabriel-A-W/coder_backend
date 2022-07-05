import { IProducto } from "../entidades/IProducto";


export interface IProductosRepository {
    getAll(): Promise<IProducto[]>;
    add(p: Partial<IProducto>): Promise<IProducto>;
    getById(id : number): Promise<IProducto>;
    deleteById(id: number): Promise<boolean>;
    update(producto: Partial<IProducto>): Promise<IProducto>;
    deleteAll(): Promise<void>;
}