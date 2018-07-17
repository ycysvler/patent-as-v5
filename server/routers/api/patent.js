/**
 * 用户操作
 *
 * Created by VLER on 2018/6/30.
 */
const path = require('path');
const PatentLogic = require('../../logic/patent');
const ImageLogic = require('../../logic/image');
const tools = require('../../utils/tools');

const patentLogic = new PatentLogic();
const imageLogic = new ImageLogic();

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
            let item = await patentLogic.single(ap_num);
            let images = await imageLogic.getNamesByCode(ap_num);

            let result = JSON.parse( JSON.stringify(item));

            result['images'] = images;

            ctx.body = {code: 200, data: result};
        }
    });


};