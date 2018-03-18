import * as forumService from '../services/article';

export default {
    namespace: 'article',
    state: {

    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    effects: {
        *reload(action, { put }) {
            const { payload } = action;
            if (payload.isPageChange) {
                yield put({ type: 'initState' });
            }
            yield put({ type: 'getForumInfo', payload });
            yield put({ type: 'getForumList', payload });
            yield put({ type: 'getTopArticle', payload });
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname.indexOf('/forum/') === 0 || 1) {

                }
            });
        },
    },
};
