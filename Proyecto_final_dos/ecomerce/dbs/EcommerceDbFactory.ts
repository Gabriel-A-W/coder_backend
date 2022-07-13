import { EcommerceDb } from "./EcommerceDb";
import { FileEcommerceDb } from "./impl/FileEcommerceDb";
import { FirestoreEcommerceDb } from "./impl/FirestoreEcommerceDb";
import { MongoEcommerceDb } from "./impl/MongoEcommerceDb";

export interface IEcommerceDbConfig
{
    db: "mongo"|"firestore"|"file";
    uri: string;
}

export const CrearEcommerceDb = (cfg : IEcommerceDbConfig) : EcommerceDb =>
{
    switch (cfg.db)
    {
        case 'mongo':
            return new MongoEcommerceDb(cfg.uri);
        case 'file':
            return new FileEcommerceDb(cfg.uri);
        case 'firestore':
            return new FirestoreEcommerceDb(cfg.uri);
    }

    throw new Error("db no soportada");
}