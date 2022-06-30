import { IMensaje } from "../../entidades/IMensaje";
import { IMensajesRepository } from "../IMensajesRepository";
import * as FSPromise from "node:fs/promises";
import * as FS from "node:fs";


const { O_CREAT } = FS.constants;

export class FileMensajesRepository implements IMensajesRepository
{
    private _fpath: string;
    private _esPrimeraVez: boolean = true;
    private _data: IMensaje[] = [];

    constructor(fpath:string)
    {
        this._fpath = fpath;
    }

    private async dump(): Promise<void>
    {
        await FSPromise.writeFile(this._fpath, JSON.stringify(this._data), "utf-8");
    }

    async getAll(): Promise<IMensaje[]>
    {
        if (this._esPrimeraVez) {
            try {
                const contenido = await FSPromise.readFile(this._fpath, { encoding: "utf-8", flag: O_CREAT });
                this._esPrimeraVez = false;

                if (contenido.length > 0) {
                    this._data = JSON.parse(contenido);
                }
            }
            catch (err) {
                throw err;
            }
        }

        return this._data;
    }

    async add(m: IMensaje): Promise<IMensaje> {
        (await this.getAll()).push(m);
        await this.dump();

        return m;
    }


}