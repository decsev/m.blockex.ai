import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import shortid from 'shortid';
import IndexPage from './routes/IndexPage';
import Layout from './routes/layout';
import App from './routes/test';

function RouterConfig({ history, app }) {
    const myRoute = [{
        path: '/article/:channel',
        models: () => [
            import('./models/article'),
            import('./models/menu'),
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
        models: () => [],
        component: () => import('./routes/user'),
    }, {
        path: '/login',
        models: () => [],
        component: () => import('./routes/user/login'),
    }, {
        path: '/register',
        models: () => [],
        component: () => import('./routes/user/register'),
    }];
    const mySingleRoute = [{
        path: '/articleDetail/:articleId',
        models: () => [
            import('./models/articleDetail'),
        ],
        component: () => import('./routes/articleDetail'),
    }];
    return (
        <Router history={history}>
            <Switch>
                {/* <Route path="/" exact component={App} /> */}
                <Redirect exact from="/" to="/article/1?type=news" />
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
