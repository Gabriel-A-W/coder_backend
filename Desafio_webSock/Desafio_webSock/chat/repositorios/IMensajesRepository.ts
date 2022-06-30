import { IMensaje } from "../entidades/IMensaje";

export interface IMensajesRepository
{

    getAll(): Promise<IMensaje[]>;
    add(m: IMensaje): Promise<IMensaje>;
}