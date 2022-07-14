import * as mongodb from 'mongoose';
import { IAutor } from '../../entidades/IAutor';

export const AutorMongoSchema = new mongodb.Schema<IAutor>({
    email: {type: String, index: true},
    nombre: String,
    apellido: String,
    edad: Number,
    alias: String,
    avatar: String,
});