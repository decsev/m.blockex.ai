const h5Host = '/';
const pcHost = '/';
const isDebug = false;
// const APIV1 = '/api-v1'; // 开发时使用
const APIV1 = ''; // 打包的时候使用

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
    },
    defaultCategoryId: 55, // 默认类别
};

