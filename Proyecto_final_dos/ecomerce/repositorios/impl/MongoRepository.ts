import { Model } from "mongoose";
import { IRepository } from "../IRepository";
import {IRecord} from "../../entidades/IRecord";

export class MongoRepository<TRow extends IRecord> implements IRepository<TRow>
{
    protected readonly _modelo : Model<TRow>

    constructor(modelo : Model<TRow>)
    {
        this._modelo = modelo;
    }

  
    async getNextId() : Promise<number>
    {
        let rv : number = 0;
        const data = await this._modelo.find({}, {id:1, _id:0}).sort({id:"descending"}).limit(1);
        if(data.length > 0)
        {
            rv = data[0].id;
        }
        return rv+1;
    }   

    async getAll(): Promise<TRow[]>
    {
        return await this._modelo.find();
    }

    async add(p: Partial<TRow>): Promise<TRow>
    {
        let otroP: Partial<TRow> = Object.assign({}, p);
        otroP.id = await this.getNextId();
        return await this._modelo.create(otroP); 
    }

    async getById(pid: number): Promise<TRow>
    {
        return await this._modelo.findOne({id: pid});
    }

    async deleteById(pid: number): Promise<boolean>
    {
        const res = await this._modelo.deleteOne({id: pid});
        return res.deletedCount > 0;
    }

    async update(o: Partial<TRow>): Promise<TRow>
    {
        if(o.id === undefined)
        {
            return null;
        }

        
        const pCopia = Object.assign({}, o);
        delete pCopia.id;
    
        const p = await this._modelo.findOne({id: o.id});
        if(p)
        {
            Object.assign(p, pCopia); 
            p.save();    
        }
        
        return p;
    }

    async deleteAll(): Promise<void>
    {
        await this._modelo.deleteMany();
    }
}