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
exports.KnexDbContext = void 0;
class KnexDbContext {
    constructor(knxConn) {
        this._setupers = {};
        this._seteada = false;
        this._knex = knxConn;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let tName of Object.keys(this._setupers)) {
                if (!(yield this._knex.schema.hasTable(tName))) {
                    yield this._setupers[tName](tName);
                }
            }
            this._seteada = true;
        });
    }
    getTabla(n) {
        if (!this._seteada)
            throw new Error("setup() no invocado en esta instancia");
        return this._knex(n);
    }
    registrar(tName, setup) {
        this._setupers[tName] = setup.bind(this);
    }
}
exports.KnexDbContext = KnexDbContext;
//# sourceMappingURL=KnexDbContext.js.map