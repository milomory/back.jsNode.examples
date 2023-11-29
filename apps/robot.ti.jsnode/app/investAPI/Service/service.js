const axios = require('axios');
exports.request = async (method, url, headers, data) => {
    return axios({
        method,
        url,
        headers,
        data
    })
}