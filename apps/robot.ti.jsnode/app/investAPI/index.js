
exports.run = async () => {

    const res = []

    res[0] = await require('./UsersService/getAccounts').get()

    const accountId = '2002465405';     // 1 (main)
    //const accountId = '2054310628';   // 4 (empty)
    const currency = 'RUB'

    res[1] = await require('./OperationsService/getPortfolio').get(accountId, currency)
    res[2] = await require('./OperationsService/getPositions').get(accountId)
    res[3] = await require('./StopOrdersService/getStopOrders').get(accountId)
    res[4] = await require('./OrdersService/getOrders').get(accountId)

    const figi = "BBG004S683W7";
    const quantity = "1";
    const price = {
        "nano": 1,
        "units": "36"
    };
    //const direction = DIRECTION.SELL // Направление операции. 1 - buy, 2 - sell
    const orderType = "2";
    const orderId = Date.now();
    const instrumentId = ""; //"1c69e020-f3b1-455c-affa-45f8b8049234"; //figi = "BBG004S683W7";
    //res[5] = await require('./OrdersService/postOrder').post(figi, quantity, price, direction, accountId, orderType, orderId, instrumentId)
    console.log(res)
}
