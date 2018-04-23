const h5Host = '/';
const pcHost = '/';
const isDebug = false;

let APIV1 = null;
let APIV2 = null;
let apiDomain = null;
const wxUrlReg = /(^m\.[^.]*\..+$) | (^www\.[^.]*\..+$)/g;

if (wxUrlReg.test(document.domain)) { // 线上域名
    apiDomain = document.domain.replace(/^[^.]/, '');
    APIV1 = `http://www${apiDomain}`;
    APIV2 = `http://api${apiDomain}`;
} else { // 开发localhost域名
    apiDomain = '.phix.cn';
    APIV1 = 'http://www.phix.cn';
    APIV2 = 'http://api.phix.cn';
}

module.exports = {
    name: '数字财经',
    h5Host: `http://m${apiDomain}`,
    pcHost: `http://www${apiDomain}`,
    isDebug,
    pageSize: 5, // 每次加载条数
    tips: {
        pageEnd: '已经到底啦~', // 上拉没有更多数据文案
    },
    api: {
        liveList: `${APIV1}/api/news/mindex`, // 快讯列表
        // articleList: `${APIV1}/api/news/mindex`, // 文章列表
        articleList: `${APIV1}/api/news/newslist`, // 文章列表
        articleDetail: `${APIV1}/api/news/detail`, // 文章详情
        articleCategory: `${APIV1}/api/news/category`, // 文章分类
        judge: `${APIV1}/api/news/act`, // 看多空
        register: `${APIV2}/reg`, // 注册
        login: `${APIV2}/auth`, // 注册
    },
    // defaultCategoryId: '62', // 文章默认类别
    defaultCategoryId: 'top', // 文章默认类别
    reg: { // 表单较验正则
        phoneReg: /^[1][3,4,5,7,8][0-9]{9}$/,
        passwordReg: /^.{6,20}$/,
        codeReg: /^.{4,}$/,
    },
    CORS: [ // 跨域不走jsonp域名配置
        APIV1,
        APIV2,
    ],
    countdownTime: 10, // 倒计时间
    loginPages: '/#/login?type=user&returl=', // 登陆页
    // 文章首页banner图配置
    banner: [
        {
            link: 'javascript:void(0);',
            img: './static/img/banner/a.jpg',
        },
        {
            link: 'javascript:void(0);',
            img: './static/img/banner/b.jpg',
        },
        {
            link: 'javascript:void(0);',
            img: './static/img/banner/c.jpg',
        },
    ],
};

