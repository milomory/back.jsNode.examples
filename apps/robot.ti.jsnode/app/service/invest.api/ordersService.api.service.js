const { v4: uuidv4 } = require('uuid');

exports.getOrders = async (data) => {
    return await require('./api').getApiService("OrdersService/GetOrders", data)
}

const order = async (data) => {
    return await require('./api').getApiService("OrdersService/PostOrder", {
        figi:               data.lot.figi,
        quantity:           "1",
        // Decimal(bid["price"]["units"]) + Decimal(bid["price"]["nano"])
        // 1e9 - это перевод в нормальные цифры, 1е9 == 1000000000
        price: {
            "currency":     "rub",
            //"units":        Math.trunc(data.lot.cost),
            "units":        "1",
            //"nano":         (data.lot.cost - Math.trunc(data.lot.cost)) * 1e9,
            //"nano":         data.direction === 1 ? 500000000 : 0,
            "nano":         0
        },
        direction:          data.direction,
        accountId:          data.account.id,
        orderType:          data.orderType,
        orderId:            Date.now(),
        // orderId:            uuidv4(),
        instrumentId:       data.lot.uid
    })
}

const activationPostOrder = async (data) => {
    const Order = await order(data)
    console.log("Order")
    console.log(Order)

    const saveTrade = await require("../db/trades.service").saveTrade(data)
    console.log("saveTrade")
    console.log(saveTrade)

    if (Order) {
        const updateTrade = await require("../db/trades.service").updateTrade(saveTrade, Order)
        console.log("updateTrade")
        console.log(updateTrade)

        const updateTradeStatus = await require("../db/trades.service").updateTradeStatus(saveTrade, "true")
        console.log("updateTradeStatus")
        console.log(updateTradeStatus)
    }
}


exports.postOrder = async (data) => {
    console.log("Что мы собираемся делать с этим?")
    console.log("data")
    console.log(data)
    console.log("data.direction")
    console.log(data.direction)

    // Достаем Стакан по фиги и инструменту
    const OrderBook = await require("./marketDataService.api.service").getOrderBook({
        figi: data.figi,
        depth: 1,
        instrumentId: data.instrumentId
    })
    console.log("Достаем Стакан по фиги и инструменту, OrderBook.asks.length - смотрим есть ли что в стакане")
    console.log(OrderBook.asks.length)

    // Достаем последнюю ТРУШНУЮ запись из базы и смотрим InstrumentId
    const lastTradeByInstrumentId = await require("../db/trades.service").getLastTradeByInstrumentId("bba7a33f-48a8-4788-8469-3a9f5d668e0a")
    console.log("Достаем последнюю ТРУШНУЮ запись из базы и смотрим InstrumentId - lastTradeByInstrumentId")
    console.log(lastTradeByInstrumentId)

    if (lastTradeByInstrumentId && OrderBook?.asks.length !== 0) { //заменить на 0 - заменил!

        console.log("lastTradeByInstrumentId.direction")
        console.log(lastTradeByInstrumentId.direction)

        if (lastTradeByInstrumentId.direction === "1") {
            console.log("Пытаемся продать, т.к. уже есть ТРУШНАЯ запись о покупке (Дирекшион 1), но смотрим выросла ли цена")

            console.log("OrderBook")
            console.log(OrderBook)

            const OrderBookLastPriceUnits = OrderBook.lastPrice.units
            console.log("OrderBookLastPriceUnits")
            console.log(OrderBookLastPriceUnits)

            // Смотрим длину последней цены из ОрдерБука
            const OrderBookLastPriceUnitsLength = OrderBookLastPriceUnits.toString().replace('.', '').replace('-', '').length;
            console.log("OrderBookLastPriceUnitsLength");
            console.log(OrderBookLastPriceUnitsLength);

            // Обрезаем нашу цену последней покупки до длины из Ордербука
            let findTradeByInstrumentIdPriceUnitsSlice = lastTradeByInstrumentId.price_units.toString().slice(0, OrderBookLastPriceUnitsLength);
            console.log("findTradeByInstrumentIdPriceUnitsSlice");
            console.log(findTradeByInstrumentIdPriceUnitsSlice);

            if (findTradeByInstrumentIdPriceUnitsSlice > OrderBookLastPriceUnits) {
                console.log("Запускаем активашеу")
                await activationPostOrder(data) // Надо проверить, что в дате тоже приходит СЕЛЛ
            }
        } else { // lastTradeByInstrumentId.direction === "2"
            console.log("Покупаем, т.к. уже есть запись о продаже")
            console.log("Т.к. последняя запись со статусом ТРУ имеет Дирекшион 2, то надо покупать!")
            // Надо проверить, что в дате тоже приходит БУй

            console.log("Запускаем активашеу")
            await activationPostOrder(data) // Надо проверить, что в дате тоже приходит БУЙ
        }

    } else {
        console.log("Только Покупаем")
        // Если в базе записи нет, то делаем как делаем, но по-хорошему бы только покупать.
    }

    return 0

}

