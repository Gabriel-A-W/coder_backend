import * as express from 'express';
import * as handlebars from 'express-handlebars';
import knex, { Knex } from 'knex';
import * as http from 'node:http';
import  yargs  = require("yargs");
import { hideBin } from 'yargs/helpers';

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
    

   
    app.engine("hbs", handlebars.engine());
    app.set("view engine", "hbs");
    app.set('views', `./views/hbs`);

    app.use(sessionManager(CONFIGS_MONGO_URL));
    app.use(authManager.session());
    app.use(express.static('public'))
    app.use("/user", crearUserRouter(authManager));
    app.use("/api/productos", crearAPIProductosRouter(prodRepo, authManager));
    app.use("/api/random", crearRandomRouter());
    app.use("/info", crearProcessInfoRouter());
    app.use("/", crearIndexRouter(prodRepo, authManager));
    

    httpServer.listen(port, () => {
        console.log(`Puerto: ${port}`);
    });

}




const argv = yargs(hideBin(process.argv)).option("puerto", {
    alias: "p",
    type: "number",
    description: "El puerto de escucha del servidor"
}).parse(); 

 
Main(argv);