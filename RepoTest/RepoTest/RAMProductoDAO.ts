import { IProducto } from "./IProducto";
import { IProductoDAO } from "./IProductoDAO";

export class RAMProductoDAO implements IProductoDAO
{
    private _productos: IProducto[] = [{ "id": 1, "nombre": "qwertyuiop", "descripcion": "prueba", "foto": "asddas", "precio": 443, "stock": 12 }, { "id": 2, "nombre": "hfdsdfshk", "descripcion": "dsfdf", "foto": "asddas", "precio": 443, "stock": 12 }]
    private _maxId: number = 0;

    constructor()
    {
    }

    add(p: Partial<IProducto>): number {
        let nuevo : IProducto = Object.assign({
            id: 0,
            nombre: "",
            descripcion: "",
            precio: 0,
            stock: "",
            foto: ""
        }, p);

        this._maxId++;
        nuevo.id = this._maxId;

        this._productos.push(nuevo);

        return nuevo.id;
    }
    deleteById(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    getById(id: number): IProducto {
        throw new Error("Method not implemented.");
    }
    getAll(): IProducto[] {
        return this._productos;
    }
    update(p: IProducto): void {
        throw new Error("Method not implemented.");
    }

}