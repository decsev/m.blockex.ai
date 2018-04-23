import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import shortid from 'shortid';
import { defaultCategoryId } from './utils/config';
import IndexPage from './routes/IndexPage';
import Layout from './routes/layout';
import App from './routes/test';

function RouterConfig({ history, app }) {
    const myRoute = [{
        path: '/article',
        models: () => [
            import('./models/article'),
            // import('./models/menu'),
        ],
        component: () => import('./routes/article'),
    }, {
        path: '/live',
        models: () => [
            import('./models/live'),
        ],
        component: () => import('./routes/live'),
    }, {
        path: '/quotation',
        models: () => [],
        component: () => import('./routes/quotation'),
    }, {
        path: '/user',
        models: () => [
            import('./models/user'),
        ],
        component: () => import('./routes/user'),
    }, {
        path: '/login',
        models: () => [
            import('./models/user'),
        ],
        component: () => import('./routes/user/login'),
    }, {
        path: '/register',
        models: () => [
            import('./models/user'),
        ],
        component: () => import('./routes/user/register'),
    }];
    const mySingleRoute = [
        {
            path: '/articleDetail/:articleId',
            models: () => [
            import('./models/articleDetail'),
            ],
            component: () => import('./routes/articleDetail'),
        },
        {
            path: '/about',
            models: () => [
                import('./models/user'),
            ],
            component: () => import('./routes/user/about'),
        },
        {
            path: '/recommend',
            models: () => [
                import('./models/user'),
            ],
            component: () => import('./routes/user/recommend'),
        },
        {
            path: '/wechat',
            models: () => [
                import('./models/user'),
            ],
            component: () => import('./routes/user/wechat'),
        },
    ];
    const redirectUrl = `/article?type=news&id=${defaultCategoryId}`;
    return (
        <Router history={history}>
            <Switch>
                {/* <Route path="/" exact component={App} /> */}
                <Redirect exact from="/" to={redirectUrl} />
                {
                    mySingleRoute.map(({ path, ...dynamics }) => (
                        <Route
                            key={shortid.generate()}
                            path={path}
                            component={dynamic({
                                app,
                                ...dynamics,
                            })}
                        />
                    ))
                }
                <Layout>
                    {
                        myRoute.map(({ path, ...dynamics }) => (
                            <Route
                                key={shortid.generate()}
                                path={path}
                                component={dynamic({
                                    app,
                                    ...dynamics,
                                })}
                            />
                        ))
                    }
                </Layout>


            </Switch>
        </Router>
    );
}

export default RouterConfig;
