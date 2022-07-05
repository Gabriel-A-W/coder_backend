export interface IProducto
{
    id: number;
    timestamp: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;

    copy(otro: Partial<IProducto>);

}