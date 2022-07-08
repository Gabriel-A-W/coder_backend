import { Producto } from "../../entidades/Producto";
import { IProductosRepository } from "../IProductosRepository";
import * as FSPromise from "node:fs/promises";
import * as FS from "node:fs";
import { IProducto } from "../../entidades/IProducto";


const { O_CREAT } = FS.constants;

export class FileProductosRepository implements IProductosRepository
{

    private _fpath: string;
    private _esPrimeraVez: boolean = true;
    private _data: Producto[] = [];
    

    constructor(fpath: string)
    {
        this._fpath = fpath;
    }


    private async dump(): Promise<void>
    {
        await FSPromise.writeFile(this._fpath, JSON.stringify(this._data), "utf-8");
    }

    private async getNextId() {
        const data = await this.getAll();
        if (data.length === 0) {
            return 1;
        }

        return Math.max(...data.map((e) => e.id)) + 1;
    }


    async getAll(): Promise<IProducto[]>
    {
        if (this._esPrimeraVez)
        {
            try
            {
                const contenido = await FSPromise.readFile(this._fpath, { encoding: "utf-8", flag: O_CREAT });
                this._esPrimeraVez = false;

                if (contenido.length > 0)
                {
                    this._data = JSON.parse(contenido);
                }
            }
            catch (err)
            {
                throw err;
            } 
        }

        return this._data;
    }

    async add(p: Partial<IProducto>): Promise<IProducto>
    {
        let otroP: IProducto = Producto.Copy(p);

        otroP.id = await this.getNextId();
        (await this.getAll()).push(otroP);
        await this.dump();

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

        if (idx < 0)
        {
            return false;
        }

        data.splice(idx, 1);
        await this.dump();
        return true;
    }

    async deleteAll(): Promise<void>
    {
        this._data = [];
        await this.dump();
    }
}