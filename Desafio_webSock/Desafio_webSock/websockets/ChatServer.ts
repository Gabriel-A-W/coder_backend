import * as http from 'node:http';
import { Server as SocketIOServer, ServerOptions, Socket } from 'socket.io'
import { IMensaje } from '../chat/entidades/IMensaje';
import { IMensajesRepository } from '../chat/repositorios/IMensajesRepository';

const EVT_CLI_CONN : string = "connection";
const EVT_CLI_RQ_ADD: string = "add";

const EVT_SVR_DO_INIT: string = "init";
const EVT_SVR_DO_PUSH: string = "push";

export class ChatServer
{
    private _sockServer: SocketIOServer;
    private _repo: IMensajesRepository;

    constructor(httpServer: http.Server, repo: IMensajesRepository, props: Partial<ServerOptions>)
    {
        this._sockServer = new SocketIOServer(httpServer, props);
        this._repo = repo;
        this._sockServer.on(EVT_CLI_CONN, this.onConnectHandler.bind(this));
    }
     
    private async onConnectHandler(cliente: Socket): Promise<void>{
        console.log("CLiente conectado");
        cliente.on(EVT_CLI_RQ_ADD, async (obj: IMensaje) => {
            this.onClientRequestAddHandler(cliente, obj);
        });

        cliente.emit(EVT_SVR_DO_INIT, await this._repo.getAll());
    }

    private async onClientRequestAddHandler(cliente: Socket, obj: IMensaje) : Promise<void> {

        if (!obj.email)
        {
            return;
        }
        obj.fecha = new Date();
        const pn: IMensaje = await this._repo.add(obj);
        this._sockServer.emit(EVT_SVR_DO_PUSH, pn)
    }

}

