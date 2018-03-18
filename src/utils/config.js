const h5Host = '/';
const pcHost = '/';
const isDebug = false;
const APIV1 = '/api/v1';

module.exports = {
    name: 'phx',
    h5Host,
    pcHost,
    isDebug,
    pageSize: 15,
    tips: {
        pageEnd: '已经到底啦~',
    },
    api: {
        articleList: `${APIV1}/articleList`,
        articleDetail: `${APIV1}/articleDetail`,
    },
    menu: [
        {
            id: '1',
            icon: 'compass',
            name: '标题1',
            route: '/article/',
        }, {
            id: '2',
            icon: 'compass',
            name: '标题2',
            route: '/article/',
        }, {
            id: '3',
            icon: 'compass',
            name: '标题3',
            route: '/article/',
        }, {
            id: '4',
            icon: 'compass',
            name: '标题4',
            route: '/article/',
        }, {
            id: '5',
            icon: 'compass',
            name: '标题5',
            route: '/article/',
        }, {
            id: '6',
            icon: 'compass',
            name: '标题6',
            route: '/article/',
        }, {
            id: '7',
            icon: 'compass',
            name: '标题7',
            route: '/article/',
        }, {
            id: '8',
            icon: 'compass',
            name: '标题8',
            route: '/article/',
        }, {
            id: '9',
            icon: 'compass',
            name: '标题9',
            route: '/article/',
        }, {
            id: '10',
            icon: 'compass',
            name: '标题10',
            route: '/article/',
        },
    ],
};

