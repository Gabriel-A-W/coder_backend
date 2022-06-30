"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const RAMProductosRepository_1 = require("../ecomerce/repositorios/impl/RAMProductosRepository");
const router = express.Router();
const contenedor = new RAMProductosRepository_1.RAMProductosRepository([
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
        "title": "Globo Terr�queo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    }
]);
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield contenedor.getAll();
    res.json(data);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield contenedor.getById(parseInt(req.params.id));
    res.json(data);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const o = Object.assign({}, req.body);
    res.json(yield contenedor.add(o));
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield contenedor.getById(parseInt(req.params.id));
    if (data) {
        const id = data.id;
        Object.assign(data, req.body);
        data.id = id;
        res.status(200);
        res.send();
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield contenedor.deleteById(parseInt(req.params.id))) {
        res.status(200);
        res.send();
    }
    else {
        res.status(404);
        res.send();
    }
}));
exports.default = router;
//# sourceMappingURL=ProductosRouter.js.map