exports.getOrderBook = async (data) => {
    return await require('./api').getApiService("MarketDataService/GetOrderBook", data)
}
