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
exports.KnexProductosRepository = void 0;
const Producto_1 = require("../../entidades/Producto");
class KnexProductosRepository {
    constructor(knxConn) {
        this._knex = knxConn;
    }
    getAll() {
        return this._knex.Productos.select();
    }
    add(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const pcopy = Object.assign({}, p);
            pcopy.id = undefined;
            const ids = yield this._knex.Productos.insert([p]);
            const rv = Producto_1.Producto.Copy(p);
            rv.id = ids[0];
            return rv;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield this._knex.Productos.select().where("id", id);
            if (p.length === 0)
                return undefined;
            return p[0];
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cant = yield this._knex.Productos.delete().where("id", id);
            return cant > 0;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._knex.Productos.delete();
        });
    }
}
exports.KnexProductosRepository = KnexProductosRepository;
//# sourceMappingURL=KnexProductosRepository.js.map