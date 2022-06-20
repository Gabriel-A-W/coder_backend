const FS = require("node:fs");
const FSPromise = require("node:fs/promises");


const {O_CREAT} = FS.constants;



class Contenedor
{
    constructor(fpath)
    {
        this.fpath = fpath;
        this.esPrimeraVez = true;
        this.data = [];
    }

    getNextId()
    {
        const data = this.getAll();
        if(data.length === 0)
        {
            return 1;
        }

        return Math.max(... data.map((e)=> e.id)) + 1;
    }

    getAll()
    {
        return this.data;
    }
 
    add(obj)
    {
        obj.id = this.getNextId();
        this.data.push(obj);
    }

    getById(id)
    {
        return this.data.find((e) => e.id === id);
    }

    deleteById(id)
    {
        const idx = this.data.findIndex((e) => e.id === id);
        if(idx >= 0)
        {
            this.data.splice(idx, 1);
            return true;
        }
        
        return false;
    }

    deleteAll()
    {
        this.data = [];
    }


}

module.exports = Contenedor;