import { Knex } from "knex";

export class KnexDbContext
{
    protected readonly _knex: Knex;
    private readonly _setupers = {};
    private _seteada: boolean = false;

    constructor(knxConn: Knex)
    {
        this._knex = knxConn;
    }

    public async setup(): Promise<void>
    {
        for (let tName of Object.keys(this._setupers))
        {
            if (!(await this._knex.schema.hasTable(tName)))
            {
                await this._setupers[tName](tName);
            }
        }

        this._seteada = true;
    }

    protected getTabla<TRecord>(n : string): Knex.QueryBuilder<TRecord, any[]>
    {
        if (!this._seteada)
            throw new Error("setup() no invocado en esta instancia");

        return this._knex<TRecord>(n);
    }
    

    protected registrar(tName: string, setup: Function): void
    {
        this._setupers[tName] = setup.bind(this);
    }
    

}