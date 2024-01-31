const env = require('../../env').getENV()

exports.getApiService = async (apiService, data) => {

    try {
        const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${env.INVEST_TOKEN}`,
        'Content-Type': 'application/json'
        }
        const response = await require('../axios.service').request(
            'post',
            'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.' + apiService,
            headers,
            data);
        if (response?.data) {
            // console.log("api.js says: response.data is it")
            // console.log(response.data)
            return response.data
        } else {
            console.log("api.js says: response.data is EMPTY, and look it this response...")
        }
    } catch (error) {
        if (error.response) {
            if (error.response.statusCode === 400) {
                // Обработка ошибки 400 здесь
                console.error('Ошибка 400:', error.response.data);
                return error.response.data;
            } else {
                // Обработка других ошибок здесь
                console.error('Ошибка:', error.response.data);
                return error.response.data;
            }
        } else {
            // Обработка ошибок без статуса ответа здесь
            console.error('Ошибка:', error);
            return error.response.data;
        }
    }
}
