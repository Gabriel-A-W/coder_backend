"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor() {
    }
    static Copy(otro) {
        const p = new Producto();
        p.id = otro.id;
        p.title = otro.title;
        p.price = otro.price;
        p.thumbnail = otro.thumbnail;
        return p;
    }
}
exports.Producto = Producto;
//# sourceMappingURL=Producto.js.map