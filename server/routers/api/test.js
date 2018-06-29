const path = require('path');
const uploadFile = require( '../../utils/upload');

module.exports = function(router){
    router.get('/hello', async(ctx)=>{
        ctx.body = {"name":"hello"};
    });

    router.post('/world', async(ctx)=>{
        console.log(ctx.request.body, typeof ctx.request.body);
    });

    router.post('/image', async(ctx)=>{
        let serverFilePath = path.join( __dirname, '../../../public/patent/upload-files' );

        // 上传文件事件
        result = await uploadFile( ctx, {
            fileType: 'patent-images',          // 上传之后的目录
            path: serverFilePath
        })

        ctx.body = result
    });
};