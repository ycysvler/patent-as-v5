/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class JobResultLogic {

    /**
     * 获取任务查询结果列表数据
     * @return {array}
     */
    list(body) {
        return new Promise((resolve, reject) => {
            try {
                let Item = getMongoPool('patent').JobResult;

                Item.find({"jobid": body.jobid, "imagetype": body.type})
                    .skip(body.pager.pagesize * (body.pager.current - 1))
                    .limit(body.pager.pagesize)
                    .exec(
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

};