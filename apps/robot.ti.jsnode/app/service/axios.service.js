const axios = require('axios');
const env = require('../env').getENV()

exports.request = async (method, url, headers, data) => {

    // Удалить
    if (!headers) {
        headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${env.INVEST_TOKEN}`,
            'Content-Type': 'application/json'
        }
    }
    //----


    try {
        const res = await axios({method, url, headers, data})

        if (res) {
            return res
        } else {
            console.log("axios says: res is empty")
            return
        }
    } catch (error) {
        if (error.response) {
            if (error.response.statusCode === 400) {
                // Обработка ошибки 400 здесь
                console.error('Ошибка 400:', error.response.data);
                return;
            } else {
                // Обработка других ошибок здесь
                console.error('Ошибка:', error.response.data);
                return;
            }
        } else {
            console.error('Ошибка:', error);
            return;
        }
    }
}
