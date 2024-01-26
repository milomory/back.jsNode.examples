
exports.getInstrumentList = async (data) => {
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
    console.log(data)
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/instrument?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('./axios.service').request('get', url, headers, null)
        return res.data.payload.items
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}

exports.getActionsByInstrument = async (data) => {
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/operation/instrument/' + data.order.ticker + '/' + data.order.classCode + '?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('./axios.service').request('get', url, headers, null)
        return res.data.payload.items
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}
