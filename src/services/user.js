import qs from 'qs';
import { request, config, Func } from '../utils';


const { api } = config;
/**
 * 注册
 * @export
 * @returns
 */

export async function register(params) {
    return request({
        url: api.register,
        method: 'post',
        data: qs.stringify(params),
    });
}

/**
 * 登陆
 * @export
 * @returns
 */

export async function login(params) {
    return request({
        url: api.login,
        method: 'post',
        data: qs.stringify(params),
    });
}
