import * as mongodb from 'mongoose';
import { ICarrito } from '../../entidades/ICarrito'; 
import { ProductoMongoSchema } from './ProductoMongoSchema';

export  const CarritoMongoSchema =  new  mongodb.Schema<ICarrito>({
    id: {type: Number, index: true}, 
    timestamp: Number, 
    productos: [ProductoMongoSchema],
  });