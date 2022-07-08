import { Knex } from "knex";
import { KnexDbContext } from "../../KnexDbContext";
import { IMensaje } from "../entidades/IMensaje";

export class ChatKnexDbContext extends KnexDbContext
{
    private static readonly MENSAJES = "Mensajes";

    constructor(knxConn: Knex )
    {
        super(knxConn);

        this.registrar(ChatKnexDbContext.MENSAJES, async (tName) => {
            await this._knex.schema.createTable(tName, (table) => {
                table.increments("id");
                table.dateTime("fecha");
                table.string("email");
                table.string("texto");
            });
        });
    }



    public get Mensajes(): Knex.QueryBuilder<IMensaje>
    {
        return this.getTabla<IMensaje>(ChatKnexDbContext.MENSAJES);
    }

}