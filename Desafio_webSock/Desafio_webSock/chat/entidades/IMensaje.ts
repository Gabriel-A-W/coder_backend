import { IAutor } from "./IAutor";

export interface IMensaje
{
    id: number;
    fecha: Date;
    autor: IAutor;    
    texto: string;
}