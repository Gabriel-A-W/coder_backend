import { Knex } from "knex";
import { IMensaje } from "../../entidades/IMensaje";
import { Mensaje } from "../../entidades/Mensaje";
import { ChatKnexDbContext } from "../../knexdb/ChatKnexDbContext";
import { IMensajesRepository } from "../IMensajesRepository";

export class KnexMensajesRepository implements IMensajesRepository
{
     
    private readonly _dbContext: ChatKnexDbContext;

    constructor(dbContext : ChatKnexDbContext) {
        this._dbContext = dbContext; 
    }

    async getAll(): Promise<IMensaje[]>
    {
        return await this._dbContext.Mensajes.select();
    }

    async add(m: Partial<IMensaje>): Promise<IMensaje> {

        const nm: Partial<IMensaje> = Object.assign({}, m);

        nm.id = undefined;

        console.log(nm);

        const ids: number[] = await this._dbContext.Mensajes.insert([nm]);

        if (ids.length === 0)
            return undefined;

        const rv: IMensaje = Mensaje.Copy(nm);
        rv.id = ids[0];

        return rv;
    }


}