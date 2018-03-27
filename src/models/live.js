import * as liveServices from '../services/live';

export default {
    namespace: 'live',
    state: {
        lists: [],
        liveState: {
            newNum: null,
            hasMoreOld: true,
        },
    },
    reducers: {
        updateListPush(state, action) {
            const { payload } = action;
            const listArr = state.lists.concat(payload.list);
            return {
                ...state,
                lists: listArr,
            };
        },
        updateListUnshift(state, action) {
            const { payload } = action;
            const listArr = payload.list.concat(state.lists);
            return {
                ...state,
                lists: listArr,
                ...payload.liveState,
            };
        },
        updateState(state, { payload }) {
            console.log(852, payload);
            return {
                ...state,
                ...payload,
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
                if (action.payload.last === 1) {
                    if (payload.list.length > 0) {
                        yield put({ type: 'updateListUnshift', payload }); // 添加到开头
                        const { liveState } = yield select(state => state.live);
                        liveState.newNum = payload.list.length + 1;
                        yield put({ type: 'updateState', liveState });
                    } else {
                        const { liveState } = yield select(state => state.live);
                        liveState.newNum = 0;
                        yield put({ type: 'updateState', liveState });
                    }
                } else if (action.payload.last !== 1) {
                    if (payload.list.length > 0) {
                        yield put({ type: 'updateListPush', payload }); // 追加到尾部
                        const { liveState } = yield select(state => state.live);
                        // liveState.hasMoreOld = false;
                        // yield put({ type: 'updateState', liveState });
                    } else {
                        const { liveState } = yield select(state => state.live);
                        liveState.hasMoreOld = false;
                        yield put({ type: 'updateState', liveState });
                    }
                }
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
