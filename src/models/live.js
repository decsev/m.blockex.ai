import * as liveServices from '../services/live';
import { config } from '../utils';


const { pageSize } = config;
export default {
    namespace: 'live',
    state: {
        lists: [],
        ajaxState: {
            newNum: null,
            hasMoreOld: true,
        },
    },
    reducers: {
        updateListPush(state, { payload }) {
            const listArr = state.lists.concat(payload);
            return {
                ...state,
                lists: listArr,
            };
        },
        updateListUnshift(state, {  payload }) {
            const listArr = payload.concat(state.lists);
            return {
                ...state,
                lists: listArr,
            };
        },
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *getList({ payload }, { call, put, select }) {
            const { ajaxState, lists } = yield select(state => state.live);
            if (lists.length > 0 && payload.timestamp === undefined) {
                return;
            }
            // debugger;
            const { data } = yield call(liveServices.getList, payload);
            if (data.code === 0) {
                const list = data.payload.data;

                if (payload.last === 1) {
                    yield put({ type: 'updateListUnshift', payload: list }); // 添加到开头

                    ajaxState.newNum = list.length;
                    yield put({ type: 'updateState', ajaxState });
                    return Number(list.length);
                } else if (payload.last !== 1) {
                    if (list.length > 0) {
                        yield put({ type: 'updateListPush', payload: list }); // 追加到尾部
                    } else {
                        ajaxState.hasMoreOld = false;
                        yield put({ type: 'updateState', ajaxState });
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
                    payload: {
                        size: pageSize,
                    },
                });
            });
        },
    },
};
