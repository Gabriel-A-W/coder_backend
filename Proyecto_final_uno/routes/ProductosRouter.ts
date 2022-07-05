import * as express from 'express';
import { IProducto } from '../ecomerce/entidades/IProducto';
import { IProductosRepository } from '../ecomerce/repositorios/IProductosRepository';


export const ProductosRouterBuilder = (productosRepo: IProductosRepository) : express.Router  =>
{
    const ProductosRouter = express.Router();


    ProductosRouter.use(express.json());
    ProductosRouter.use(express.urlencoded({ extended: true }));

    ProductosRouter.get("/", async (req, res) => {
        const data = await productosRepo.getAll();
        res.json(data);
    });

    ProductosRouter.get("/:id", async (req, res) => {
        const data = await productosRepo.getById(parseInt(req.params.id));
        res.json(data);
    });

    ProductosRouter.post("/", async (req, res) => {
        const o: IProducto = Object.assign({}, req.body);
        res.json(await productosRepo.add(o));
    });

    ProductosRouter.put("/:id", async (req, res) => {
        const data: IProducto = await productosRepo.getById(parseInt(req.params.id));
        if (data) {
            const nuevo: Partial<IProducto> = Object.assign({}, req.body);
            nuevo.id = data.id;

            productosRepo.update(nuevo);

            res.status(200);
            res.send();
        }
    });

    ProductosRouter.delete("/:id", async (req, res) => {
        if (await productosRepo.deleteById(parseInt(req.params.id))) {
            res.status(200);
            res.send();
        }
        else {
            res.status(404);
            res.send();
        }
    });

    return ProductosRouter;
}



 