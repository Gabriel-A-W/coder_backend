import { Router } from "express"
import express = require("express")
 


export const crearProcessInfoRouter = () =>
{
    const router : Router = express.Router()

    router.get("/", (req, res) => {
        res.send({
            argumentos: process.argv,
            plataforma: process.platform,
            nodeVersion: process.version,
            memoriaTotalReservada: process.resourceUsage().maxRSS,
            pathDeEjecucion: process.execPath,
            processId: process.pid,
            carpetaDelProyecto: process.cwd(),
        });
    });


    return router;
}