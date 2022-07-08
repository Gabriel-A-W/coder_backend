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
exports.ChatServer = void 0;
const socket_io_1 = require("socket.io");
const EVT_CLI_CONN = "connection";
const EVT_CLI_RQ_ADD = "add";
const EVT_SVR_DO_INIT = "init";
const EVT_SVR_DO_PUSH = "push";
class ChatServer {
    constructor(httpServer, repo, props) {
        this._sockServer = new socket_io_1.Server(httpServer, props);
        this._repo = repo;
        this._sockServer.on(EVT_CLI_CONN, this.onConnectHandler.bind(this));
    }
    onConnectHandler(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CLiente conectado");
            cliente.on(EVT_CLI_RQ_ADD, (obj) => __awaiter(this, void 0, void 0, function* () {
                this.onClientRequestAddHandler(cliente, obj);
            }));
            cliente.emit(EVT_SVR_DO_INIT, yield this._repo.getAll());
        });
    }
    onClientRequestAddHandler(cliente, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!obj.email) {
                return;
            }
            obj.fecha = new Date();
            const pn = yield this._repo.add(obj);
            this._sockServer.emit(EVT_SVR_DO_PUSH, pn);
        });
    }
}
exports.ChatServer = ChatServer;
//# sourceMappingURL=ChatServer.js.map