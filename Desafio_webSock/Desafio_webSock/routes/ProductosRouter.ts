import express = require('express');
import { IProducto } from '../ecomerce/entidades/IProducto';
import { RAMProductosRepository } from '../ecomerce/repositorios/impl/RAMProductosRepository';
import { IProductosRepository } from '../ecomerce/repositorios/IProductosRepository';
const router = express.Router();

const contenedor: IProductosRepository = new RAMProductosRepository([
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    },
    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    }
]);


const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    const data = await contenedor.getAll();
    res.json(data); 
});

router.get("/:id", async(req, res) => {
    const data = await contenedor.getById(parseInt(req.params.id));
    res.json(data);
});

router.post("/", async (req, res) => {
    const o : IProducto = Object.assign({}, req.body);
    res.json(await contenedor.add(o));
});

router.put("/:id", async (req, res) => {
    const data : IProducto = await contenedor.getById(parseInt(req.params.id));
    if (data)
    {
        const id = data.id;
        Object.assign(data, req.body);
        data.id = id;
        res.status(200);
        res.send();
    }
});

router.delete("/:id", async (req, res) => {
    if (await contenedor.deleteById(parseInt(req.params.id)))
    {
        res.status(200);
        res.send();
    }
    else
    {
        res.status(404);
        res.send();
    }
});

export default router;