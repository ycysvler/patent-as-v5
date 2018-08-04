/**
 * 图像操作
 *
 * Created by VLER on 2018/6/30.
 */
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const moment = require('moment');
const ImageLogic = require('../../logic/image');
const tools = require('../../utils/tools');
const config = require('../../config/config');
const mscenter = require('../../utils/mscenter');
const uploadFile = require('../../utils/upload');

const logic = new ImageLogic();

module.exports = function (router) {
    /**
     * 图像内容
     * @query  {string} name     图片名
     * @return {object}          图片数据
     */
    router.get('/images/data/:name', async(ctx) => {
        let ok = tools.required(ctx, ['name']);
        if (ok) {
            let name = ctx.params.name;
            let type = ctx.request.query.type;
            let item = await logic.getSource(name, type);
            ctx.body = item;
        }
    });

    /**
     * 查询任务-上传图片
     * @query  {buffer} imagefile   图片文件
     * @return {object}             文件名
     */
    router.post('/search/images', async(ctx) => {
        let serverFilePath = path.join(__dirname, '../../../public/patent/upload-files');

        // 上传文件事件
        let result = await uploadFile(ctx, {
            fileType: 'patent-images',          // 上传之后的目录
            path: serverFilePath
        });

        let chunk = fs.readFileSync(result.path);
        let extname = path.extname(result.path);

        let item = {
            createtime: new moment(),
            name: uuid.v1() + extname,
            source: chunk,
            type: 'search',
            state: 0
        };
        let image = await logic.add(item);
        mscenter.publish('Feature:BuildFeature', {name: item.name, type: 'search', entid: config.app.entid});

        let i = 0;
        while (i < 10) {
            let state = await logic.getState(item.name);
            if (state === 2)
                break;
            await tools.sleep(1000);
            i++;
        }

        fs.unlink(result.path, () => {});
        let colour = await logic.getColour(image);
        ctx.body = {code: 200, data: {name:image, colour:colour}};
    });


    // PaaS -> 查询 -> 图片数据
    router.get('/images/crop/:name', async(ctx) => {
        let name = ctx.params.name;

        let ok = tools.required(ctx, ['width','height','x','y']);

        if(ok){
            let x = ctx.request.query['x'];
            let y = ctx.request.query['y'];
            let width = ctx.request.query['width'];
            let height = ctx.request.query['height'];
            let type = null;
            let img = await logic.getCropImage(name, type, width, height, x, y);
            ctx.body = img;
        }
    });
};
