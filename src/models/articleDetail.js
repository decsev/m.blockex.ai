import * as articleServices from '../services/article';

export default {
    namespace: 'articleDetail',
    state: {
        data: {},
    },
    reducers: {
        updataDetail(state, action) {
            const { payload } = action.payload;
            return {
                ...state,
                data: payload.data,
            };
        },
    },
    effects: {
        *getDetail(action, { call, put, select }) {
            const { pageIndex } = action.payload;
            const { data } = yield call(articleServices.getDetail, {});
            if (data.code === 0) {
                const payload = data;
                yield put({ type: 'updataDetail', payload });
            } else {
                throw data;
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                dispatch({
                    type: 'getDetail',
                    payload: {
                        pageIndex: 1,
                    },
                });
            });
        },
    },
};
