import * as articleServices from '../services/article';

export default {
    namespace: 'articleDetail',
    state: {
        cat_name: '',
        cat_title: '',
        category_id: '',
        content: '',
        create_time: '',
        description: '',
        id: '',
        nickname: '',
        source: '',
        title: '',
        update_time: '',
        view: '',
    },
    reducers: {
        updataDetail(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *getDetail({ payload }, { call, put, select }) {
            const notice = window.$(document).dialog({
                type: 'notice',
                infoIcon: './static/img/icon/loading.gif',
                infoText: '正在加载中',
                overlayShow: false,
            });
            const data = yield call(articleServices.getArticleDetail, payload);
            notice.close();
            if (data.success) {
                const datas = data.payload.data;
                yield put({ type: 'updataDetail', payload: datas });
            } else {
                throw data;
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const reg = /^\/articleDetail\/(\d*)$/g;
                if (reg.test(pathname)) {
                    const articleId = pathname.replace(reg, '$1');
                    dispatch({
                        type: 'getDetail',
                        payload: {
                            id: articleId,
                        },
                    });
                }
            });
        },
    },
};
