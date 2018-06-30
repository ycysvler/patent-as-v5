let baseSchemas = require('./base-schemas');
let entSchemas = require('./ent-schemas');
let haSchemas = require('./ha-schemas');

const pool = new Map();

const getMongoPool = (entid)=>{
    entid = entid === "patent" ? "ent_20170808220894" : entid;
    entid = entid === undefined ? "cabase":entid;

    if(!pool.has(entid)){
        if(entid === 'ha'){
            let schemas = new haSchemas();
            pool.set(entid, schemas);
        }
       else if(entid === 'cabase'){
           let schemas = new baseSchemas();
           pool.set(entid, schemas);
       }else{
           let schemas = new entSchemas(entid);
           pool.set(entid, schemas);
       }
    }
    let db = pool.get(entid);

    return db;
}

module.exports = getMongoPool;