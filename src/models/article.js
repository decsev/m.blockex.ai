import * as articleServices from '../services/article';

export default {
    namespace: 'article',
    state: {
        lists: [],
    },
    reducers: {
        updataList(state, action) {
            const { payload } = action.payload;
            const listArr = state.lists.concat(payload.lists);
            return {
                ...state,
                lists: listArr,
            };
        },
    },
    effects: {
        *getList(action, { call, put, select }) {
            const { pageIndex } = action.payload;
            const { data } = yield call(articleServices.getList, {});
            if (data.code === 0) {
                const payload = data;
                console.log('payload', payload);
                yield put({ type: 'updataList', payload });
            } else {
                throw data;
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                dispatch({
                    type: 'getList',
                    payload: {
                        pageIndex: 1,
                    },
                });
            });
        },
    },
};
