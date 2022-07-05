"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repositorios = void 0;
class Repositorios {
    constructor() {
        throw new Error("ServiceLocator es static");
    }
    static setCarritosRepo(r) {
        Repositorios._carritoRepo = r;
    }
    static setProductosRepo(r) {
        Repositorios._productoRepo = r;
    }
    static getCarritosRepo() {
        return Repositorios._carritoRepo;
    }
    static getProductosRepo() {
        return Repositorios._productoRepo;
    }
}
exports.Repositorios = Repositorios;
Repositorios._carritoRepo = null;
Repositorios._productoRepo = null;
//# sourceMappingURL=Repositorios.js.map