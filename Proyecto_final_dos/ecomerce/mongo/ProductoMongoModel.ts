import * as mongoose from 'mongoose';
import { IProducto } from '../entidades/IProducto';
import { ProductoMongoSchema } from './schemas/ProductoMongoSchema';

export const ProductoMongoModel = (con : mongoose.Connection)=>con.model<IProducto>('Producto', ProductoMongoSchema);
