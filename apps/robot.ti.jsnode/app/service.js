const axios = require('axios');
const env = require('./env').getENV()

// import {getENV} from './env'
//
// getENV()

exports.apiRequest = async (method, url, data) => {
    return axios({
        method,
        url,
        headers: {
            'accept': 'application/json',
            'Authorization':`Bearer ${env.INVEST_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data
    })
}
