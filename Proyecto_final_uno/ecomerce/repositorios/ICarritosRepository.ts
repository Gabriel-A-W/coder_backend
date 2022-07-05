import { ICarrito } from "../entidades/ICarrito";

export interface ICarritosRepository
{
    add(carrito : Partial<ICarrito>) : Promise<ICarrito>
    getById(id: number): Promise<ICarrito>;
    deleteById(id: number): Promise<boolean>;
    update(carrito: Partial<ICarrito>): Promise<ICarrito>;
}