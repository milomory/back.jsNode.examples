
exports.sharesBy = async (data) => {
    return await require('./api').getApiService("InstrumentsService/ShareBy", data)
}

exports.shares = async (data) => {
    return await require('./api').getApiService("InstrumentsService/Share", data)
}

exports.findInstrument = async (data) => {
    return await require('./api').getApiService("InstrumentsService/FindInstrument", data)
}

exports.currencies = async (data) => {
    return await require('./api').getApiService("InstrumentsService/Currencies", data)
}

