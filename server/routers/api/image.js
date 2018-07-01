/**
 * 图像操作
 *
 * Created by VLER on 2018/6/30.
 */
const ImageLogic = require('../../logic/image');
const tools = require('../../utils/tools');

const logic = new ImageLogic();

module.exports = function(router) {
    /**
     * 图像内容
     * @query  {string} name     图片名
     * @return {object}          图片数据
     */
    router.get('/images/data/:name', async(ctx) => {
        let ok = tools.required(ctx, ['name']);
        if (ok) {
            let name = ctx.params.name;
            let item = await logic.getSource(name);

            console.log('item>',item);
            ctx.body = item;
        }
    });
};
