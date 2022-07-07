import * as express from 'express';
import { RAMProductoDAO } from './RAMProductoDAO';
import { CrearProductosRouter } from "./routes/ProductosRouter"


const app = express();
const port = process.env.PORT || 3000;

app.use("/api/productos", CrearProductosRouter(new RAMProductoDAO()))



app.listen(port, () => {
    console.log(`Puerto: ${port}`);
});