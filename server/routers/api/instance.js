/**
 * 用户操作
 *
 * Created by VLER on 2018/6/30.
 */
const InstanceLogic = require('../../logic/instance');
const tools = require('../../utils/tools');
const mscenter = require('../../utils/mscenter');
const uuid = require('uuid');
const logic = new InstanceLogic();

module.exports = function (router) {
     
    router.get('/system/instances', async(ctx) => {
        let ok = true;
        if (ok) { 
            let agents = await logic.agents();
            let instances = await logic.instances();
            let heart = await logic.heart();

            let results = [];
            for(let x of agents){
                let agent = {'ip':x.ip, 'agentid':x.agentid, instances:[]};
                results.push(agent);
                for(let y of instances){
                    if(y.agentid === agent.agentid){
                        let time = heart[y.instanceid]['time'];
                        let instance = {'instanceid':y.instanceid, 'package':y.package, 'time':time};   
                        agent.instances.push(instance);
                    }
                }
            }

            if (results === null) {
                ctx.body = {code: 404, message: 'users is null!'};
            } else {
                ctx.body = {code: 200, data:results};
            }
        }
    });
};
