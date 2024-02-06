const { v4: uuidv4 } = require('uuid');

exports.getOrders = async (data) => {
    if (data) {
        return await require('./api').getApiService("OrdersService/GetOrders", data)
    }
}

const order = async (data) => {
    if (data) {
        return await require('./api').getApiService("OrdersService/PostOrder", {
            figi:               data.lot.figi,
            quantity:           "1",
            // Decimal(bid["price"]["units"]) + Decimal(bid["price"]["nano"])
            // 1e9 - это перевод в нормальные цифры, 1е9 == 1000000000
            price: {
                "currency":     "rub",
                //"units":        Math.trunc(data.lot.cost), // averagePrice
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
}

const activationPostOrder = async (data) => {
    if (data) {

        const Order = await order(data)
        console.log("OrdersService module - Order")
        console.log(Order)

        const saveTrade = await require("../db/trades.service").saveTrade(data)
        console.log("OrdersService module - saveTrade")
        console.log(saveTrade)

        if (Order) {
            const updateTrade = await require("../db/trades.service").updateTrade(saveTrade, Order)
            console.log("OrdersService module - updateTrade")
            console.log(updateTrade)

            const updateTradeStatus = await require("../db/trades.service").updateTradeStatus(saveTrade, "true")
            console.log("OrdersService module - updateTradeStatus")
            console.log(updateTradeStatus)
        }
    }
}

const priceTransform = (units, nano) => {
    if (units && nano) {
        let concatenatedPrice = '' + units + nano;
        let concatenatedPriceSlice = parseInt(concatenatedPrice).toString().slice(0, 9).toString()
        if (concatenatedPriceSlice.length < 9) {
            let postfixNumber = "0".repeat(9 - concatenatedPriceSlice.length)
            concatenatedPriceSlice = "" + concatenatedPriceSlice.toString() + postfixNumber.toString()
        }
        return parseInt(concatenatedPriceSlice).toString()
    }
}

const lastLotPriceTransform = (number, length) => {
    if (number && length) {
        let parts = number.toString().split('.');
        let concatenatedLastLotPrice = priceTransform(parts[0], parts[1])
        let concatenatedLastLotPriceLength = concatenatedLastLotPrice.length
        let postfixNumber = length - concatenatedLastLotPriceLength
        let zeroString = "0".repeat(postfixNumber);
        return parseInt("" + concatenatedLastLotPrice + zeroString)
    }
}


exports.postOrder = async (data) => {
    console.log("OrdersService module - Что мы собираемся делать с этим?")
    console.log("OrdersService module - data")
    console.log(data)
    console.log("OrdersService module - data.direction")
    console.log(data.direction)

    // Достаем Стакан по фиги и инструменту
    const OrderBook = await require("./marketDataService.api.service")
        .getOrderBook({figi: data.lot.figi, depth: 1, instrumentId: data.lot.uid})
    console.log("OrdersService module - OrderBook - Достаем Стакан по фиги и инструменту")
    console.log(OrderBook)

    console.log("OrdersService module - OrderBook.asks.length - смотрим есть ли что в стакане. Нужно для проверки существования стакана")
    console.log(OrderBook?.asks?.length)

    if (OrderBook?.asks?.length !== 0) {
        // Достаем последнюю ТРУШНУЮ запись из базы и смотрим InstrumentId
        const lastTradeByInstrumentId = await require("../db/trades.service").getLastTradeByInstrumentId(data.lot.uid)
        console.log("OrdersService module - lastTradeByInstrumentId - Достаем последнюю ТРУШНУЮ запись из базы и смотрим InstrumentId")

        if (lastTradeByInstrumentId) { // Если запись в базе есть
            console.log("OrdersService module - lastTradeByInstrumentId - В базе имеется запись о InstrumentId")
            console.log(lastTradeByInstrumentId)

            console.log("OrdersService module - lastTradeByInstrumentId.direction")
            console.log(lastTradeByInstrumentId.direction)

            if (lastTradeByInstrumentId.direction === "1") {
                console.log("OrdersService module - Пытаемся продать, т.к. уже есть ТРУШНАЯ запись о покупке (Дирекшион 1), но смотрим выросла ли цена")

                const OrderBookPriceUnits = OrderBook?.lastPrice?.units // OrderBook units //lastPrice & closePrice
                console.log("OrdersService module - OrderBook Price Units")
                console.log(OrderBookPriceUnits)

                const OrderBookPriceNano = OrderBook?.lastPrice?.nano // OrderBook nano //lastPrice & closePrice
                console.log("OrdersService module - OrderBook Price Nano")
                console.log(OrderBookPriceNano)

                const findTradeByInstrumentIdPriceUnits = lastTradeByInstrumentId?.price_units
                console.log("OrdersService module - find TradeByInstrumentId PriceUnits");
                console.log(findTradeByInstrumentIdPriceUnits); // My units

                const findTradeByInstrumentIdPriceNano = lastTradeByInstrumentId?.price_nano // My nano
                console.log("OrdersService module - findTradeByInstrumentIdPriceNano")
                console.log(findTradeByInstrumentIdPriceNano) // My nano

                // concatenated & slice -> 0-8
                const concatenatedOrderBookPrice = priceTransform(OrderBookPriceUnits, OrderBookPriceNano)
                console.log("OrdersService module - concatenatedOrderBookPrice (slice -> 0-9)")
                console.log(concatenatedOrderBookPrice) // OrderBook Price
                // concatenated & slice -> 0-8
                const concatenatedTradesPrice = priceTransform(findTradeByInstrumentIdPriceUnits, findTradeByInstrumentIdPriceNano)
                console.log("OrdersService module - concatenatedTradesPrice (slice -> 0-9)")
                console.log(concatenatedTradesPrice) // My Price

                const concatenatedLastSocialLotPrice = lastLotPriceTransform(data.lot.averagePrice, concatenatedTradesPrice.toString().length)
                console.log("OrdersService module - concatenatedLastSocialLotPrice")
                console.log(concatenatedLastSocialLotPrice) // Last Lot Price

                console.log("OrdersService module - Проверяем data.direction")
                console.log(data.direction)
                if (data.direction === "2") {
                    if (concatenatedOrderBookPrice > concatenatedTradesPrice) {
                        console.log("OrdersService module - Запускаем активашку, цена в стакане выше закупочной.")
                        await activationPostOrder(data) // Надо проверить, что в дате тоже приходит СЕЛЛ
                    } else {
                        console.log("OrdersService module - Цена в стакане ниже закупочной. Может быть когда-нибудь буду создавать лимитную заявку...")
                    }
                }

            } else { // lastTradeByInstrumentId.direction === "2"
                console.log("OrdersService module - Покупаем, т.к. уже есть запись о продаже")
                console.log("OrdersService module - Т.к. последняя запись со статусом ТРУ имеет Дирекшион 2, то надо покупать!")

                console.log("OrdersService module - Проверяем data.direction")
                console.log(data.direction)
                if (data.direction === "1") {
                    console.log("OrdersService module - Запускаем активашку")
                    await activationPostOrder(data) // Надо проверить, что в дате тоже приходит БУЙ
                }
            }

        } else { // Если записи в базе нет
            console.log("OrdersService module - В базе записи нет")
            // Если в базе записи нет, то делаем как делаем, но по-хорошему бы только покупать.
            // ...
            console.log("OrdersService module - Пока только покупаем")

            console.log("OrdersService module - Проверяем data.direction")
            console.log(data.direction)
            if (data.direction === "1") {
                console.log("OrdersService module - Запускаем активашку")
                await activationPostOrder(data) // Надо проверить, что в дате тоже приходит БУЙ
            }
        }
    }

    return 0

}

