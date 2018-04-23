import fetchJsonp from 'fetch-jsonp';

export async function requestJsonp(url, param) {
    const opts = {};
    Object.assign(opts, param);
    const response = await fetchJsonp(url, opts);

    const data = await response.json();
    const ret = {
        data,
        headers: {},
    };
    return ret;
}
