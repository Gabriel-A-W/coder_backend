
import { IRecord } from "../entidades/IRecord";

 

export interface IRepository<TRow extends IRecord>
{
    getAll(): Promise<TRow[]>;
    add(o: Partial<TRow>): Promise<TRow>;
    getById(id : number): Promise<TRow>;
    deleteById(id: number): Promise<boolean>;
    update(o: Partial<TRow>): Promise<TRow>;
    deleteAll(): Promise<void>;
}
