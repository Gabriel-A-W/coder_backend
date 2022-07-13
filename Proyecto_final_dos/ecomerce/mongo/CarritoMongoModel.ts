import * as mongoose from 'mongoose';
import { ICarrito } from '../entidades/ICarrito';
import { CarritoMongoSchema } from './schemas/CarritoMongoSchema';

export const CarritoMongoModel = (con : mongoose.Connection)=>con.model<ICarrito>('Carrito', CarritoMongoSchema);
