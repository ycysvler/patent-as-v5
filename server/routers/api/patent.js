/**
 * 用户操作
 *
 * Created by VLER on 2018/6/30.
 */
const path = require('path');
const PatentLogic = require('../../logic/patent');
const tools = require('../../utils/tools');

const logic = new PatentLogic();

module.exports = function (router) {
    /**
     * 任务列表
     * @query  {object} userid   用户ID
     * @return {object}          菜单信息
     */
    router.get('/patent/:ap_num', async(ctx) => {
        let ok = tools.required(ctx, ['ap_num']);
        if (ok) {
            let ap_num = ctx.params.ap_num;
            let item = await logic.single(ap_num);
            ctx.body = {code: 200, data: item};
        }
    });


};