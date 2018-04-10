import { request, config, Func } from '../utils';

const { api } = config;

/**
 * mock: /api/list  api.articleList
 * 获取文章列表
 * @export
 * @returns
 */
export function getArticleList(opt) {
    const searchKey = Func.obj2search(opt);
    const ts = searchKey === '' ? '' : `?${searchKey}`;
    return request(api.articleList + ts, {
        method: 'GET',
    });
}

/**
 * 获取文章详情
 * @export
 * @returns
 */
export function getArticleDetail(opt) {
    const searchKey = Func.obj2search(opt);
    const ts = searchKey === '' ? '' : `?${searchKey}`;
    return request(api.articleDetail + ts, {
        method: 'GET',
    });
}

/**
 * 获取文章分类
 * @export
 * @returns
 */
export function getArticleCategory() {
    return request(api.articleCategory, {
        method: 'GET',
    });
}
