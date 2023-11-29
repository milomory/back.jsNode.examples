const env = require('../env').getENV()

//require('./UsersService/getAccounts').get(env)

//const accountId = '2002465405'; //main
const accountId = '2054310628'; // 4
const currency = 'RUB'
//require('./OperationsService/getPortfolio').get(env, accountId, currency)
//require('./OperationsService/getPositions').get(env, accountId)
//require('./StopOrdersService/getStopOrders').get(env, accountId)
//require('./OrdersService/getOrders').get(env, accountId)

const figi = "BBG004S683W7";
const quantity = "1";
const price = {
    "nano": 1,
    "units": "36"
};
const direction = "1" // Направление операции. 1 - buy, 2 - sell
const orderType = "2";
const orderId = Date.now();
const instrumentId = "1c69e020-f3b1-455c-affa-45f8b8049234";
require('./OrdersService/postOrder').post(env, figi, quantity, price, direction, accountId, orderType, orderId, instrumentId)

