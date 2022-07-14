import * as express from 'express';
import { ICarrito } from '../ecomerce/entidades/ICarrito';
import { IProducto } from '../ecomerce/entidades/IProducto';
import { IRepository } from '../ecomerce/repositorios/IRepository';
 



export const CarritosRouterBuilder = (carritosRepo: IRepository<ICarrito>, productosRepo: IRepository<IProducto>) : express.Router =>
{
 
    const CarritosRouter = express.Router(); 

    CarritosRouter.use(express.json());
    CarritosRouter.use(express.urlencoded({ extended: true }));

    CarritosRouter.post("/", async (req, res) => {
        const o: Partial<ICarrito> = {timestamp: Date.now()};
        res.json(await carritosRepo.add(o));
    });

    CarritosRouter.get("/:id/productos", async (req, res) => {
        const data = await carritosRepo.getById(parseInt(req.params.id));
        res.json(data.productos);
    });

    CarritosRouter.post("/:id/productos", async (req, res) => {
        const data: ICarrito = await carritosRepo.getById(parseInt(req.params.id));
        if (data) {
            const p: IProducto = await productosRepo.getById(req.body.id);
            if (p) {
                data.productos.push(p);
                await carritosRepo.update(data);
                res.status(200).json(data.productos);
            }
            else {
                res.status(400);
                res.json({ errm: "Producto invalido" })
            }
        }
    });

    CarritosRouter.delete("/:id", async (req, res) => {
        if (await carritosRepo.deleteById(parseInt(req.params.id))) {
            res.status(200);
        }
        else {
            res.status(404);
        }
        res.send();
    });

    CarritosRouter.delete("/:id/productos/:id_prod", async (req, res) => {
        const carro: ICarrito = await carritosRepo.getById(parseInt(req.params.id));
        if (carro) {
            const prodId: number = parseInt(req.params.id_prod);
            const pIndex: number = await carro.productos.findIndex((p) => p.id === prodId);

            if (pIndex >= 0) {
                carro.productos.splice(pIndex, 1);
                await carritosRepo.update(carro);
                res.status(200).json(carro.productos);
            }
            else {
                res.status(400);
                res.json({ errm: "Producto invalido" })
            }
        }
    });


    return CarritosRouter;
}



//export default CarritosRouterBuilder;