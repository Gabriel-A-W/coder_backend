import mongoose, { Model } from "mongoose";
import { IUser } from "../entidades/IUser";
import { CrearUserMongoModel } from "./modelos/UserMongoModel";
 

export class SessionMongoDBContext {
    private readonly _mensajesModel: Model<IUser>;
    private readonly _conn: mongoose.Connection;

    constructor(connStr: string) {
        this._conn = mongoose.createConnection(connStr);
        this._mensajesModel = CrearUserMongoModel(this._conn);
    }


    get Users(): Model<IUser> {
        return this._mensajesModel;
    }

}