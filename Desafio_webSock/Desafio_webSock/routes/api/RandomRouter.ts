import { fork } from "child_process";
import { Router } from "express"
import express = require("express")




export const crearRandomRouter = (puerto) => {

    const router: Router = express.Router()
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    
    router.get("/", (req, res) => {
        fork("./RandomizerProcess.js", [req.query["cant"] as string ?? "100000000"]).on("message", (msj, sendHandle) => {
            res.json({ rta: msj, port: puerto });
        });
    });

    return router;
}