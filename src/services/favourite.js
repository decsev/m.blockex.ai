import qs from 'qs';
import { request, config, Func } from '../utils';

const { api } = config;


/**
 * 加收藏
 * @export
 * @returns
 */

export async function addFavourite(params) {
    console.log('params', params);
    return request({
        url: api.addFavourite,
        method: 'post',
        data: qs.stringify(params),
    });
}


/**
 * 取消收藏
 * @export
 * @returns
 */

export async function delFavourite(params) {
    return request({
        url: api.delFavourite,
        method: 'post',
        data: qs.stringify(params),
    });
}

/**
 * 获取文章列表
 * @export
 * @returns
 */

export async function getArticleList(params) {
    const searchKey = Func.obj2query(params);
    const ts = searchKey === '' ? '' : `?${searchKey}`;
    return request({
        url: api.articleList + ts,
        method: 'get',
    });
}


/**
 * 获取文章详情
 * @export
 * @returns
 */
export async function getArticleDetail(params) {
    const searchKey = Func.obj2query(params);
    const ts = searchKey === '' ? '' : `?${searchKey}`;
    return request({
        url: api.articleDetail + ts,
        method: 'get',
    });
}


/**
 * 获取文章分类
 * @export
 * @returns
 */
export async function getArticleCategory() {
    return request({
        url: api.articleCategory,
        method: 'get',
    });
}
