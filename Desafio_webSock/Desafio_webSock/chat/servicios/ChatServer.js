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
class ChatServer {
    constructor(httpServer, props) {
        this._sockServer = new socket_io_1.Server(httpServer, props);
        this._sockServer.on("connection", this.onConnectHandler.bind(this));
    }
    onConnectHandler(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.ChatServer = ChatServer;
//# sourceMappingURL=ChatServer.js.map