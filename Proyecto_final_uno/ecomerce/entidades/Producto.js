"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor() {
    }
    copy(otro) {
        this.id = otro.id;
        this.timestamp = otro.timestamp;
        this.nombre = otro.nombre;
        this.descripcion = otro.descripcion;
        this.codigo = otro.codigo;
        this.foto = otro.foto;
        this.precio = otro.precio;
        this.stock = otro.stock;
    }
    static Copy(otro) {
        const p = new Producto();
        p.id = otro.id;
        p.timestamp = otro.timestamp;
        p.nombre = otro.nombre;
        p.descripcion = otro.descripcion;
        p.codigo = otro.codigo;
        p.foto = otro.foto;
        p.precio = otro.precio;
        p.stock = otro.stock;
        return p;
    }
}
exports.Producto = Producto;
//# sourceMappingURL=Producto.js.map