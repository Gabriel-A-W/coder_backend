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

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };



router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/", (req,res, next) =>{
    const data =  contenedor.getAll();
    res.json(data);
    next();
});

router.get("/:id", (req,res, next) =>{
    const data =  contenedor.getById(parseInt(req.params.id));
    res.json(data);
    next();
});

router.post("/", (req,res, next) =>{
    const o = Object.assign({}, req.body);
    contenedor.add(o);
    res.json(o);
    next();
});

router.put("/:id", (req,res, next) =>{
    const data =  contenedor.getById(parseInt(req.params.id));
    if(data)
    {
        const id = data.id;
        Object.assign(data, req.body);
        data.id = id;
        res.status(200);
        res.send();
    }
    next();
});

router.delete("/:id", (req,res, next) =>{
    if(contenedor.deleteById(parseInt(req.params.id)))
    {
        res.status(200);
        res.send();
    }
    else
    {
        res.status(404);
        res.send();
    }


    next();
});




module.exports = router;