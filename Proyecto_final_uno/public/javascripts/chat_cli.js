import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";


//Eventos Cliente -> Servidor
const EVT_CLI_CONN = "connect";
const EVT_CLI_RQ_ADD = "add";

//Eventos Server -> Cliente
const EVT_SVR_DO_PUSH = "push";
const EVT_SVR_DO_INIT = "init";


async function main()
{
    const response = await fetch("hbs-templates/chatmsgs.hbs");
    const templateText = await response.text();
    const template = Handlebars.compile(templateText);

    const socketClient = io({ path: "/chat" });
    const productos = [];

    const refrescar = (p)=>
    {
        document.getElementById("chatContainer").innerHTML = template({ values: p });
    }

    // client-side
    socketClient.on(EVT_CLI_CONN, () => {
        console.log(socketClient.id); // x8WIv7-mJelg7on_ALbx
    });

    socketClient.on(EVT_SVR_DO_INIT, (data) => {
        productos.push(...data);
        refrescar(productos);
    });

    socketClient.on(EVT_SVR_DO_PUSH, (data) => {
        productos.push(data);
        refrescar(productos);
    });

    document.getElementById("btnMsgEnv").addEventListener("click", () => {
        const p = {
            email: document.getElementById("userEmail").value,
            texto: document.getElementById("msgBox").value
        };

        socketClient.emit(EVT_CLI_RQ_ADD, p);
    });
}


main(); 