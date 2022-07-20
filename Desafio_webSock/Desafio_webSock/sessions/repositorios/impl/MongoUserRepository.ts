 
import { IUser } from "../../entidades/IUser";
import { SessionMongoDBContext } from "../../mongodb/SessionMongoDbContext";
import { IUserRepository } from "../IUserRepository";
import mongoose = require("mongoose");

export class MongoUserRepository implements IUserRepository {


    protected readonly _dbContext: SessionMongoDBContext;

    constructor(dbContext: SessionMongoDBContext) {
        this._dbContext = dbContext;
    }

    async add(p: IUser): Promise<IUser> {

        try {

            await this._dbContext.Users.create(p);
        }
        catch (err) {
            if (err instanceof mongoose.Error.ValidationError)
            {
                return null;
            }

            throw err;
        }
    
        

        return p;
    }

    async get(username: string): Promise<IUser> {
        const u = await this._dbContext.Users.findOne({ username: username });
        
        if (u)
        {
            return u.toObject();
        }

        return null;
    }

 


}