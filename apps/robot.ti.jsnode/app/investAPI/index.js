//import {getENV} from '../env'


//const    env = require('../env').getENV()

// enum DIRECTION {
//     BUY = '1',
//     SELL = '2'
// }

class fff {
    f = 0
    d = 0
    constructor() {
        this.f=3
        this.d=5
    }
    async x(x,y) {
        this.f=x
        this.d=y
        return this.f+this.d
    }
}

exports.run = async () => {

    console.log(new fff().d)

    console.log(await new fff().x(1,2))

    const res = await require('./UsersService/getAccounts').get()
    //const accountId = '2002465405'; //main
    //const accountId = '2054310628'; // 4
    //const currency = 'RUB'
    //const res = await require('./OperationsService/getPortfolio').get(accountId, currency)

    //const res = await require('./OperationsService/getPositions').get(accountId)
    //const res = await require('./StopOrdersService/getStopOrders').get(accountId)
    //const res = await require('./OrdersService/getOrders').get(accountId)

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
    //const res = await require('./OrdersService/postOrder').post(figi, quantity, price, direction, accountId, orderType, orderId, instrumentId)
    console.log(res)
}
