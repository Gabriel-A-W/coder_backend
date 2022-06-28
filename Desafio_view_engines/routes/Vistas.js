const vistas = ()=> 
{
    const express = require("express");
    const router = express.Router();
    const Contenedor = require("../Contenedor.js");

    const contenedor = new Contenedor("prueba.txt");
    contenedor.data = [                                                                                                                                                     
        {                                                                                                                                                    
          "title": "Escuadra",                                                                                                                                 
          "price": 123.45,                                                                                                                                     
          "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",                                     
          "id": 1                                                                                                                                              
        },                                                                                                                                                   
        {                                                                                                                                                    
          "title": "Calculadora",                                                                                                                              
          "price": 234.56,                                                                                                                                     
          "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                          
          "id": 2                                                                                                                                              
        },                                                                                                                                                   
        {                                                                                                                                                    
          "title": "Globo Terráqueo",                                                                                                                          
          "price": 345.67,                                                                                                                                     
          "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                   
          "id": 3                                                                                                                                              
        }                                                                                                                                                    
      ];

  
    router.use(express.urlencoded({extended:true}));
    router.use(express.static('public'));
    
    router.get("/", (req, res) => {
        res.render("index"); 
    });
    
    router.post("/", (req, res) => {
        contenedor.add(req.body);
        res.render("index"); 
    });
    
    router.get("/productos", (req, res) => {
        res.render("catalogo", {values:contenedor.getAll()});
    });

    return router;
};



module.exports = vistas;