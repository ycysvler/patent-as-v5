/**
 * 用户操作
 *
 * Created by VLER on 2018/7/1.
 */
const LocarnoLogic = require('../../logic/locarno');
const tools = require('../../utils/tools');

const logic = new LocarnoLogic();

module.exports = function (router) {
    /**
     * 用户登录
     * @param  {string} username 用户名
     * @param  {string} password 密码
     * @return {object}          用户信息
     */
    router.get('/locarno/nodes', async(ctx) => {
        let ok = true;

        if (ok) {
            let item = await logic.getTypes();
            ctx.body ={code:200, data:item} ;
        }
    });

};