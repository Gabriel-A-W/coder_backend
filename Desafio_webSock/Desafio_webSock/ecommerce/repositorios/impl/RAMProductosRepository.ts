import { IProducto } from "../../entidades/IProducto";
import { Producto } from "../../entidades/Producto";
import { IProductosRepository } from "../IProductosRepository";

export class RAMProductosRepository implements IProductosRepository
{
    private _data: IProducto[];

    constructor(prods:IProducto[] = [])
    {
        this._data = [...prods];
    }


    private async getNextId()
    {
        const data = await this.getAll();
        if (data.length === 0) {
            return 1;
        }

        return Math.max(...data.map((e) => e.id)) + 1;
    }

    async getAll(): Promise<IProducto[]>
    {
        return this._data;
    }

    async add(p: Partial<IProducto>): Promise<IProducto>
    {
        const otroP: IProducto = Producto.Copy(p);
        otroP.id = await this.getNextId();

        this._data.push(otroP);

        return otroP;
    }

    async getById(id: number): Promise<IProducto>
    {
        return (await this.getAll()).find((e) => e.id === id);
    }

    async deleteById(id: number): Promise<boolean>
    {
        const data = (await this.getAll());
        const idx = (await this.getAll()).findIndex((e) => e.id === id);

        if (idx < 0) {
            return false;
        }

        data.splice(idx, 1); 
        return true;
    }

    async deleteAll(): Promise<void>
    {
        this._data = []; 
    }
}