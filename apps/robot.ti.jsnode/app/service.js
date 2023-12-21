const axios = require('axios');
const env = require('./env').getENV()

exports.investApiRequest = async (method, url, headers, data) => {
    if ((!headers) && (headers == null && headers == undefined)) {
        headers = {
            'accept': 'application/json',
            'Authorization':`Bearer ${env.INVEST_TOKEN}`,
            'Content-Type': 'application/json'
        }
    }
    return axios({method, url, headers, data})
}

exports.authRequest = async (method, url, headers, data) => {
    return axios({method, url, headers, data})
}

exports.sessionIdRequest = async (method, url, headers, data) => {
    return axios({method, url, headers, data})
}
