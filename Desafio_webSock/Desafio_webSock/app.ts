import * as express from 'express';
import * as handlebars from 'express-handlebars';
import knex, { Knex } from 'knex';
import * as http from 'node:http';
import { crearProductosRouter } from './routes/ProductosRouter';
import { crearVistasRouter } from './routes/VistasRouter';
import { crearUserRouter } from './routes/UsersRouter';
 
import { ChatMongoDBContext } from './chat/mongodb/ChatMongoDBContext';
import { IMensajesRepository } from './chat/repositorios/IMensajesRepository';
import { MongoMensajesRepository } from './chat/repositorios/impl/MongoMensajesRepository';
import { EcommerceKnexDbContext } from './ecommerce/knexdb/EcommerceKnexKnexDbContext';
import { KnexProductosRepository } from './ecommerce/repositorios/impl/KnexProductosRepository';
import { IProductosRepository } from './ecommerce/repositorios/IProductosRepository';
import { ChatServer } from './websockets/ChatServer';
import { ProductoListServer } from './websockets/ProductoListServer';

import { SessionManager } from './sessions/SessionManager';


const CONFIGS_MONGO_URL: string = "";

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

  
    SessionManager.init(CONFIGS_MONGO_URL);
    const ecommerceDBConn = new EcommerceKnexDbContext(knex(ecommerceDbConfigs));
    const chatDBConn = new ChatMongoDBContext(CONFIGS_MONGO_URL);
   
    await ecommerceDBConn.setup();

    const prodRepo: IProductosRepository =  new KnexProductosRepository(ecommerceDBConn);
    const chatRepo: IMensajesRepository = new MongoMensajesRepository(chatDBConn);

    const prodServer = new ProductoListServer(httpServer, prodRepo, { path: "/productos" });
    const chatServer = new ChatServer(httpServer, chatRepo, { path: "/chat" });

    app.engine("hbs", handlebars.engine());
    app.set("view engine", "hbs");
    app.set('views', `./views/hbs`);
    app.use(SessionManager.middleware());
    app.use(express.static('public'))
    app.use("/users/", crearUserRouter());
    app.use("/api/productos", crearProductosRouter(prodRepo));
    app.use("/", crearVistasRouter(prodRepo));


    httpServer.listen(port, () => {
        console.log(`Puerto: ${port}`);
    });

}



Main();