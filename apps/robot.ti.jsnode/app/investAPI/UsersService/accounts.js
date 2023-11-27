const axios = require('axios');

exports.getAccounts = async (env, headers) => {
    return axios({
        method: 'post',
        url: 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.UsersService/GetAccounts',
        headers: headers,
        data: '{}'
    })
}