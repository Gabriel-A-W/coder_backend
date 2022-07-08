import { IMensaje } from "../entidades/IMensaje";

export interface IMensajesRepository
{
    getAll(): Promise<IMensaje[]>;
    add(m: Partial<IMensaje>): Promise<IMensaje>;
}