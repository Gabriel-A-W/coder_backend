import * as express from 'express';
import * as handlebars from 'express-handlebars';
import knex, { Knex } from 'knex';
import * as http from 'node:http';
import  yargs  = require("yargs");
import { hideBin } from 'yargs/helpers';
import cluster from 'cluster';
import * as os from 'os';
import winston = require('winston');


import { ChatMongoDBContext } from './chat/mongodb/ChatMongoDBContext';
import { IMensajesRepository } from './chat/repositorios/IMensajesRepository';
import { MongoMensajesRepository } from './chat/repositorios/impl/MongoMensajesRepository';
import { EcommerceKnexDbContext } from './ecommerce/knexdb/EcommerceKnexKnexDbContext';
import { KnexProductosRepository } from './ecommerce/repositorios/impl/KnexProductosRepository';
import { IProductosRepository } from './ecommerce/repositorios/IProductosRepository';
import { crearAPIProductosRouter } from './routes/api/APIProductosRouter';
import { crearRandomRouter } from './routes/api/RandomRouter';
import { crearIndexRouter } from './routes/IndexRouter';
import { crearProcessInfoRouter } from './routes/ProcessInfoRouter';
import { crearUserRouter } from './routes/UsersRouter';
import { LocalAuthManager } from './sessions/AuthManager';
import { SessionMongoDBContext } from './sessions/mongodb/SessionMongoDbContext';
import { MongoUserRepository } from './sessions/repositorios/impl/MongoUserRepository';
import { sessionManager } from './sessions/SessionManager';
import { ChatServer } from './websockets/ChatServer';
import { ProductoListServer } from './websockets/ProductoListServer';

import dotenv = require('dotenv'); 

dotenv.config();
const CONFIGS_MONGO_URL: string = process.env.MONGO_URL;
 



const Main = async (args) =>
{
    const port = args["puerto"] ?? (process.env.PORT || 8080);

    const app = express();
    const httpServer = http.createServer(app);

    

    const ecommerceDbConfigs: Knex.Config = {
        client: 'sqlite3',  
        useNullAsDefault: true,
        connection: {
            filename: "productosdb.sqlite"
        }
    };

    const ecommerceDBConn = new EcommerceKnexDbContext(knex(ecommerceDbConfigs));
    const chatDBConn = new ChatMongoDBContext(CONFIGS_MONGO_URL);
   
    await ecommerceDBConn.setup();

    const prodRepo: IProductosRepository =  new KnexProductosRepository(ecommerceDBConn);
    const chatRepo: IMensajesRepository = new MongoMensajesRepository(chatDBConn);
    const authManager: LocalAuthManager = new LocalAuthManager(new MongoUserRepository(new SessionMongoDBContext(CONFIGS_MONGO_URL)));

    const prodServer = new ProductoListServer(httpServer, prodRepo, { path: "/productos" });
    const chatServer = new ChatServer(httpServer, chatRepo, { path: "/chat" });

    const logger = winston.createLogger({
        level: argv["loglevel"],
        format: winston.format.combine( 
            winston.format.timestamp(),
            winston.format.prettyPrint()
        ),
        transports: [
            new winston.transports.Console({ level: "info"}),
            new winston.transports.File({ level: "warn", filename: "warn.log"}),
            new winston.transports.File({ level: "error", filename:"err.log"})
        ]
    });

     
   
    app.engine("hbs", handlebars.engine());
    app.set("view engine", "hbs");
    app.set('views', `./views/hbs`);

    
    app.use(sessionManager(CONFIGS_MONGO_URL));
    app.use(authManager.session());
    app.use(express.static('public'))
    app.use((req, res, next) => {
        logger.info("Request", { method: req.method, originalUrl: req.originalUrl });
        next();
    });

    app.get("/error", (req, res) => {
        throw new Error("hola");
    });

    app.use("/user", crearUserRouter(authManager));
    app.use("/api/productos", crearAPIProductosRouter(prodRepo, authManager));
    app.use("/api/random", crearRandomRouter(port));
    app.use("/info", crearProcessInfoRouter());
    
    app.use("/", crearIndexRouter(prodRepo, authManager));

    app.use((req, res, next) => {
        logger.warn("Invalid Request", { method: req.method, originalUrl: req.originalUrl });
        res.status(404).send();
    });

    app.use((err, req, res, next) => {
        logger.error("Error no manejado", { method: req.method, originalUrl: req.originalUrl, error:err } );
        next();
    });
    

    httpServer.listen(port, () => {
        console.log(`PID: ${process.pid} Puerto: ${port}`);
    });

}




const argv = yargs(hideBin(process.argv)).option("puerto", {
    alias: "p",
    type: "number",
    description: "El puerto de escucha del servidor"
}).option("modo", {
    alias: "m",
    type: "string",
    choices: ["FORK", "CLUSTER"],
    default: "FORK"
}).option("loglevel", {
    alias: "l",
    type: "string",
    choices: ["error",
        "warn",
        "info",
        "http",
        "verbose",
        "debug",
        "silly"],
    default: "info"
}).parse();


if (argv["modo"] === "CLUSTER" && cluster.isPrimary) {

    for (var i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
}
else
{
    Main(argv);
}
