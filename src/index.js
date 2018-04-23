import '@babel/polyfill';
import dva from 'dva';
import { Toast } from 'antd-mobile';
import './index.css';
// 1. Initialize
const app = dva({
    onError(e, dispatch) {
        Toast.info(e.msg || e.message || '末知错误', 2, null, false);
    },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
