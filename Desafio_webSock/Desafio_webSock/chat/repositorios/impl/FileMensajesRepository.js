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
exports.FileMensajesRepository = void 0;
const FSPromise = require("node:fs/promises");
const FS = require("node:fs");
const { O_CREAT } = FS.constants;
class FileMensajesRepository {
    constructor(fpath) {
        this._esPrimeraVez = true;
        this._data = [];
        this._fpath = fpath;
    }
    dump() {
        return __awaiter(this, void 0, void 0, function* () {
            yield FSPromise.writeFile(this._fpath, JSON.stringify(this._data), "utf-8");
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._esPrimeraVez) {
                try {
                    const contenido = yield FSPromise.readFile(this._fpath, { encoding: "utf-8", flag: O_CREAT });
                    this._esPrimeraVez = false;
                    if (contenido.length > 0) {
                        this._data = JSON.parse(contenido);
                    }
                }
                catch (err) {
                    throw err;
                }
            }
            return this._data;
        });
    }
    add(m) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield this.getAll()).push(m);
            yield this.dump();
            return m;
        });
    }
}
exports.FileMensajesRepository = FileMensajesRepository;
//# sourceMappingURL=FileMensajesRepository.js.map