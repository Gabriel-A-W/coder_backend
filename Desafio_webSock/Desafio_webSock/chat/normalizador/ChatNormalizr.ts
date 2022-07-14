import { schema, normalize } from 'normalizr';
import { IMensaje } from '../entidades/IMensaje';

export class ChatNormalizr
{

    private static readonly _autorSchema = new schema.Entity("autores", {}, { idAttribute: "email" });
    private static readonly _mensajeSchema = new schema.Entity("mensajes", {
        autor: ChatNormalizr._autorSchema
    });

    private static readonly _msjArraySchema = new schema.Entity("chat", { mensajes: [ChatNormalizr._mensajeSchema] })


    constructor()
    {
        throw new Error("ChatNormalizr es static")   
    }

    static normalizar(msjs: IMensaje[]) : object
    {
        const todo = { id: "mensajes", mensajes: msjs };
        return normalize(todo, ChatNormalizr._msjArraySchema);
    }
}