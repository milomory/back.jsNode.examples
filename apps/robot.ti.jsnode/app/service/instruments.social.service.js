
const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}

exports.getInstrumentList = async (data) => {
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/instrument?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('./axios.service').request('get', url, headers, null)
        if (res?.data?.payload?.message) {
            console.log("INSTRUMENT SOCIAL SERVICE: Error message: " + res?.data?.payload?.message)
        }
        // функция filter возвращает новый массив, включающий те объекты, которые прошли проверку
        return res?.data?.payload?.items?.filter(item => item?.statistics?.maxTradeDateTime?.slice(0, 10) === data.currentDate);
    } catch (error) {
        console.error('INSTRUMENT SOCIAL SERVICE: Error response:', error);
        console.log("INSTRUMENT SOCIAL SERVICE: message: " + error?.data?.payload?.message)
        throw error
    }
}

exports.getActionsByInstrument = async (data) => {
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + data.profileUid + '/operation/instrument/' + data.order.ticker + '/' + data.order.classCode + '?limit=' + data.limit + '&sessionId=' + data.psid
    try {
        const res = await require('./axios.service').request('get', url, headers, null)
        if (res?.data?.payload?.message) {
            console.log("INSTRUMENT SOCIAL SERVICE: Error message: " + res?.data?.payload?.message)
        }
        return res?.data?.payload?.items
    } catch (error) {
        console.error('INSTRUMENT SOCIAL SERVICE: Error response:', error);
        console.log("INSTRUMENT SOCIAL SERVICE: message: " + error?.data?.payload?.message)
        throw error
    }
}
