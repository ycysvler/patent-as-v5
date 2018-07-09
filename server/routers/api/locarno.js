/**
 * 用户操作
 *
 * Created by VLER on 2018/7/1.
 */
const LocarnoLogic = require('../../logic/locarno');
const JobResultLogic = require('../../logic/jobresult');
const tools = require('../../utils/tools');

module.exports = function (router) {
    /**
     * 用户登录
     * @param  {string} username 用户名
     * @param  {string} password 密码
     * @return {object}          用户信息
     */
    router.get('/locarno/nodes', async(ctx) => {
        let logic = new LocarnoLogic();
        let ok = true;

        if (ok) {
            let item = await logic.getTypes();
            ctx.body = {code: 200, data: item};
        }
    });
    router.post('/locarno/result/images', async(ctx) => {

        let logic = new JobResultLogic();
        let weight = ctx.request.body.weight;

        let w_color = weight.color ? weight.color : 0;
        let w_shape = weight.shape ? weight.shape : 0;
        let w_deep = weight.deep ? weight.deep : 0;
        let w_lbp = weight.lbp ? weight.lbp : 0;

        let ok = true;

        if (ok) {
            let items = await logic.list(ctx.request.body);
            let result = [];
            for (let item of items) {
                result.push({
                    image: item.image,
                    code: 'image',
                    score: item.shapescore * w_shape + item.deepscore * w_deep + item.lbpscore * w_lbp + item.colorscore * w_color
                });
            }

            let a = result.sort((obj1, obj2)=>{if( obj1.score*100 > obj2.score*100) return 1; else return 0;});
            ctx.body = {code: 200, data: {total: a.length, datas: a}};
        }
    });
};