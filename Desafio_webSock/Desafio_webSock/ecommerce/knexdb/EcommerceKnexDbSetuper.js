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
exports.EcommerceKnexDbContext = void 0;
const KnexDbContext_1 = require("../../KnexDbContext");
class EcommerceKnexDbContext extends KnexDbContext_1.KnexDbContext {
    constructor(knxConn) {
        super(knxConn);
        this.registrar(EcommerceKnexDbContext.PRODUCTOS, (tName) => __awaiter(this, void 0, void 0, function* () {
            yield this._knex.schema.createTable(tName, (table) => {
                table.increments("id");
                table.string("title");
                table.float("price");
                table.string("thumbnail");
            });
        }));
    }
    get Productos() {
        return this.getTabla(EcommerceKnexDbContext.PRODUCTOS);
    }
}
exports.EcommerceKnexDbContext = EcommerceKnexDbContext;
EcommerceKnexDbContext.PRODUCTOS = "Mensajes";
//# sourceMappingURL=EcommerceKnexDbSetuper.js.map