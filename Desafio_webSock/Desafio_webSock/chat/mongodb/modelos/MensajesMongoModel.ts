import * as mongoose from 'mongoose';
import { IMensaje } from '../../entidades/IMensaje';
import { MensajeMongoSchema } from '../schemas/MensajeMongoSchema';
 

export const CrearMensajesMongoModel = (con: mongoose.Connection) => con.model<IMensaje>('Mensaje', MensajeMongoSchema);
