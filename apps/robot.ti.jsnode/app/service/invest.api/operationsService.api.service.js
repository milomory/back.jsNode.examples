
exports.getPortfolio = async (data) => {
    return await require('./api').getApiService("OperationsService/GetPortfolio", data)
}

exports.getPositions = async (data) => {
    return await require('./api').getApiService("OperationsService/GetPositions", data)
}

