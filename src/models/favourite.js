import * as favouriteServices from '../services/favourite';

export default {
    namespace: 'favourite',
    state: {
        favourites: ['21873'], // 收藏id集
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
        *ctrFavourite({ payload }, { call, put, select }) {
            const data = yield call(favouriteServices.addFavourite, payload);
            console.log(data, 666);
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
                console.log('favourite');
            });
        },
    },
};
