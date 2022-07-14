import { Model } from "mongoose";
import { IMensaje } from "../../entidades/IMensaje";
import { ChatMongoDBContext } from "../../mongodb/ChatMongoDBContext";
 
import { IMensajesRepository } from "../IMensajesRepository";

export class MongoMensajesRepository implements IMensajesRepository {

    
    protected readonly _dbContext: ChatMongoDBContext;

    constructor(dbContext: ChatMongoDBContext)
    {
        this._dbContext = dbContext; 
    }

  
    async getNextId() : Promise<number>
    {
        let rv : number = 0;
        const data = await this._dbContext.Mensajes.find({}, {id:1, _id:0}).sort({id:"descending"}).limit(1);
        if(data.length > 0)
        {
            rv = data[0].id;
        }
        return rv+1;
    }   

    async getAll(): Promise<IMensaje[]>
    {
        return (await this._dbContext.Mensajes.find()).map((o) => o.toObject());
    }

    async add(o: Partial<IMensaje>): Promise<IMensaje>
    {
        let otroP: Partial<IMensaje> = Object.assign({}, o);
        otroP.id = await this.getNextId();
        return (await this._dbContext.Mensajes.create(otroP)).toObject(); 
    }

    
}