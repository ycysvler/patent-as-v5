var mongodbconfig = require('../../config/config').mongodb;
var mongoose = require('mongoose');

module.exports = class Schemas {
    constructor(entid) {
        let uri = mongodbconfig.uri + entid;
        let conn = mongoose.createConnection(uri, mongodbconfig.options);

        conn.then(function (db) {
            console.log("ent mongodb connected!");
        });

        this.imageSchema = new mongoose.Schema({
            name: {type: String, index: {unique: true, dropDups: true}},       // 图片名称
            type: {type: String, index: true},       // 业务类型
            code: {type: String, index: true},       // 合同编号
            colour: {type: Number, index: true},     // 业务类型
            state: {type: Number, index: true},      // 状态 0:新图，1:正在计算特征，2：计算特征成功，-1：计算特征失败
            source: Buffer,                          //  原始图像
            shape_cut: Buffer,                       //  形状归一图
            color_cut: Buffer,                       //  颜色归一图
            color_feature: Buffer,                   //  颜色特征
            lbp_feature: Buffer,                     //  纹理特征
            shape_feature: Buffer,                   //  形状特征
            deep_feature: Buffer,                    //  深度学习特征
            extend: String,                          //  扩展字段，放个大字符串
            createtime: Date                         //  创建时间
        });
        this.Image = conn.model('Image', this.imageSchema);

        this.imageTypeSchema = new mongoose.Schema({
            name: {type: String, index: {unique: true, dropDups: true}}, // 类型名称
            code: {type: String, index: {unique: true, dropDups: true}}, // 类型编号
            order: {type: Number},                                       // 类型排序
            description: String,                                         // 描述信息
            createtime: Date                                             // 创建时间
        });
        this.ImageType = conn.model('ImageType', this.imageTypeSchema);

        this.imageIndexSchema = new mongoose.Schema({
            name: {type: String},                    // 图片名称
            type: {type: String, index: true},       // 业务类型
            index: {type: Number, index: true},      // 索引号
            state: {type: Number, index: true}         // 0 可用，-1 不可用
        });
        this.imageIndexSchema.index({type: 1, index: 1});
        this.imageIndexSchema.index({type: 1, state: 1});
        this.ImageIndex = conn.model('ImageIndex', this.imageIndexSchema);

        this.imageIndexFileSchema = new mongoose.Schema({
            file_name: {type: String, index: {unique: true, dropDups: true}},  // 图片名称
            type: String,                           // 业务类型
            feature_type: String,                   // 查询的特征类型
            count: Number,
            index: Number,
            version: String,                        // 查询的特征类型
        });
        this.ImageIndexFile = conn.model('ImageIndexFile', this.imageIndexFileSchema);

        this.jobFastBlockSchema = new mongoose.Schema({
            jobid: {type: String, index: true},
            image: String,                           // 查询的图片类型
            file_name: String,                      // 索引文件名
            type: String,                           // 查询的图片类型
            feature_type: String,                   // 查询的特征类型
            count: Number,
            index: Number,
            resultcount: Number,                     // 用户想要多少个结果（每个block）
            state: {type: Number, index: true},        // 0 等待，1 正在执行， 2 执行结束
            createtime: Date                         // 创建时间
        });

        this.jobFastBlockSchema.index({jobid: 1, state: 1});
        this.jobFastBlockSchema.index({jobid: 1, file_name: 1});
        this.JobFastBlock = conn.model('JobFastBlock', this.jobFastBlockSchema);

        this.jobSeniorBlockSchema = new mongoose.Schema({
            jobid: {type: String, index: true},
            image: String,                           // 查询的图片类型
            type: String,                           // 查询的图片类型
            instanceid: String,                     // worker 实例Id
            index: Number,                          // worker index
            progress: Number,                        // 这个任务的进度
            resultcount: Number,                     // 用户想要多少个结果（每个block）
            state: {type: Number, index: true},        // 0 等待，1 正在执行， 2 执行结束
            createtime: Date                         // 创建时间
        });
        this.JobSeniorBlock = conn.model('JobSeniorBlock', this.jobSeniorBlockSchema);

        this.jobZoneBlockSchema = new mongoose.Schema({
            jobid: {type: String, index: true},
            image: String,                           // 查询的图片类型
            type: String,                           // 查询的图片类型
            instanceid: String,                     // worker 实例Id
            index: Number,                          // worker index
            progress: Number,                        // 这个任务的进度
            resultcount: Number,                     // 用户想要多少个结果（每个block）
            state: {type: Number, index: true},        // 0 等待，1 正在执行， 2 执行结束
            createtime: Date                         // 创建时间
        });
        this.JobZoneBlock = conn.model('JobZoneBlock', this.jobZoneBlockSchema);

        this.jobResultSchema = new mongoose.Schema({
            jobid: {type: String, index: true},  // 任务ID
            source: String,                      // 搜索图片
            code: String,                        // 合同编号
            imagetype: String,                   // 查询的图片类型
            image: String,                       // 搜索结果
            shapescore: Number,                  // shape 相似度
            deepscore: Number,                   // deep 相似度
            lbpscore: Number,                    // lbp 相似度
            colorscore: Number,                  // color 相似度
            extend: String,                      // 扩展内容
            createtime: Date                     // 创建时间
        });
        this.jobResultSchema.index({jobid: 1, imagetype: 1});
        this.JobResult = conn.model('JobResult', this.jobResultSchema);


        // v.5 用户表
        this.userSchema = new mongoose.Schema({
            userid: {type: String, index: {unique: true, dropDups: true}},      // 用户ID
            username: {type: String, index: {unique: true, dropDups: true}},    // 登录名
            password: {type: String},                                           // 密码
            cname: String,                                                      // 中文名
            icon: String,                                                       // 头像地址
            menus: Object,                                                      // 菜单
            createtime: Date                                                    // 创建时间
        });
        this.User = conn.model('User', this.userSchema);


        // v.5 角色表
        this.roleSchema = new mongoose.Schema({ 
            rolename: {type: String, index: {unique: true, dropDups: true}},    // 角色名 
            cname: String,                                                      // 中文名
            menus: Object,                                                      // 菜单
            createtime: Date                                                    // 创建时间
        });
        this.Role = conn.model('Role', this.roleSchema);

        // v.5 外观专利类别
        this.locarnoTypeSchema = new mongoose.Schema({
            typeid: {type: String, index: {unique: true, dropDups: true}},      // 类型ID
            parentid: {type: String},                                           // 父ID
            typecode: {type: String},                                           // 类型编码
            typename: String,                                                   // 类型名称
            order: Number,                                                      // 排序
            icon: String,                                                       // 图标
            description: String,                                                // 描述
        });
        this.LocarnoType = conn.model('LocarnoType', this.locarnoTypeSchema);

        // v.5 查询任务
        this.jobSchema = new mongoose.Schema({
            userid: {type: String, index: true},                                // 用户ID
            name: {type: String},                                               // 任务名称
            imagetypes: [String],                                               // 查询的图片类型
            images: [String],                                                   // 查询的图片类型
            jobtype: Number,                                                    // 0 快速查询， 1 高级查询， 2 局部查询
            featuretypes: [String],                                             // 查询的特征类型
            progress: Number,                                                   // 进度
            state: {type: Number, index: true},                                 // 0 等待，1 正在执行， 2 执行结束
            resultcount: Number,                                                // 用户想要多少个结果（一共）
            createtime: Date,                                                   // 创建时间
            endtime: Date                                                       // 结束时间
        });
        this.Job = conn.model('Job', this.jobSchema);

        // v.5 查询任务
        this.patentSchema = new mongoose.Schema({
            ap_num: {type: String, index: true},                                // 专利编号
            image_ok: {type: String},
            ap_name: {type: String},
            ap_date: {type: String},
            db_type: {type: String},
            main_class: {type: String},
            sub_class: {type: String},
            simple_name: {type: String},
            pub_date: {type: String},
            pub_num: {type: String},
            pa_name: {type: String},
            designer: {type: String},
            agent_name: {type: String},
            prio_date: {type: String},
            abstract: {type: String},
            imageinfo: {type: String},
            createtime: Date                                                   // 创建时间
        });
        this.Patent = conn.model('Patent', this.patentSchema);
    }
};

