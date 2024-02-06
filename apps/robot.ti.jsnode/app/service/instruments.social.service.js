
const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}


exports.getInstrumentList = async (data) => {
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/instrument?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('./axios.service').request('get', url, headers, null)
        console.log("instrument social service module - message: " + res?.data?.payload?.message)
        return res?.data?.payload?.items
    } catch (error) {
        console.error('instrument social service module - Ошибка при получении данных:', error);
        console.log("instrument social service module - message: " + error?.data?.payload?.message)
        throw error
    }
}

exports.getActionsByInstrument = async (data) => {
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/operation/instrument/' + data.order.ticker + '/' + data.order.classCode + '?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('./axios.service').request('get', url, headers, null)
        console.log("instrument social service module - message: " + res?.data?.payload?.message)
        return res?.data?.payload?.items
    } catch (error) {
        console.error('instrument social service module - Ошибка при получении данных:', error);
        console.log("instrument social service module - message: " + error?.data?.payload?.message)
        throw error
    }
}
