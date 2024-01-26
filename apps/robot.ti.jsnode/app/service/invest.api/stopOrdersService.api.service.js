
exports.getStopOrders = async (data) => {
    return await require('./api').getApiService("StopOrdersService/GetStopOrders", data)
}



