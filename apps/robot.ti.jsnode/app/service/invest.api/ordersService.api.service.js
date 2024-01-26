const { v4: uuidv4 } = require('uuid');

exports.getOrders = async (data) => {
    return await require('./api').getApiService("OrdersService/GetOrders", data)
}

exports.postOrder = async (data) => {

        return await require('./api').getApiService("OrdersService/PostOrder", {
            figi:               data.lots.figi,
            quantity:           "1",
            // Decimal(bid["price"]["units"]) + Decimal(bid["price"]["nano"])
            // 1e9 - это перевод в нормальные цифры, 1е9 == 1000000000
            price: {
                "currency":     "rub",
                //"units":        Math.trunc(data.lots.cost),
                "units":        "1",
                //"nano":         (data.lots.cost - Math.trunc(data.lots.cost)) * 1e9,
                //"nano":         data.direction === 1 ? 500000000 : 0,
                "nano":         0
            },
            direction:          data.direction,
            accountId:          data.account.id,
            orderType:          data.orderType,
            orderId:            Date.now(),
            // orderId:            uuidv4(),
            instrumentId:       data.lots.uid
        })

}

