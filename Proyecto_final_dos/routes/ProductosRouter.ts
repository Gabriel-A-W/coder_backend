import * as express from 'express';
import { IProducto } from '../ecomerce/entidades/IProducto';
import { IRepository } from '../ecomerce/repositorios/IRepository';


export const ProductosRouterBuilder = (productosRepo: IRepository<IProducto>) : express.Router  =>
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
        const nuevo: Partial<IProducto> = Object.assign({}, req.body);
        nuevo.id = parseInt(req.params.id);

        productosRepo.update(nuevo);

        res.status(200);
        res.send(); 
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



 