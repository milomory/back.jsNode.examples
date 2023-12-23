const axios = require('axios');
const env = require('./env').getENV()

exports.request = async (method, url, headers, data) => {
    if ((!headers) && (headers == null && headers == undefined)) {
        headers = {
            'accept': 'application/json',
            'Authorization':`Bearer ${env.INVEST_TOKEN}`,
            'Content-Type': 'application/json'
        }
    }
    return axios({method, url, headers, data})
}
