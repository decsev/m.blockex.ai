import { request, config, Func } from '../utils';

const { api } = config;
/**
 * mock: /api/list  api.articleList
 * @export
 * @returns
 */
export function getList(opt) {
    // console.log('opt', opt);
    // const ts = opt.timestamp ? `?timestamp=${opt.timestamp}` : '';
    const searchKey = Func.obj2search(opt);
    const ts = searchKey === '' ? '' : `?${searchKey}`;
    console.log('ts:', ts);
    return request(api.articleList + ts, {
        method: 'GET',
    });
}

export function getDetail() {
    return request('/api/detail', {
        method: 'GET',
    });
}
