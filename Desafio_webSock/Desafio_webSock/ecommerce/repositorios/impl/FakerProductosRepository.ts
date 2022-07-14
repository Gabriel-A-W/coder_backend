import { IProducto } from "../../entidades/IProducto";
import { IProductosRepository } from "../IProductosRepository";
import { faker } from '@faker-js/faker';

export class FakerProductosRepository implements IProductosRepository
{

    private readonly _data : IProducto[] = [];

    constructor(cant: number)
    {

        for (let i = 0; i < cant; i++) {
            this._data.push({
                
                id: i+ 1,
                title: faker.commerce.productName(),
                price: Math.round(((Math.random() * (999 - 0.1) + 0.1) + Number.EPSILON) * 100) / 100,
                thumbnail: faker.image.abstract(640, 480, true)
            });
        }


    }

    getAll(): Promise<IProducto[]> {
        return Promise.resolve(this._data);
    }
    add(p: Partial<IProducto>): Promise<IProducto> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<IProducto> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}