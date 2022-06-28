const express = require("express");
const productos = require("./routes/Productos.js");
const vistas = require("./routes/Vistas.js");
const app = express();
const port = process.env.PORT || 3000;
const handlebars = require("express-handlebars");
//const Contenedor = require("../Contenedor.js");
const engines = {
    hbs(){
        app.engine("hbs", handlebars.engine());
        app.set("view engine", "hbs"); 
    }, 
    pug(){
        app.set("view engine", "pug"); 
    },
    ejs()
    {
        app.set("view engine", "ejs"); 
    }
};

//Seteo del view engine
if(process.argv.length < 3)
{
    throw new Error("Elija view engine pug|hbs|ejs");
}

try
{
    const viewEngine = process.argv[2];
    engines[viewEngine]();
    app.set('views', `./views/${viewEngine}`);
}
catch(err)
{
    throw new Error("Elija view engine pug|hbs|ejs");
}


app.use("/api/productos", productos);
app.use("/", vistas());

app.listen(port, () => {
    console.log(`Puerto: ${port}`);
});
