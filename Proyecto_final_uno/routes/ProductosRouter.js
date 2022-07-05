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
exports.ProductosRouterBuilder = void 0;
const express = require("express");
const ProductosRouterBuilder = (productosRepo) => {
    const ProductosRouter = express.Router();
    ProductosRouter.use(express.json());
    ProductosRouter.use(express.urlencoded({ extended: true }));
    ProductosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield productosRepo.getAll();
        res.json(data);
    }));
    ProductosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield productosRepo.getById(parseInt(req.params.id));
        res.json(data);
    }));
    ProductosRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const o = Object.assign({}, req.body);
        res.json(yield productosRepo.add(o));
    }));
    ProductosRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield productosRepo.getById(parseInt(req.params.id));
        if (data) {
            const nuevo = Object.assign({}, req.body);
            nuevo.id = data.id;
            productosRepo.update(nuevo);
            res.status(200);
            res.send();
        }
    }));
    ProductosRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield productosRepo.deleteById(parseInt(req.params.id))) {
            res.status(200);
            res.send();
        }
        else {
            res.status(404);
            res.send();
        }
    }));
    return ProductosRouter;
};
exports.ProductosRouterBuilder = ProductosRouterBuilder;
//# sourceMappingURL=ProductosRouter.js.map