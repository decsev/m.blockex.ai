import { request, config, Func } from '../utils';

const { api } = config;
/**
 * mock: /api/list  api.liveList
 * @export
 * @returns
 */
export function getList(opt) {
    const searchKey = Func.obj2search(opt);
    const ts = searchKey === '' ? '' : `?${searchKey}`;
    return request(api.liveList + ts, {
        method: 'GET',
    });
}

export function getDetail() {
    return request('/api/detail', {
        method: 'GET',
    });
}


/**
 * 看多看空
 * @export
 * @returns
 */
export function judge(opt) {
    const searchKey = Func.obj2search(opt);
    const ts = searchKey === '' ? '' : `?${searchKey}`;
    return request(api.judge + ts, {
        method: 'GET',
    });
}
