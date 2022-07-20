import * as mongodb from 'mongoose'; 
import { IUser } from '../../entidades/IUser';

export const UserMongoSchema = new mongodb.Schema<IUser>({
    email: { type: String, required: true },
    username: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});