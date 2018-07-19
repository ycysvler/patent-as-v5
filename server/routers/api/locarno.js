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

        let body = ctx.request.body;

        let ok = true;

        if (ok) {
            let {total,items} = await logic.list(body);
            let result = [];
            for (let item of items) {
                let shapescore = item.shapescore === 0 ? 1 : item.shapescore;
                let deepscore = item.deepscore === 0 ? 1 : item.deepscore;
                let lbpscore = item.lbpscore === 0 ? 1 : item.lbpscore;
                let colorscore = item.colorscore === 0 ? 1 : item.colorscore;
                result.push({
                    image: item.image,
                    code: item.code,
                    score: shapescore * w_shape + deepscore * w_deep + lbpscore * w_lbp + colorscore * w_color
                });
            }

            result.sort((obj1, obj2)=>{if( obj1.score > obj2.score) return 1; else return -1;});
            result = result.filter(function(element,index, self){
                return self.indexOf(element) == index;
            });
            result = result.slice(body.pager.pagesize * (body.pager.current - 1), body.pager.pagesize * body.pager.current);

            ctx.body = {code: 200, data: {total: total, datas: result}};
        }
    });

    router.post('/locarno/result/patents', async(ctx) => {
        let ok = true;
        if (ok) {
            let logic = new JobResultLogic();
            let {total,items} = await logic.patentGroup(ctx.request.body);
            let result = {code:200, data:{total:total, datas:items}};
            ctx.body = result;
        }

    });
};