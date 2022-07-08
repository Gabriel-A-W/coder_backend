import { Knex } from "knex";
import { KnexDbContext } from "../../KnexDbContext";
import { IProducto } from "../entidades/IProducto";
 

export class EcommerceKnexDbContext extends KnexDbContext {
    private static readonly PRODUCTOS = "Mensajes";

    constructor(knxConn: Knex) {
        super(knxConn);

        this.registrar(EcommerceKnexDbContext.PRODUCTOS, async (tName) => {
            await this._knex.schema.createTable(tName, (table) => {
                table.increments("id");
                table.string("title");
                table.float("price");
                table.string("thumbnail");
            });
        });
    }


    public get Productos(): Knex.QueryBuilder<IProducto> {
        return this.getTabla<IProducto>(EcommerceKnexDbContext.PRODUCTOS);
    }
}


 