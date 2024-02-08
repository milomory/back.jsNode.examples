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

const priceTransform = async (units, nano) => {

    let str = '' + units + nano
    // console.log("str: " + str)

    // Убираем начальные нули с помощью регулярного выражения
    let trimmedStr = str.replace(/^0+/, '');
    // console.log("trimmedStr: " + trimmedStr)

    // Вычисляем, сколько нулей нужно добавить в конец строки
    let zerosNeeded = 9 - trimmedStr.length;
    // console.log("zerosNeeded: " + zerosNeeded)

    if (zerosNeeded > 0) {
        // Добавляем нули в конец строки, если это необходимо
        trimmedStr += '0'.repeat(zerosNeeded);
    }

    // console.log("returning... trimmedStrSlice: " + trimmedStr.slice(0, 9))

    return trimmedStr.slice(0, 9)

}

const lastLotPriceTransform = (number, length) => {
    if (number && length) {
        let parts = number.toString().split('.');
        let concatenatedLastLotPrice = priceTransform(parts[0], parts[1])
        let concatenatedLastLotPriceLength = concatenatedLastLotPrice?.length
        let postfixNumber = length - concatenatedLastLotPriceLength
        let zeroString = "0".repeat(postfixNumber);
        return "" + concatenatedLastLotPrice + zeroString
    }
}


