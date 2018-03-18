import queryString from 'query-string';
import { config, trackPageView } from '../utils';
import shareImg from '../assets/img/share-logo.png';
import * as forumDetailService from '../services/forumdetail';
import * as userOperationService from '../services/userOperation';
import * as collectService from '../services/collect';

export default {
    namespace: 'articleDetail',
    state: {

    },
    reducers: {

    },
    effects: {
        /**
         * 删除收藏
         *
         * @param {any} action
         * @param {any} { call }
         * @returns
         */
        *removeFavoriteItem(action, { call, put }) {
            const { favId } = action.payload;
            const res = yield call(collectService.removeFavorite, { favId });
            yield put({
                type: 'saveFav',
                payload: {
                    favFlag: false,
                },
            });
            return res;
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                console.log('detail', pathname);
            });
        },
    },
};
