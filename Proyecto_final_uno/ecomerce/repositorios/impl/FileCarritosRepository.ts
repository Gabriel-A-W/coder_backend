import { ICarrito } from "../../entidades/ICarrito";
import { ICarritosRepository } from "../ICarritosRepository";
import * as FSPromise from "node:fs/promises";
import * as FS from "node:fs";
import { Carrito } from "../../entidades/Carrito";

const { O_CREAT } = FS.constants;


export class FileCarritosRepository implements ICarritosRepository
{
    private _fpath: string;
    private _esPrimeraVez: boolean = true;
    private _data: Map<number, ICarrito> = new Map<number, ICarrito>();

    constructor(fpath: string)
    {
        this._fpath = fpath;
    }

    private async dump(): Promise<void>
    {
        await FSPromise.writeFile(this._fpath, JSON.stringify(Array.from(this._data.entries())), "utf-8");
    }




    private async getAll(): Promise<Map<number, ICarrito>>
    {
        if (this._esPrimeraVez)
        {
            try
            {
                const contenido = await FSPromise.readFile(this._fpath, { encoding: "utf-8", flag: O_CREAT });
                this._esPrimeraVez = false;

                if (contenido.length > 0) {
                    this._data = new Map<number, ICarrito>(JSON.parse(contenido));
                }
                else
                {
                   await this.dump();
                }
            }
            catch (err) {
                throw err;
            }
        }

        return this._data; 
    }

    private async getNextId(): Promise<number>
    {
        const data = [...(await this.getAll()).keys()];
        if (data.length === 0)
            return 1;

        return Math.max(...data) + 1;
    }


    async add(carrito: Partial<ICarrito>): Promise<ICarrito>
    {
        let otroP: ICarrito = Object.assign(new Carrito(await this.getNextId()), carrito);
        (await this.getAll()).set(otroP.id, otroP);
        await this.dump();

        return otroP;
    }

    async getById(id: number): Promise<ICarrito>
    {
        return (await this.getAll()).get(id);
    }

    async deleteById(id: number): Promise<boolean>
    {
        let rv: boolean = (await this.getAll()).delete(id);
        if (rv)
            this.dump();

        return rv;
    }

    async update(carrito: Partial<ICarrito>): Promise<ICarrito>
    {
        let c: ICarrito = await this.getById(carrito.id);

        if (c)
        {
            //Si no son el mismo, lo copio
            if (c !== carrito)
            {
                c.productos = [...carrito.productos];
                c.timestamp = carrito.timestamp;
            }

            await this.dump();

            return c;
        }

        return undefined;
    }
}