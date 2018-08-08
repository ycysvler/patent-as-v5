/**
 * 用户操作
 *
 * Created by VLER on 2018/6/30.
 */
const RoleLogic = require('../../logic/role');
const tools = require('../../utils/tools');

const logic = new RoleLogic();

module.exports = function (router) {
     
    /**
     * 添加
     * @param  {object} data     用户数据
     * @return {object}          用户信息
     */
    router.post('/system/roles', async(ctx) => {
        let item = await logic.add(ctx.request.body);
        ctx.body = item;
    });

    /**
     * 用户菜单
     * @query  {object} userid   用户ID
     * @return {object}          菜单信息
     */
    router.get('/system/roles/:name', async(ctx) => {
        let ok = tools.required(ctx, ['name']);
        if (ok) {
            let userid = ctx.request.query.userid;
            let item = await logic.single(ctx.request.query.userid);
            if (item === null) {
                ctx.body = {code: 404, message: 'user [' + userid + '] is missing!'};
            } else {
                ctx.body = {code: 200, data: item.menus};
            }
        }
    });

    /**
     * 用户菜单
     * @query  {object} userid   用户ID
     * @return {object}          菜单信息
     */
    router.get('/system/roles', async(ctx) => {
        let ok = true;
        if (ok) {
            let userid = ctx.request.query.userid;
            let items = await logic.list();
            if (items === null) {
                ctx.body = {code: 404, message: 'roles is null!'};
            } else {
                ctx.body = {code: 200, data: items};
            }
        }
    });

    /**
     * 删除 
     */
    router.delete('/system/roles', async(ctx)=>{
        let ok = true;
        if (ok) {
            let body = ctx.request.body; 
            let item = await logic.remove(body);
            ctx.body = {code: 200};
        }
    });
};
