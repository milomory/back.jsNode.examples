
exports.getInstrumentList = async (data) => {
    const method = 'get'
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/instrument?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('../service/axios.service').request(method, url, null, null)
        return res.data.payload.items
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}

exports.getActionsByInstrument = async (data) => {
    const method = 'get'
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/operation/instrument/' + data.order.ticker + '/' + data.order.classCode + '?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('../service/axios.service').request(method, url, null, null)
        return res.data.payload.items
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}
