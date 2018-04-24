/* global window */
import axios from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { Toast } from 'antd-mobile';
import { CORS, loginPages } from './config';

const fetch = (options) => {
    const {
        method = 'get',
        data,
        fetchType,
    } = options;
    const { url } = options;

    const cloneData = lodash.cloneDeep(data);

    const Token = sessionStorage.getItem('_token');
    const RegNumber = sessionStorage.getItem('_RegNumber');
    const headers = { Token };

    if (fetchType === 'JSONP') {
        return new Promise((resolve, reject) => {
            jsonp(url, {
                param: `${qs.stringify(data)}&callback`,
                name: `jsonp_${new Date().getTime()}`,
                timeout: 4000,
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve({ statusText: 'OK', status: 200, data: result });
            });
        });
    }

    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url, {
                params: cloneData,
                headers,
            });
        case 'delete':
            return axios.delete(url, {
                data: cloneData,
            });
        case 'post':
            return axios.post(url, cloneData, {
                headers,
            });
        case 'put':
            return axios.put(url, cloneData);
        case 'patch':
            return axios.patch(url, cloneData);
        default:
            return axios(options);
    }
};

export default function request(options) {
    if (options.url && options.url.indexOf('//') > -1) {
        const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`;
        if (window.location.origin !== origin) {
            if (CORS && CORS.indexOf(origin) > -1) {
                options.fetchType = 'CORS';
            } else {
                options.fetchType = 'JSONP';
            }
        }
    }

    return fetch(options).then((response) => {
        const { statusText, status } = response;
        if (response.data.code === 9) { // 没有权限跳转登陆
            window.location.assign(loginPages + window.location.href);
        }
        if (response.data.code === 0) {
            return {
                success: true,
                message: statusText,
                statusCode: status,
                ...response.data,
            };
        } else {
            throw response.data;
        }
    }).catch((error) => {
        debugger;
        const { response } = error;
        let msg;
        let statusCode;
        if (response && response instanceof Object) {
            const { data, statusText } = response;
            statusCode = response.status;
            msg = data.message || statusText;
        } else {
            statusCode = 600;
            msg = error.msg || '网络错误';
        }
        return { success: false, statusCode, msg };
    });
}
