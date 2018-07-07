/**
 * Created by VLER on 2018/7/1.
 */
const moment = require('moment');
const uuid = require('uuid');
const ImageIndexLogic = require('./imageindexfile');
const JobFastBlockLogic = require('./jobfastblock');
const JobSeniorBlockLogic = require('./jobseniorblock');
const JobZoneBlockLogic = require('./jobzoneblock');
const InstanceLogic = require('./instance');
const mscenter = require('../utils/mscenter');
const config = require('../config/config');
const getMongoPool = require('../models/mongo/pool.js');

module.exports = class JobLogic {

    /**
     * 获取任务列表数据
     * @return {array}          外观类型列表
     */
    list(userid, jobtype, keyword) {
        return new Promise((resolve, reject) => {
            try {
                let Item = getMongoPool('patent').Job;

                Item.find(
                    {"jobtype": jobtype},
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

    /**
     * 创建查询任务
     * @param  {object} data     任务信息
     * @return {object}          ？？
     */
    create(data) {
        let self = this;
        return new Promise(async(resolve, reject) => {
            try {
                let Job = getMongoPool('patent').Job;
                let item = new Job(data);
                item.state = 0;
                item.createtime = new moment();

                item.save(async(err, item) => {
                    if (!err) {
                        switch (item.jobtype) {
                            case 0:     // 快速查询
                                await self.fast(item);
                                break;
                            case 1:     // 高级查询
                                await self.senior(item, true);
                                break;
                            case 2:     // 局部查询
                                await self.senior(item, false);
                                break;
                        }
                        // 通知新查询任务产生
                        console.log('publish msg');
                        mscenter.publish('Search:NewJob', {jobid: item._id, entid: config.app.entid});

                        resolve(item);
                    } else {
                        reject(err);
                    }
                });
            } catch (err) {
                reject(err)
            }
        });
    }

    async fast(item) {
        let imageIndexFile = new ImageIndexLogic();
        let indexFiles = await imageIndexFile.list(item.imagetypes, item.featuretypes);

        let jobFastBlock = new JobFastBlockLogic();

        for (let img of item.images) {
            for (let indexFile of indexFiles) {
                let block = {
                    jobid: item._id,
                    image: img,
                    file_name: indexFile.file_name,
                    type: indexFile.type,
                    resultcount: item.resultcount,
                    feature_type: indexFile.feature_type,
                    count: indexFile.count,
                    index: indexFile.index,
                    state: 0,
                    createtime: new moment()
                };

                await jobFastBlock.create(block);
            }
        }
    }

    async senior(item, isSenior) {
        let JobBlock = isSenior ? new JobSeniorBlockLogic() : new JobZoneBlockLogic();

        let instranceLogic = InstanceLogic();

        let instances = await instranceLogic.list();

        for(let i = 0; i < instances.length; i++){
            let instance = instances[i];

            for (let type of item.imagetypes) {
                for (let image of item.images) {
                    let block = {
                        jobid: item._id,
                        image: image,
                        type: type,
                        resultcount: item.resultcount,
                        state: 0,
                        instanceid:instance.instanceid,
                        index:i,
                        createtime: new moment()
                    };
                    await JobBlock.create(block);
                }
            }
        }

    }



};