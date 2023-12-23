
exports.getInstrumentList = async (psid, profile, limit) => {
    const method = 'get'
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + profile + '/instrument?limit=' + limit + '&sessionId=' + psid
    const res = await require('../service').request(method, url, null, null)
    return res.data.payload.items
}

exports.getActionsByInstrument = async (psid, profile, limit, order) => {
    const method = 'get'
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + profile + '/operation/instrument/' + order.ticker + '/' + order.classCode + '?limit=' + limit + '&sessionId=' + psid
    const res = await require('../service').request(method, url, null, null)
    return res.data.payload.items
}
