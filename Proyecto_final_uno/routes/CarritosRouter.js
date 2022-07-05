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
exports.CarritosRouterBuilder = void 0;
const express = require("express");
const CarritosRouterBuilder = (carritosRepo, productosRepo) => {
    const CarritosRouter = express.Router();
    CarritosRouter.use(express.json());
    CarritosRouter.use(express.urlencoded({ extended: true }));
    CarritosRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const o = {};
        res.json(yield carritosRepo.add(o));
    }));
    CarritosRouter.get("/:id/productos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield carritosRepo.getById(parseInt(req.params.id));
        res.json(data.productos);
    }));
    CarritosRouter.post("/:id/productos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield carritosRepo.getById(parseInt(req.params.id));
        if (data) {
            const p = yield productosRepo.getById(req.body.id);
            if (p) {
                data.productos.push(p);
                yield carritosRepo.update(data);
                res.status(200).json(data.productos);
            }
            else {
                res.status(400);
                res.json({ errm: "Producto invalido" });
            }
        }
    }));
    CarritosRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield carritosRepo.deleteById(parseInt(req.params.id))) {
            res.status(200);
        }
        else {
            res.status(404);
        }
        res.send();
    }));
    CarritosRouter.delete("/:id/productos/:id_prod", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const carro = yield carritosRepo.getById(parseInt(req.params.id));
        if (carro) {
            const prodId = parseInt(req.params.id_prod);
            const pIndex = yield carro.productos.findIndex((p) => p.id === prodId);
            if (pIndex >= 0) {
                carro.productos.splice(pIndex, 1);
                yield carritosRepo.update(carro);
                res.status(200).json(carro.productos);
            }
            else {
                res.status(400);
                res.json({ errm: "Producto invalido" });
            }
        }
    }));
    return CarritosRouter;
};
exports.CarritosRouterBuilder = CarritosRouterBuilder;
//export default CarritosRouterBuilder;
//# sourceMappingURL=CarritosRouter.js.map