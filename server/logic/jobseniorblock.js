/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class JobSeniorBlockLogic {

    /**
     * 创建查询任务
     * @param  {object} data     任务信息
     * @return {object}          ？？
     */
    create(data){
        return new Promise((resolve, reject) => {
            try {
                let Job = getMongoPool('patent').JobSeniorBlock;
                let item = new Job(data);
                item.state = 0;
                item.createtime = new moment();

                item.save(function (err, item) {
                    if (!err) {
                        resolve(item.file_name);
                    } else {
                        reject(err);
                    }
                });
            } catch (err) {
                reject(err)
            }
        });
    }


};