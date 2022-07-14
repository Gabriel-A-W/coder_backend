import { IAutor } from "./IAutor";
import { IMensaje } from "./IMensaje";

export class Mensaje implements IMensaje
{
    autor: IAutor;
    id: number;
    fecha: Date; 
    texto: string;


    static Copy(m: Partial<IMensaje>): Mensaje
    {
        const nm = new Mensaje();

        nm.id    = m.id    ;
        nm.fecha = m.fecha ;
        nm.autor = m.autor;
        nm.texto = m.texto;

        return nm;
    }

}