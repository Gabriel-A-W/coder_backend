const Contenedor = require("./Contenedor.js");
const express = require('express');
const app = express();
const port = 3000;

const DATOS_EJEMPLO = [                                                                                                                                                     
    {                                                                                                                                                    
      "title": "Escuadra",                                                                                                                                 
      "price": 123.45,                                                                                                                                     
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",                                     
                                                                                                                                               
    },                                                                                                                                                   
    {                                                                                                                                                    
      "title": "Calculadora",                                                                                                                              
      "price": 234.56,                                                                                                                                     
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                          
                                                                                                                                                
    },                                                                                                                                                   
    {                                                                                                                                                    
      "title": "Globo Terráqueo",                                                                                                                          
      "price": 345.67,                                                                                                                                     
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                   
                                                                                                                                                 
    }                                                                                                                                                    
  ];  


  
const contenedor = new Contenedor("prueba.txt");

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

 
app.get('/productos', async (req, res) => {
    const data = await contenedor.getAll();
    res.send(JSON.stringify(data));
});

app.get('/productoRandom', async (req, res) => {
    const data = await contenedor.getAll();
    
    res.send(JSON.stringify(data[getRandomInt(0, data.length)]));
});

app.listen(port, () => {
    console.log(`Puerto: ${port}`);
});
 
  