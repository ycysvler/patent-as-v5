/**
 * 用户操作
 *
 * Created by VLER on 2018/6/30.
 */
const JobLogic = require('../../logic/job');
const tools = require('../../utils/tools');

const logic = new JobLogic();

module.exports = function (router) {
    /**
     * 任务列表
     * @query  {object} userid   用户ID
     * @return {object}          菜单信息
     */
    router.get('/locarno/job', async(ctx) => {
        let ok = tools.required(ctx, ['userid','jobtype']);
        if (ok) {
            let userid = ctx.request.query.userid;
            let jobtype = ctx.request.query.jobtype;
            let item = await logic.list(userid,jobtype,'');
            ctx.body = {code: 200, data: item};
        }
    });
};