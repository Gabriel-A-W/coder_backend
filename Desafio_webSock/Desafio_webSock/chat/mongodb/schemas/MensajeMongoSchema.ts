import * as mongodb from 'mongoose';
import { IMensaje } from '../../entidades/IMensaje';
import { AutorMongoSchema } from './AutorMongoSchema';

export const MensajeMongoSchema = new mongodb.Schema<IMensaje>({
    id: {type: Number, index: true},
    fecha: Date,
    autor: AutorMongoSchema,
    texto: String,
});