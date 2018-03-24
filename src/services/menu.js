import request from '../utils/request';

export function getMenu() {
    return request('/api/menu', {
        method: 'GET',
    });
}
