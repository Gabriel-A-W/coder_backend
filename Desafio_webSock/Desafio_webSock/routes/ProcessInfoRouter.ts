import { Router } from "express"
import express = require("express")
import compression = require("compression");


export const crearProcessInfoRouter = () =>
{
    const router : Router = express.Router()
    router.use(compression())
    router.get("/", (req, res) => {
        const obj = {
            argumentos: process.argv,
            plataforma: process.platform,
            nodeVersion: process.version,
            memoriaTotalReservada: process.resourceUsage().maxRSS,
            pathDeEjecucion: process.execPath,
            processId: process.pid,
            carpetaDelProyecto: process.cwd(),
        };

        if (req.query.consologear)
        {
            console.log(obj);
        }

        res.send(obj);
    });

    return router;
}

