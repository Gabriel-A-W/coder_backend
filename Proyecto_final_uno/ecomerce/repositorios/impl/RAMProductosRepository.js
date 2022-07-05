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
exports.RAMProductosRepository = void 0;
const Producto_1 = require("../../entidades/Producto");
class RAMProductosRepository {
    constructor(prods = []) {
        this._data = [...prods];
    }
    getNextId() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAll();
            if (data.length === 0) {
                return 1;
            }
            return Math.max(...data.map((e) => e.id)) + 1;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._data;
        });
    }
    add(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const otroP = Producto_1.Producto.Copy(p);
            otroP.id = yield this.getNextId();
            this._data.push(otroP);
            return otroP;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getAll()).find((e) => e.id === id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield this.getAll());
            const idx = (yield this.getAll()).findIndex((e) => e.id === id);
            if (idx < 0) {
                return false;
            }
            data.splice(idx, 1);
            return true;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this._data = [];
        });
    }
}
exports.RAMProductosRepository = RAMProductosRepository;
//# sourceMappingURL=RAMProductosRepository.js.map