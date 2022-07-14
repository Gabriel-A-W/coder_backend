import { firestore } from "firebase-admin";
import { IRecord } from "../../entidades/IRecord";
import { IRepository } from "../IRepository";



export  class FirestoreRepository<TRow extends IRecord> implements IRepository<TRow>
{

    protected readonly _modelo : firestore.CollectionReference;
 

    constructor(collection : firestore.CollectionReference)
    {
        this._modelo = collection; 
        
    }

    async getNextId()
    {
        const snapshot = await this._modelo.orderBy("id", "desc").limit(1).get();
        const docs = snapshot.docs;
        if(docs.length === 0)
        {
            return 1;
        }   
        
        return docs[0].data().id+1;
    }

    async getAll(): Promise<TRow[]> 
    {
        const snapshot = await this._modelo.get();
        const docs = snapshot.docs;

        return docs.map(o => o.data() as TRow);
    }

    async add(p: Partial<TRow>): Promise<TRow> 
    {
        
        let pcopia: TRow = Object.assign({}, p) as TRow;
         
        pcopia.id = await this.getNextId();
        console.log(pcopia);
        let nuevo = this._modelo.doc(`${pcopia.id}`);
        await nuevo.create(structuredClone(pcopia));

        return pcopia;
    }

    async getById(id: number): Promise<TRow> 
    {
        const doc = await this._modelo.doc(`${id}`).get();
        const data = doc.data() as TRow;
         
        return data;
    }

    async deleteById(id: number): Promise<boolean> 
    {
        const doc = await this._modelo.doc(`${id}`);
        const data = await doc.delete()
        return true;
    }

    async update(o: Partial<TRow>): Promise<TRow> 
    {
        if(o.id === null || o.id === undefined)
        {
            return null;
        }

        const doc = await this._modelo.doc(`${o.id}`).get();
       
        if(doc.exists)
        {
            const ocopia = structuredClone(Object.assign({}, doc.data(), o));  
            (await this._modelo.doc(`${o.id}`)).update(ocopia);

            return ocopia as TRow;
        }
    
        return null;
    }

    async deleteAll(): Promise<void> 
    {
        await this._modelo.firestore.recursiveDelete(this._modelo);
    }

   
}