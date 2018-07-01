/**
 * Created by VLER on 2018/6/29.
 */
let moment = require('moment');
let uuid = require('uuid');

let getMongoPool = require('../../models/mongo/pool.js');

module.exports = function(router) {
    router.get('/images/count', async(ctx)=>{
        let count = await getCount();
        ctx.body = count;
    });
};


function getCount() {
    return new Promise((resolve, reject) => {
        try {

            let Image = getMongoPool('ent_20170808220894').Image;
            Image.count({},function (err, items) {
                resolve( items );
            });
        } catch ( err ) {
            reject( err )
        }
    });
}