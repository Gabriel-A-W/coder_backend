"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mensaje = void 0;
class Mensaje {
    static Copy(m) {
        const nm = new Mensaje();
        nm.id = m.id;
        nm.fecha = m.fecha;
        nm.email = m.email;
        nm.texto = m.texto;
        return nm;
    }
}
exports.Mensaje = Mensaje;
//# sourceMappingURL=Mensaje.js.map