import * as mongoose from 'mongoose'; 
import { IUser } from '../../entidades/IUser';
import { UserMongoSchema } from '../schemas/UserMongoSchema';
 
export const CrearUserMongoModel = (con: mongoose.Connection) => con.model<IUser>('User', UserMongoSchema);
