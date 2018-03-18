import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import shortid from 'shortid';
import IndexPage from './routes/IndexPage';
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
        path: '/articleDetail/:articleId',
        models: () => [
            import('./models/article'),
        ],
        component: () => import('./routes/articleDetail'),
    }];
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        {
          myRoute.map(({ path, ...dynamics }) => (
              <Route
                  key={shortid.generate()}
                  exact
                  path={path}
                  component={dynamic({
                      app,
                      ...dynamics,
                  })}
              />
          ))
      }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
