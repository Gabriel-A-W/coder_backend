"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAMProductoDAO = void 0;
class RAMProductoDAO {
    constructor() {
        this._productos = [{ "id": 1, "nombre": "qwertyuiop", "descripcion": "prueba", "foto": "asddas", "precio": 443, "stock": 12 }, { "id": 2, "nombre": "hfdsdfshk", "descripcion": "dsfdf", "foto": "asddas", "precio": 443, "stock": 12 }];
        this._maxId = 0;
    }
    add(p) {
        let nuevo = Object.assign({
            id: 0,
            nombre: "",
            descripcion: "",
            precio: 0,
            stock: "",
            foto: ""
        }, p);
        this._maxId++;
        nuevo.id = this._maxId;
        this._productos.push(nuevo);
        return nuevo.id;
    }
    deleteById(id) {
        throw new Error("Method not implemented.");
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        return this._productos;
    }
    update(p) {
        throw new Error("Method not implemented.");
    }
}
exports.RAMProductoDAO = RAMProductoDAO;
//# sourceMappingURL=RAMProductoDAO.js.map