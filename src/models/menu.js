import { config } from '../utils';
import { getMenu } from '../services/menu';

export default {
    namespace: 'menu',
    state: {
        menus: null,
    },
    reducers: {
        setMenus(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *getMenu(action, { call, put, select }) {
            const { menus } = yield select(state => state.menu);
            if (menus !== null)  return;
            const { data } = yield call(getMenu);
            if (data.code === 0) {
                const payload = { menus: data.payload.data };
                yield put({ type: 'setMenus', payload });
            } else {
                throw data;
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname) {
                    dispatch({
                        type: 'getMenu',
                        payload: {},
                    });
                }
            });
        },
    },
};
