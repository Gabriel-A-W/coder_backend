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
exports.KnexMensajesRepository = void 0;
const Mensaje_1 = require("../../entidades/Mensaje");
class KnexMensajesRepository {
    constructor(dbContext) {
        this._dbContext = dbContext;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._dbContext.Mensajes.select();
        });
    }
    add(m) {
        return __awaiter(this, void 0, void 0, function* () {
            const nm = Object.assign({}, m);
            nm.id = undefined;
            console.log(nm);
            const ids = yield this._dbContext.Mensajes.insert([nm]);
            if (ids.length === 0)
                return undefined;
            const rv = Mensaje_1.Mensaje.Copy(nm);
            rv.id = ids[0];
            return rv;
        });
    }
}
exports.KnexMensajesRepository = KnexMensajesRepository;
//# sourceMappingURL=KnexMensajesRepository.js.map