import * as express from 'express';
import * as handlebars from 'express-handlebars';
import knex, { Knex } from 'knex';
import * as http from 'node:http';
import { crearAPIProductosRouter } from './routes/api/APIProductosRouter';
import { crearIndexRouter } from './routes/IndexRouter';
import { crearUserRouter } from './routes/UsersRouter';
 
import { ChatMongoDBContext } from './chat/mongodb/ChatMongoDBContext';
import { IMensajesRepository } from './chat/repositorios/IMensajesRepository';
import { MongoMensajesRepository } from './chat/repositorios/impl/MongoMensajesRepository';
import { EcommerceKnexDbContext } from './ecommerce/knexdb/EcommerceKnexKnexDbContext';
import { KnexProductosRepository } from './ecommerce/repositorios/impl/KnexProductosRepository';
import { IProductosRepository } from './ecommerce/repositorios/IProductosRepository';
import { ChatServer } from './websockets/ChatServer';
import { ProductoListServer } from './websockets/ProductoListServer';

import { sessionManager } from './sessions/SessionManager';
import { IAuthManager, LocalAuthManager } from './sessions/AuthManager';
import { MongoUserRepository } from './sessions/repositorios/impl/MongoUserRepository';
import { SessionMongoDBContext } from './sessions/mongodb/SessionMongoDbContext';

const Config = require("./Config.json");

const CONFIGS_MONGO_URL: string = Config.mongo_url;
 



const Main = async () =>
{
    const app = express();
    const port = process.env.PORT || 3000;
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
    app.use("/", crearIndexRouter(prodRepo, authManager));


    httpServer.listen(port, () => {
        console.log(`Puerto: ${port}`);
    });

}



Main();