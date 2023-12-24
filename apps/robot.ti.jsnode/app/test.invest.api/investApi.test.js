
exports.run = async () => {

    const res = []

    res[0] = await require('../invest.api/usersService/getAccounts').get({})

    //const accountId = '2002465405';     // 1 (main)
    const accountId = '2054310628';   // 4 (empty)
    const currency = 'RUB'
    res[1] = await require('../invest.api/operationsService/getPortfolio').get({accountId, currency})
    res[2] = await require('../invest.api/operationsService/getPositions').get({accountId})
    res[3] = await require('../invest.api/stopOrdersService/getStopOrders').get({accountId})
    res[4] = await require('../invest.api/ordersService/getOrders').get({accountId})
    res[5] = await require('../invest.api/instrumentsService/shares').get({
        "instrumentStatus": "INSTRUMENT_STATUS_ALL"
    })
    const idType = "INSTRUMENT_ID_TYPE_TICKER";
    const classCode = "TQBR";
    const id = "NSVZ";
    res[5] = await require('../invest.api/instrumentsService/sharesBy').get({
        idType,
        classCode,
        id
    })
    res[6] = await require('../invest.api/instrumentsService/currencies').get({
        "instrumentStatus": "INSTRUMENT_STATUS_ALL"
    })
    res[7] = await require('../invest.api/instrumentsService/findInstrument').get({
        "query": "BBG002BCQK67",
        "instrumentKind": "INSTRUMENT_TYPE_SHARE",
        "apiTradeAvailableFlag": true
    })
    const figi = "BBG004S683W7";
    const quantity = "1";
    const price = {
        "nano": 1,
        "units": "36"
    };
    const direction = "DIRECTION.BUY"       // Направление операции. 1 - buy, 2 - sell
    //const accountId = '2002465405';       // 1 (main)
    //const accountId = '2054310628';       // 4 (empty)
    const orderType = "2";
    const orderId = Date.now();
    const instrumentId = "1c69e020-f3b1-455c-affa-45f8b8049234";
    // res[8] = await require('./OrdersService/postOrder').post({
    //     figi, quantity, price, direction, accountId, orderType, orderId, instrumentId
    // })
    console.log(res)
}
