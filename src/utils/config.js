const h5Host = '/';
const pcHost = '/';
const isDebug = false;

// 开发时
// const APIV1 = '/api/v1';
// const APIV2 = '/api/v2';

// 上线时
const APIV1 = 'http://www.phix.cn';
const APIV2 = 'http://api.phix.cn';

module.exports = {
    name: 'phx',
    h5Host,
    pcHost,
    isDebug,
    pageSize: 5,
    tips: {
        pageEnd: '已经到底啦~',
    },
    api: {
        liveList: `${APIV1}/api/news/mindex`, // 快讯列表
        articleList: `${APIV1}/api/news/mindex`, // 文章列表
        articleDetail: `${APIV1}/api/news/detail`, // 文章详情
        articleCategory: `${APIV1}/api/news/category`, // 文章分类
        judge: `${APIV1}/api/news/act`, // 看多空
        register: `${APIV2}/reg`, // 注册
        login: `${APIV2}/auth`, // 注册
    },
    defaultCategoryId: 55, // 默认类别
    reg: {
        phoneReg: /^[1][3,4,5,7,8][0-9]{9}$/,
        passwordReg: /^.{6,20}$/,
        codeReg: /^.{4,}$/,
    },
    CORS: [],
    countdownTime: 5,
    loginPages: '/#/login?type=user&returl=',
};

