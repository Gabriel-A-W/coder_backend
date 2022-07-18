import mongoose, { Model } from "mongoose";
import { IMensaje } from "../entidades/IMensaje";
import { CrearMensajesMongoModel } from "./modelos/MensajesMongoModel";

export class ChatMongoDBContext
{
    private readonly _mensajesModel: Model<IMensaje>;
    private readonly _conn: mongoose.Connection;

    constructor(connStr: string)
    {
        this._conn = mongoose.createConnection(connStr);
        this._mensajesModel = CrearMensajesMongoModel(this._conn);
    }


    get Mensajes() : Model<IMensaje>
    {
        return this._mensajesModel;
    }

}