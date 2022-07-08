import { IMensaje } from "./IMensaje";

export class Mensaje implements IMensaje
{
    id: number;
    fecha: Date;
    email: string;
    texto: string;


    static Copy(m: Partial<IMensaje>): Mensaje
    {
        const nm = new Mensaje();

        nm.id    = m.id    ;
        nm.fecha = m.fecha ;
        nm.email = m.email ;
        nm.texto = m.texto;

        return nm;
    }

}