const Mock = require('mockjs');


const article = {
    'GET /api/list': (req, res) => {
        let data = null;
        data = Mock.mock({
            'articleList|10': [
                {
                    'id|+1': 1,
                    img: '@image(200x100)',
                    title: '@cword(5,15)',
                    des: '@csentence(10,25)',
                },
            ],

        });

        res.json({
            code: 0,
            msg: null,
            payload: {
                lists: data.articleList,
            },
        });
    },
    'GET /api/detail': (req, res) => {
        let data = null;
        data = Mock.mock({
            articleDetail: {
                'id|1-100': 100,
                title: '@cword(5,15)',
                content: '@csentence(50,200)',
            },

        });

        res.json({
            code: 0,
            msg: null,
            payload: {
                data: data.articleDetail,
            },
        });
    },
};

export default article;
