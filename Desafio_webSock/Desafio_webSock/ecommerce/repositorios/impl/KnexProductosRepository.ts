import { Knex } from 'knex'
import { IProducto } from '../../entidades/IProducto';
import { Producto } from '../../entidades/Producto';
import { EcommerceKnexDbContext } from '../../knexdb/EcommerceKnexKnexDbContext';
import { IProductosRepository } from '../IProductosRepository';


export class KnexProductosRepository implements IProductosRepository
{
     
    private readonly _knex: EcommerceKnexDbContext;

    constructor(knxConn: EcommerceKnexDbContext)
    {
        this._knex = knxConn; 
    }


  
    
    getAll(): Promise<IProducto[]>
    {
        return this._knex.Productos.select();
    }


    async add(p: Partial<IProducto>): Promise<IProducto>
    {

        const pcopy: Partial<IProducto> = Object.assign({}, p); 
        pcopy.id = undefined;
        
        const ids: number[] = await this._knex.Productos.insert([p]);
        const rv: IProducto = Producto.Copy(p);
        rv.id = ids[0];

        return rv;
    }

    async getById(id: number): Promise<IProducto>
    {
        const p: IProducto[] = await this._knex.Productos.select().where("id", id);

        if (p.length === 0)
            return undefined;

        return p[0];
    }

    async deleteById(id: number): Promise<boolean>
    {
        const cant: number = await this._knex.Productos.delete().where("id", id);
        return cant > 0;
    }


    async deleteAll(): Promise<void>
    {
        await this._knex.Productos.delete();
    }
}