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
const RAMProductosRepository_1 = require("../ecommerce/repositorios/impl/RAMProductosRepository");
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
router.use(express.static('public'));
router.use(express.urlencoded({ extended: true }));
router.get("/", (req, res) => {
    res.render("index");
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield contenedor.add(req.body);
    res.render("index");
}));
router.get("/productos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("catalogo", { values: yield contenedor.getAll() });
}));
exports.default = router;
//# sourceMappingURL=Vistas.js.map