exports.postOrder = async (data) => {
    // console.log("OrdersService module - Что мы собираемся делать с этим?")
    // console.log("OrdersService module - data")
    // console.log(data)
    // console.log("OrdersService module - data.direction")
    // console.log(data.direction)

    // Достаем Стакан по фиги и инструменту
    const OrderBook = await require("./marketDataService.api.service")
        .getOrderBook({figi: data.lot.figi, depth: 1, instrumentId: data.lot.uid})
    console.log("OrdersService module - OrderBook - Достаем Стакан по фиги и инструменту")
    // console.log(OrderBook)

    console.log("ORDERS-SERVICE API SERVICE: OrderBook.asks.length - смотрим есть ли что в стакане. Нужно для проверки существования стакана")
    // console.log("ORDERS-SERVICE API SERVICE: OrderBook?.bids?.length")
    // console.log(OrderBook?.bids?.length)
    // console.log("ORDERS-SERVICE API SERVICE: OrderBook?.asks?.length")
    // console.log(OrderBook?.asks?.length)

    if (OrderBook?.bids?.length !== 0 || OrderBook?.asks?.length !== 0) {
        // Достаем последнюю ТРУШНУЮ запись из базы и смотрим InstrumentId
        const lastTradeByInstrumentId = await require("../db/trades.service").getLastTradeByInstrumentId(data.lot.uid)
        console.log("ORDERS-SERVICE API SERVICE: lastTradeByInstrumentId - Достаем последнюю ТРУШНУЮ запись из базы и смотрим InstrumentId")

        if (lastTradeByInstrumentId) { // Если запись в базе есть
            console.log("ORDERS-SERVICE API SERVICE: lastTradeByInstrumentId - В базе имеется запись о InstrumentId")
            // console.log(lastTradeByInstrumentId)

            // console.log("ORDERS-SERVICE API SERVICE: lastTradeByInstrumentId.direction")
            // console.log(lastTradeByInstrumentId.direction)

            if (lastTradeByInstrumentId.direction === "1") {
                console.log("ORDERS-SERVICE API SERVICE: Пытаемся продать, т.к. уже есть ТРУШНАЯ запись о покупке (Дирекшион 1), но смотрим выросла ли цена")

                const OrderBookPriceUnits = OrderBook?.bids[0]?.price?.units // OrderBook units
                // console.log("ORDERS-SERVICE API SERVICE: OrderBook Price Units")
                // console.log(OrderBookPriceUnits)

                const OrderBookPriceNano = OrderBook?.bids[0]?.price?.nano // OrderBook nano
                // console.log("ORDERS-SERVICE API SERVICE: OrderBook Price Nano")
                // console.log(OrderBookPriceNano)

                const findTradeByInstrumentIdPriceUnits = lastTradeByInstrumentId?.price_units
                // console.log("ORDERS-SERVICE API SERVICE: find TradeByInstrumentId PriceUnits");
                // console.log(findTradeByInstrumentIdPriceUnits); // My units

                const findTradeByInstrumentIdPriceNano = lastTradeByInstrumentId?.price_nano // My nano
                // console.log("ORDERS-SERVICE API SERVICE: findTradeByInstrumentIdPriceNano")
                // console.log(findTradeByInstrumentIdPriceNano) // My nano

                // concatenated & slice -> 0-9
                const concatenatedOrderBookPrice = await priceTransform(OrderBookPriceUnits, OrderBookPriceNano)
                console.log("ORDERS-SERVICE API SERVICE: concatenatedOrderBookPrice (slice -> 0-9)")
                console.log("( " + concatenatedOrderBookPrice + " )") // OrderBook Price
                // concatenated & slice -> 0-9
                const concatenatedTradesPrice = await priceTransform(findTradeByInstrumentIdPriceUnits, findTradeByInstrumentIdPriceNano)
                console.log("ORDERS-SERVICE API SERVICE: concatenatedTradesPrice (slice -> 0-9)")
                console.log("( " + concatenatedTradesPrice + " )") // My Price

                // const concatenatedLastSocialLotPrice = lastLotPriceTransform(data.lot.averagePrice, concatenatedTradesPrice.toString().length)
                // console.log("OrdersService module - concatenatedLastSocialLotPrice")
                // console.log(concatenatedLastSocialLotPrice) // Last Lot Price

                console.log("ORDERS-SERVICE API SERVICE: Проверяем data.direction")
                console.log(data.direction)
                if (data.direction === "2") {
                    if (concatenatedOrderBookPrice > concatenatedTradesPrice) {
                        console.log("ORDERS-SERVICE API SERVICE: Запускаем активашку, цена в стакане выше закупочной.")
                        await activationPostOrder(data) // Надо проверить, что в дате тоже приходит СЕЛЛ
                        return 1
                    } else {
                        console.log("ORDERS-SERVICE API SERVICE: Цена в стакане ниже закупочной. Может быть когда-нибудь буду создавать лимитную заявку...")
                        return 0
                    }
                }

            } else { // lastTradeByInstrumentId.direction === "2"
                console.log("ORDERS-SERVICE API SERVICE: Покупаем, т.к. уже есть запись о продаже")
                console.log("ORDERS-SERVICE API SERVICE: Т.к. последняя запись со статусом ТРУ имеет Дирекшион 2, то надо покупать!")

                console.log("ORDERS-SERVICE API SERVICE: Проверяем data.direction")
                console.log(data.direction)
                if (data.direction === "1") {
                    console.log("ORDERS-SERVICE API SERVICE: Запускаем активашку")
                    await activationPostOrder(data) // Надо проверить, что в дате тоже приходит БУЙ
                    return 1
                } else {
                    console.log("ORDERS-SERVICE API SERVICE: В эту ветку я не должен никогда приходить...")
                    return 0
                }
            }

        } else { // Если записи в базе нет
            console.log("ORDERS-SERVICE API SERVICE: В базе записи нет")
            // Если в базе записи нет, то делаем как делаем, но по-хорошему бы только покупать.
            // ...
            console.log("ORDERS-SERVICE API SERVICE: Пока только покупаем")

            console.log("ORDERS-SERVICE API SERVICE: Проверяем data.direction")
            console.log(data.direction)
            if (data.direction === "1") {
                console.log("ORDERS-SERVICE API SERVICE: Запускаем активашку")
                await activationPostOrder(data) // Надо проверить, что в дате тоже приходит БУЙ
                return 1
            } else { // data.direction === "0"
                console.log("ORDERS-SERVICE API SERVICE: Давай временно продавать даже в минус, если нет записи в базе...")
                await activationPostOrder(data) // Надо проверить, что в дате тоже приходит БУЙ
                return 1
            }
        }
    }
}

