import { resolveParam, request, config } from '../utils';

const { pageSize } = config;

export function getCmsData({ url }) {
    return request(url);
}

export function getExitProjectData(values) {
    return request('url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: values,
    });
}

