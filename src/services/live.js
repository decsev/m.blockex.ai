import { request, config } from '../utils';

const { api } = config;

/**
 * mock: /api/list  api.articleList
 * @export
 * @returns
 */
export function getList() {
    return request(api.articleList, {
        method: 'GET',
    });
}

export function getDetail() {
    return request('/api/detail', {
        method: 'GET',
    });
}
