import * as http from 'node:http';
import { Server as SocketIOServer, ServerOptions, Socket } from 'socket.io'

export class ChatServer
{
    private _sockServer: SocketIOServer;

    constructor(httpServer: http.Server, props: Partial<ServerOptions>)
    {
        this._sockServer = new SocketIOServer(httpServer, props);
        this._sockServer.on("connection", this.onConnectHandler.bind(this));
    }
     


    async onConnectHandler(cliente: Socket)
    {
      
    }

}

