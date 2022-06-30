import { Producto } from "./Producto";

export interface Carrito
{
    id: number;
    productos: Producto[];
}