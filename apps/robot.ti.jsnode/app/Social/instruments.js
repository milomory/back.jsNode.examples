const env = require('../env').getENV()

exports.getInstrumentList = async (profile, limit) => {
    const method = 'get'
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + profile + '/instrument?limit=' + limit + '&sessionId=' + env.TINKOFF_SESSIONID
    return await require('../service').investApiRequest(method, url, null, null)
}

exports.getActionsByInstrument = async (profile, limit, instrument) => {
    const method = 'get'
    const url = 'https://www.tinkoff.ru/api/invest-gw/social/v1/profile/' + profile + '/operation/instrument/' + instrument.ticker + '/' + instrument.classCode + '?limit=' + limit + '&sessionId=' + env.TINKOFF_SESSIONID
    return await require('../service').investApiRequest(method, url, null, null)
}
