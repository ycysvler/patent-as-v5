/**
 * Created by VLER on 2018/7/1.
 */
const getMongoPool = require('../models/mongo/pool.js');
const PatentLogic = require('./patent');
const ImageLogic = require('./image');

const patentLogic = new PatentLogic();
const imageLogic = new ImageLogic();

module.exports = class JobResultLogic {

    /**
     * 获取任务查询结果列表数据
     * @return {array}
     */
    list(body) {
        let self = this;
        return new Promise(async(resolve, reject) => {
            try {
                let Item = getMongoPool('patent').JobResult;
                let count = await self.resultCount(body.jobid);

                Item.find({"jobid": body.jobid, "imagetype": body.type})
                    .skip(body.pager.pagesize * (body.pager.current - 1))
                    .limit(body.pager.pagesize)
                    .exec(
                        function (err, items) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({total:count, items:items});
                            }
                        });
            } catch (err) {
                reject(err)
            }
        });
    }

    resultCount(jobid){
        return new Promise((resolve, reject) => {
            try {
                let Item = getMongoPool('patent').JobResult;

                Item.count({"jobid": jobid} ,
                        function (err, item) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(item);
                            }
                        });
            } catch (err) {
                reject(err)
            }
        });
    }

    patentGroup(jobid,pageSize, index){
        let self = this;

        return new Promise(async(resolve, reject) => {
            try {
                let Item = getMongoPool('patent').JobResult;
                let count = await self.resultCount(jobid);
                let skip = (index - 1) * pageSize;

                Item.aggregate(
                    [{$match:{jobid:jobid}},
                        {$group : {_id : "$code", num : {$sum : 1}}},
                        {$sort:{"num":-1}},{$skip:skip},{$limit:pageSize}] ,
                    async function (err, items) {
                        if (err) {
                            reject(err);
                        } else {
                            let patents = [];
                            for(let i of items){
                                let patent = await patentLogic.single(i._id);
                                let images = await imageLogic.getNamesByCode(i._id);

                                let one = JSON.parse( JSON.stringify(patent));

                                one['images'] = images;
                                one['_id'] = one['code'];
                                one['image'] = images[0]['name'];

                                patents.push(one);
                            }

                            resolve({total:count, items:patents});
                        }
                    });
            } catch (err) {
                reject(err)
            }
        });
    }
};