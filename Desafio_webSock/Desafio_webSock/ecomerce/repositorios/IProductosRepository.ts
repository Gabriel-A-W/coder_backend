import { IProducto } from "../entidades/IProducto";


export interface IProductosRepository {
    getAll(): Promise<IProducto[]>;
    add(p: IProducto): Promise<IProducto>;
    getById(id : number): Promise<IProducto>;
    deleteById(id : number): Promise<boolean>;
    deleteAll(): Promise<void>;
}