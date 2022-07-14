import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
 

//Eventos Cliente -> Servidor
const EVT_CLI_CONN = "connect";
const EVT_CLI_RQ_ADD = "add";

//Eventos Server -> Cliente
const EVT_SVR_DO_PUSH = "push";
const EVT_SVR_DO_INIT = "init";
 

class ChatNormalizr {

    static _autorSchema = new normalizr.schema.Entity("autores", {}, { idAttribute: "email" });
    static _mensajeSchema = new normalizr.schema.Entity("mensajes", {
        autor: ChatNormalizr._autorSchema
    });

    static _msjArraySchema = new normalizr.schema.Entity("chat", { mensajes: [ChatNormalizr._mensajeSchema] })


    constructor() {
        throw new Error("ChatNormalizr es static")
    }

    static desnormalizar(msjs) {
      

        return normalizr.denormalize(msjs.result, ChatNormalizr._msjArraySchema, msjs.entities);
    }
}



async function main()
{
    const response = await fetch("hbs-templates/chatmsgs.hbs");
    const templateText = await response.text();
    const template = Handlebars.compile(templateText);

    const socketClient = io({ path: "/chat" });
    let chat = {mensajes:[]};

    const refrescar = (p)=>
    {
        document.getElementById("chatContainer").innerHTML = template({ values: p.mensajes });
    }

    // client-side
    socketClient.on(EVT_CLI_CONN, () => {
        console.log(socketClient.id); // x8WIv7-mJelg7on_ALbx
    });

    socketClient.on(EVT_SVR_DO_INIT, (data) => {
        
        chat = ChatNormalizr.desnormalizar(data);
        refrescar(chat);
    });

    socketClient.on(EVT_SVR_DO_PUSH, (data) => {
        chat.mensajes.push(data);
        refrescar(chat);
    });

    document.getElementById("btnMsgEnv").addEventListener("click", () => {
        const p = {
            autor: {
                email: document.getElementById("userEmail").value,
                nombre: document.getElementById("userNombre").value,
                apellido:  document.getElementById("userApellido").value,
                edad:      document.getElementById("userEdad"    ).value,
                alias:     document.getElementById("userAlias"   ).value,
                avatar:    document.getElementById("userAvatar"  ).value
            },
            texto: document.getElementById("msgBox").value
        };

        socketClient.emit(EVT_CLI_RQ_ADD, p);
    });
}


main(); 