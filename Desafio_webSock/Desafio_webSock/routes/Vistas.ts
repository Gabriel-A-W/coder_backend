import express = require('express');
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


router.use(express.static('public'));
router.use(express.urlencoded({ extended: true }));


router.get("/", (req, res) => {
    res.render("index");
});

router.post("/", async (req, res) => {
    await contenedor.add(req.body);
    res.render("index");
});

router.get("/productos", async (req, res) => {
    res.render("catalogo", { values: await contenedor.getAll() });
});

export default router;