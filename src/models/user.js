import { routerRedux } from 'dva/router';
import * as userServices from '../services/user';
import { config, Func } from '../utils';


const { pageSize, defaultCategoryId } = config;
const { getQueryString } = Func;

export default {
    namespace: 'user',
    state: {
        reg: {

        },
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *reg({ payload }, { call, put, select }) {
            const params = payload;
            const data = yield call(userServices.register, params);
            if (data.success) {
                // yield put({ type: 'setMenus', payload: { menus: menuArr } });
                return data;
            } else {
                throw data;
            }
        },
        *login({ payload }, { call, put, select }) {
            const params = payload;
            const data = yield call(userServices.login, params);
            if (data.success) {
                // yield put({ type: 'setMenus', payload: { menus: menuArr } });
                return data;
            } else {
                throw data;
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const reg = /^\/register$/g;
                if (reg.test(pathname)) {

                }
            });
        },
    },
};
