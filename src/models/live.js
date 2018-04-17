import * as liveServices from '../services/live';
import { config, Func } from '../utils';

const { getObjIndexInArrary } = Func;
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
            let notice = null;
            if (lists.length === 0 && payload.timestamp === undefined) {
                // 显示loading
                notice = window.$(document).dialog({
                    type: 'notice',
                    infoIcon: './static/img/icon/loading.gif',
                    infoText: '正在加载中',
                    overlayShow: false,
                });
            }
            // debugger;
            const data = yield call(liveServices.getList, payload);
            // 隐藏loading
            notice && notice.close();
            if (data.success) {
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
        *judge({ payload }, { call, put, select }) {
            const { id, isMore } = payload;
            const liveLists = yield select(state => state.live.lists);
            const _index = getObjIndexInArrary(liveLists, 'id', id);
            let data = null;
            if (!!isMore) {
                // 看多
                if (!!liveLists[_index].addedMore) {
                    // 看多减1
                    const params = {
                        doc_id: id,
                        bull: 'good',
                        dir: 'down',
                    };
                    data = yield call(liveServices.judge, params);
                } else {
                    // 看多加1
                    // 看多减1
                    const params = {
                        doc_id: id,
                        bull: 'good',
                        dir: 'up',
                    };
                    data = yield call(liveServices.judge, params);
                }
                if (data.success) {
                    const paramsAssign = {};
                    if (!!liveLists[_index].addedMore) {
                        paramsAssign.good = --liveLists[_index].good;
                    } else {
                        paramsAssign.good = ++liveLists[_index].good;
                    }
                    paramsAssign.addedMore = !liveLists[_index].addedMore;
                    liveLists[_index] = Object.assign(liveLists[_index], paramsAssign);
                    yield put({
                        type: 'updateState',
                        payload: liveLists,
                    });
                } else {
                    throw data;
                }
            } else {
                // 看空
                if (!!liveLists[_index].addedEmpty) {
                    // 看空减1
                    const params = {
                        doc_id: id,
                        bull: 'bad',
                        dir: 'down',
                    };
                    data = yield call(liveServices.judge, params);
                } else {
                    // 看空加1
                    // 看空减1
                    const params = {
                        doc_id: id,
                        bull: 'bad',
                        dir: 'up',
                    };
                    data = yield call(liveServices.judge, params);
                }
                if (data.success) {
                    if (!!liveLists[_index].addedEmpty) {
                        liveLists[_index].bad = --liveLists[_index].bad;
                    } else {
                        liveLists[_index].bad = ++liveLists[_index].bad;
                    }
                    liveLists[_index].addedEmpty = !liveLists[_index].addedEmpty;
                    yield put({
                        type: 'updateState',
                        payload: liveLists,
                    });
                } else {
                    throw data;
                }
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/live') {
                    dispatch({
                        type: 'getList',
                        payload: {
                            size: pageSize,
                        },
                    });
                }
            });
        },
    },
};
