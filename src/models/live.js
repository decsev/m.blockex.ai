import * as liveServices from '../services/live';

export default {
    namespace: 'live',
    state: {
        lists: [],
    },
    reducers: {
        updataList(state, action) {
            const { payload } = action;
            const listArr = state.lists.concat(payload.list);
            return {
                ...state,
                lists: listArr,
            };
        },
    },
    effects: {
        *getList(action, { call, put, select }) {
            // const { timestamp } = action.payload;
            console.log('7', action.payload);
            const { data } = yield call(liveServices.getList, action.payload);

            if (data.code === 200) {
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
                    payload: {},
                });
            });
        },
    },
};
