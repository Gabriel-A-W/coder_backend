import * as express from 'express';
import * as handlebars from 'express-handlebars';
import knex, { Knex } from 'knex';
import * as http from 'node:http';
import productosRouter from './routes/ProductosRouter';
import vistas from './routes/Vistas';

import { ChatKnexDbContext } from './chat/knexdb/ChatKnexDbContext';
import { IMensajesRepository } from './chat/repositorios/IMensajesRepository';
import { KnexMensajesRepository } from './chat/repositorios/impl/KnexMensajesRepository';
import { EcommerceKnexDbContext } from './ecommerce/knexdb/EcommerceKnexDbSetuper';
import { KnexProductosRepository } from './ecommerce/repositorios/impl/KnexProductosRepository';
import { IProductosRepository } from './ecommerce/repositorios/IProductosRepository';
import { ProductoListServer } from './websockets/ProductoListServer';
import { ChatServer } from './websockets/ChatServer';

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

    const chatDbConfigs: Knex.Config = {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: '',
            password: '',
            database: 'chatdb'
        }
    };

    const ecommerceDBConn = new EcommerceKnexDbContext(knex(ecommerceDbConfigs));
    const chatDBConn = new ChatKnexDbContext(knex(chatDbConfigs));
   
    await ecommerceDBConn.setup();
    await chatDBConn.setup();

    const prodRepo: IProductosRepository = new KnexProductosRepository(ecommerceDBConn);
    const chatRepo: IMensajesRepository = new KnexMensajesRepository(chatDBConn);

    const prodServer = new ProductoListServer(httpServer, prodRepo, { path: "/productos" });
    const chatServer = new ChatServer(httpServer, chatRepo, { path: "/chat" });

    app.engine("hbs", handlebars.engine());
    app.set("view engine", "hbs");
    app.set('views', `./views/hbs`);

    app.use(express.static('public'))
    app.use("/api/productos", productosRouter);
    app.use("/", vistas);

    httpServer.listen(port, () => {
        console.log(`Puerto: ${port}`);
    });

}



Main();