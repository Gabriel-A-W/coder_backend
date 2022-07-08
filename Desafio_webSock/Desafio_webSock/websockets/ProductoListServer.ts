import * as http from 'node:http';
import { Server as SocketIOServer, ServerOptions, Socket } from 'socket.io'
import { IProducto } from '../ecommerce/entidades/IProducto';
import { IProductosRepository } from '../ecommerce/repositorios/IProductosRepository';

//Eventos Cliente -> Servidor
const EVT_CLI_CONN: string = "connection";
const EVT_CLI_RQ_ADD: string = "add";

//Eventos Server -> Cliente
const EVT_SVR_DO_PUSH: string = "push";
const EVT_SVR_DO_INIT: string = "init";

export class ProductoListServer {

    private _sockServer: SocketIOServer;
    private _repo: IProductosRepository;

    constructor(httpServer: http.Server, repo: IProductosRepository, props: Partial<ServerOptions>) {
        this._repo = repo;
        this._sockServer = new SocketIOServer(httpServer, props);
        this._sockServer.on(EVT_CLI_CONN, this.onConnectHandler.bind(this));
    }

    private async onConnectHandler(cliente: Socket) {
        console.log("CLiente conectado");
        cliente.on(EVT_CLI_RQ_ADD, async (obj: IProducto) => {
            this.onClientRequestAddHandler(cliente, obj);
        });

        cliente.emit(EVT_SVR_DO_INIT,  await this._repo.getAll());
    }


    private async onClientRequestAddHandler(cliente: Socket, obj: IProducto) {
        const pn: IProducto = await this._repo.add(obj);
        this._sockServer.emit(EVT_SVR_DO_PUSH, pn)
    }

}