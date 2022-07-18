"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
class UserData {
    _nombre = null;
    _cantVisitas = 0;
    constructor(n) {
        this._nombre = n;
    }
    get nombre() {
        return this._nombre;
    }
    get cantVisitas() {
        return this._cantVisitas;
    }
    contarVisita() {
        this._cantVisitas++;
        return this.cantVisitas;
    }
}
exports.UserData = UserData;
//# sourceMappingURL=UserData.js.map