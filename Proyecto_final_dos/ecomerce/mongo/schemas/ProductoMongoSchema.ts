import * as mongodb from 'mongoose';
import { IProducto } from '../../entidades/IProducto';

export  const ProductoMongoSchema =  new  mongodb.Schema<IProducto>({
    id: {type: Number, index: true},
    timestamp: Number,
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number,
  });