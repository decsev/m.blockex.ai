import { routerRedux } from 'dva/router';
import * as articleServices from '../services/article';
import { config, Func } from '../utils';


const { pageSize, defaultCategoryId } = config;
const { getQueryString } = Func;

export default {
    namespace: 'article',
    state: {
        menus: null,
        lists: [],
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
        setMenus(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        updataLists(state, { payload }) {
            state[`lists_${payload.currentCatId}`] = state[`lists_${payload.currentCatId}`] || [];
            if (payload[`p_${payload.currentCatId}`] > 1) {
                payload[`lists_${payload.currentCatId}`] = state[`lists_${payload.currentCatId}`].concat(payload[`lists_${payload.currentCatId}`]);
            }
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *getArticleCategory({ payload }, { call, put, select }) {
            const { menus } = yield select(state => state.article);
            const recordedUrl = null;

            if (menus !== null) {
                return; // 有menus数据的时候不请求
            }
            const data = yield call(articleServices.getArticleCategory);
            if (data.success) {
                const menuArr = data.payload.data;
                yield put({ type: 'setMenus', payload: { menus: menuArr } });
            } else {
                throw data;
            }
        },
        *getList({ payload }, { call, put, select }) {
            const articleObj = yield select(state => state.article);
            let d = null;
            if (articleObj[`lists_${payload.cat}`] === undefined || articleObj[`lists_${payload.cat}`].length === 0 || payload.p === 1) {
                // 没有该分类的数据对象或没有数据，获取第一页数据 || 下拉刷新时
                let notice = null;
                let noData = null;
                if (payload.p === undefined) {
                    noData = true;
                    // 显示loading
                    notice = window.$(document).dialog({
                        type: 'notice',
                        infoIcon: './static/img/icon/loading.gif',
                        infoText: '正在加载中',
                    });
                }
                payload.p = 1;
                d = yield call(articleServices.getArticleList, payload);
                notice && notice.close();
                if (d.success) {
                    const data = d;
                    if (data.payload.data.length === 0 && noData) {
                        window.$(document).dialog({
                            type: 'notice',
                            infoText: '该分类暂无数据',
                            autoClose: 3000,
                            overlayShow: false,
                        });
                    }
                    if (data.payload.data.length > 0 && payload.p === 1) {
                        const mparams = {};
                        mparams[`hasMoreOld_${payload.cat}`] = true;
                        yield put({ type: 'updateState', payload: mparams });
                    }
                } else {
                    throw d;
                }
            } else {
                // 存在数据的时候，追加到数组里，获取p+1
                payload.p = articleObj[`p_${payload.cat}`] + 1;
                d = yield call(articleServices.getArticleList, payload);
                const data = d;
                if (data.payload.data.length === 0) {
                    const mparams = {};
                    mparams[`hasMoreOld_${payload.cat}`] = false;
                    yield put({ type: 'updateState', payload: mparams });
                }
            }
            if (d.success) {
                const params = {};
                params[`lists_${payload.cat}`] = d.payload.data;
                params[`p_${payload.cat}`] = payload.p;
                params.currentCatId = payload.cat;
                yield put({
                    type: 'updataLists',
                    payload: params,
                });
                return d;
            } else {
                throw d;
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const reg = /^\/article$/g;
                if (reg.test(pathname)) {
                    // 请求分类
                    dispatch({
                        type: 'getArticleCategory',
                        payload: {},
                    });
                    // 请求例表
                    const acId = getQueryString('id');
                    dispatch({
                        type: 'getList',
                        payload: {
                            cat: acId,
                            size: pageSize,
                        },
                    });
                }
            });
        },
    },
};
