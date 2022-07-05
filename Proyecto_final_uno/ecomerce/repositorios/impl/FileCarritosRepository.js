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
exports.FileCarritosRepository = void 0;
const FSPromise = require("node:fs/promises");
const FS = require("node:fs");
const Carrito_1 = require("../../entidades/Carrito");
const { O_CREAT } = FS.constants;
class FileCarritosRepository {
    constructor(fpath) {
        this._esPrimeraVez = true;
        this._data = new Map();
        this._fpath = fpath;
    }
    dump() {
        return __awaiter(this, void 0, void 0, function* () {
            yield FSPromise.writeFile(this._fpath, JSON.stringify(Array.from(this._data.entries())), "utf-8");
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._esPrimeraVez) {
                try {
                    const contenido = yield FSPromise.readFile(this._fpath, { encoding: "utf-8", flag: O_CREAT });
                    this._esPrimeraVez = false;
                    if (contenido.length > 0) {
                        this._data = new Map(JSON.parse(contenido));
                    }
                    else {
                        yield this.dump();
                    }
                }
                catch (err) {
                    throw err;
                }
            }
            return this._data;
        });
    }
    getNextId() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [...(yield this.getAll()).keys()];
            if (data.length === 0)
                return 1;
            return Math.max(...data) + 1;
        });
    }
    add(carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            let otroP = Object.assign(new Carrito_1.Carrito(yield this.getNextId()), carrito);
            (yield this.getAll()).set(otroP.id, otroP);
            yield this.dump();
            return otroP;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getAll()).get(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let rv = (yield this.getAll()).delete(id);
            if (rv)
                this.dump();
            return rv;
        });
    }
    update(carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            let c = yield this.getById(carrito.id);
            if (c) {
                //Si no son el mismo, lo copio
                if (c !== carrito) {
                    c.productos = [...carrito.productos];
                    c.timestamp = carrito.timestamp;
                }
                yield this.dump();
                return c;
            }
            return undefined;
        });
    }
}
exports.FileCarritosRepository = FileCarritosRepository;
//# sourceMappingURL=FileCarritosRepository.js.map