const Mock = require('mockjs');


const menu = {
    'GET /api/menu': (req, res) => {
        let data = null;
        data = Mock.mock({
            'menuList|10': [
                {
                    'id|+1': 1,
                    name: '@cword(2)',
                    route: '/article/',
                },
            ],

        });

        res.json({
            code: 0,
            msg: null,
            payload: {
                data: data.menuList,
            },
        });
    },
};

export default menu;
