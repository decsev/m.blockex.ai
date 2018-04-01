const h5Host = '/';
const pcHost = '/';
const isDebug = false;
const APIV1 = '/api-v1';
// const APIV1 = '';

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
        articleList: `${APIV1}/api/news/mindex`,
        articleDetail: `${APIV1}/articleDetail`,
    },
};

