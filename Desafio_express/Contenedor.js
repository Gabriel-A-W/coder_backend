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

    async getNextId()
    {
        const data = await this.getAll();
        if(data.length === 0)
        {
            return 1;
        }

        return Math.max(... data.map((e)=> e.id)) + 1;
    }

    async getAll()
    {
        if(this.esPrimeraVez)
        {
            try
            {
                const contenido = await FSPromise.readFile(this.fpath, {encoding: "utf-8", flag: O_CREAT});
                this.esPrimeraVez = false;
                if(contenido.length > 0)
                {
                    this.data = JSON.parse(contenido);
                } 
            }
            catch(err)
            {
                throw err;
            } 
        }

        return this.data;
    }
 

    async save(obj)
    {
        if(!(obj instanceof Object))
        {
            throw new Error("obj debe ser un objeto");
        }
     
        const nuevoObj = Object.assign({}, obj);
        const dataCpy = [... await this.getAll()];
        nuevoObj.id = await this.getNextId();
        dataCpy.push(nuevoObj);
        
        await FSPromise.writeFile(this.fpath, JSON.stringify(dataCpy), "utf-8");
        
        //GAW: Si write falla, esto no se hace dejando a this.data consistente.
        obj.id = nuevoObj.id;
        this.data.push(obj);

        return nuevoObj.id;
    }

    async getById(id)
    {
        return (await this.getAll()).find((e) => e.id === id);
    }

    async deleteById(id)
    {
        const dataCpy = [... await this.getAll()];
        const idx = dataCpy.findIndex((e) => e.id === id);
        dataCpy.splice(idx, 1);

        await FSPromise.writeFile(this.fpath, JSON.stringify(dataCpy), "utf-8");
        //GAW: Si write falla, esto no se hace dejando a this.data consistente.
        this.data.splice(idx, 1);
    }

    async deleteAll()
    {
        await FSPromise.writeFile(this.fpath, JSON.stringify([]), "utf-8");
        this.data = [];
    }


}

module.exports = Contenedor;