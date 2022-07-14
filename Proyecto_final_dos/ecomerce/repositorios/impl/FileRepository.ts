import * as FSPromise from "node:fs/promises";
import * as FS from "node:fs"; 
import { IRepository } from "../IRepository";
import { IRecord } from "../../entidades/IRecord";

const { O_CREAT } = FS.constants;


export class FileRepository<TRow extends IRecord > implements IRepository<TRow>
{
    private _fpath: string;
    private _esPrimeraVez: boolean = true;
    private _data: Map<number, TRow> = new Map<number, TRow>();
  


    constructor(fpath: string)
    {
        this._fpath = fpath; 
    }

    async getAll(): Promise<TRow[]> {
        return Array.from(this._data.values());
    }
    
    async deleteAll(): Promise<void> 
    {
       this._data.clear();
       this.dump();
    }

    private async dump(): Promise<void>
    {
        await FSPromise.writeFile(this._fpath, JSON.stringify(Array.from(this._data.entries())), "utf-8");
    }

    private async _getAll(): Promise<Map<number, TRow>>
    {
        if (this._esPrimeraVez)
        {
            try
            {
                const contenido = await FSPromise.readFile(this._fpath, { encoding: "utf-8", flag: O_CREAT });
                this._esPrimeraVez = false;

                if (contenido.length > 0) {
                    this._data = new Map<number, TRow>(JSON.parse(contenido));
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
        const data = [...(await this._getAll()).keys()];
        if (data.length === 0)
            return 1;

        return Math.max(...data) + 1;
    }


    async add(o: Partial<TRow>): Promise<TRow>
    {
        let pcopia: TRow = Object.assign({}, o) as TRow;
        pcopia.id = await this.getNextId();

        (await this._getAll()).set(pcopia.id, pcopia);
        await this.dump();

        return pcopia;
    }

    async getById(id: number): Promise<TRow>
    {
        return (await this._getAll()).get(id);
    }

    async deleteById(id: number): Promise<boolean>
    {
        let rv: boolean = (await this._getAll()).delete(id);
        if (rv)
            this.dump();

        return rv;
    }

    async update(o: Partial<TRow>): Promise<TRow>
    {
        let c  = await this.getById(o.id);

        if (c)
        {
            //Si no son el mismo, lo copio
            if (c !== o)
            {
                Object.assign(c, o);
            }

            await this.dump();

            return c;
        }

        return undefined;
    }

     
    
}