//Перенести в отдельный модуль профилей, мб потом автоматизируется еще
const profiles = {
    mil: '1c704c46-5bf1-4277-a223-5a57fb8e176a',
    DedMoroz: 'b9c00eb6-dd76-40d1-acc0-3046c076ecf2',
    Gladyshva: 'da512a0c-fa0f-4313-9840-b1753eaf809a',
    extreme911: 'fc449bfb-3075-43df-938c-98a22606d51a',
    Heraclide: '30e4077e-855e-4488-b600-7ceb9bc5161a'
};



const profile = profiles.mil // Заменить профиль

// Файл с логикой гадо из папки социал в куда-то где не здесь
exports.psid = async (psid) => {

    console.log("runLogic")
    const orderList = await require('../social/instruments').getInstrumentList({
        psid,
        profile,
        limit: 100
    })
    //console.log(orderList)
    // ===============================
    // Выбираем только сегодняшние оредеры
    // ===============================
    const toDay = new Date().toISOString().slice(0, 10)
    console.log("Сегодня: " + toDay) // "2023-12-22"
    for (let [i, order] of orderList.entries()) {
        if ((order.statistics.maxTradeDateTime.slice(0, 10)) === (toDay) && // Заменить на ТУДЭЙ
            (order.type === 'share') && (order.currency === 'rub')) {
            console.log("Что-то есть")
            console.log(order)
            // ===============================
            // Собираем свой И-тый ордер
            // ===============================
            order = {
                type:           orderList[i].type,
                ticker:         orderList[i].ticker,
                classCode:      orderList[i].classCode,
                currency:       orderList[i].currency
            }
            // ===============================
            // Выбираем по И-тому ордеру всего его акшины
            // ===============================
            console.log("Выбираем по И-тому ордеру всего его акшины")
            const actions = await require('../social/instruments').getActionsByInstrument({
                psid,
                profile,
                limit: 1,
                order})
            // ===============================
            // Выводим все акшины по И-тому одеру, но т.к. у нас лимит стоит 1,
            // то мы получаем сразу последний
            // ===============================
            console.log(actions)
            // ===============================
            // Забираем только последний акшин по И-тому одеру,
            // возможно в этом не будет смысла, но оставлю на подумать попозже
            // ===============================
            const lastAction = {
                tradeDateTime:  actions[0].tradeDateTime,
                action:         actions[0].action,
                averagePrice:   actions[0].averagePrice
            }
            // ===============================
            // Начинаем работать с ИНВЕСТ-АПИ
            // ===============================
            // ===============================
            // Достаем ИД аккаунта (последнего), созданного для этого всего
            // ===============================
            const accounts = await require('../invest.api/usersService/getAccounts').get({})
            const account = accounts.accounts[accounts.accounts.length-1]
            const accountId = account.id
            const currency = 'RUB'
            // ===============================
            // Пихаем этот ИД и карренси, чтобы потом посмотреть, что там внутри вообще есть рублевого
            // ===============================
            const portfolio = await require('../invest.api/operationsService/getPortfolio').get({accountId, currency})
            // ===============================
            // Достаем количество свободного бабла в рублях
            // ===============================
            const totalAmountCurrencies = {
                currency: portfolio.totalAmountCurrencies.currency,
                units: portfolio.totalAmountCurrencies.units
            }
            // ===============================
            // Достаем количество общего бабла всего, что есть с активами в рублях
            // ===============================
            const totalAmountPortfolio = {
                currency: portfolio.totalAmountPortfolio.currency,
                units: portfolio.totalAmountPortfolio.units
            }
            // ===============================
            // Достаем позиции
            // ===============================
            const positions = portfolio.positions
            // ===============================
            // Смотрим (Сервисная инфа, можно закомментить, но не удалять)
            // ===============================
            console.log([
                //account,
                //portfolio,
                totalAmountCurrencies,
                totalAmountPortfolio,
                positions
            ])
            // ===============================
            // Условие, если покупка
            // ===============================
            if (lastAction.action === 'buy') {
                // Проверка на то, что у меня есть на что покупать
                // и на то, что у меня еще нет такого лота
                console.log("Система говорит => Пробуем взять: (ticker: " + order.ticker + ", classCode: " + order.classCode + ")")
                const idType = 'INSTRUMENT_ID_TYPE_TICKER'
                const sharesBy = await require('../invest.api/instrumentsService/sharesBy').get({
                    idType,
                    classCode: order.classCode,
                    ticker: order.ticker
                })
                const figi = sharesBy.instrument.figi
                //console.log(figi)

                let isPosition = false
                for (let [i, position] of positions.entries()) {
                    //console.log(position.figi)
                    if (figi === position.figi) {
                        console.log("Гоблин говорит => Такая пиченька у меня уже есть: " + figi)
                        isPosition = true
                    } else {
                        console.log("[Сравнение с " + i + "-й позицией] Гоблин говорит => Неодинаковые пиченьки (" + figi + " и " + position.figi + "), надо брать!")
                    }
                }
                console.log ('Гоблин говорит => Пиченька стоит: ' + lastAction.averagePrice)
                console.log ('Гоблин говорит => Золота в казне: ' + totalAmountCurrencies.units)
                if (lastAction.averagePrice <= totalAmountCurrencies.units) {
                    console.log ('Система говорит => Золота хватит!')
                    if (isPosition === false) {
                        console.log("Система говорит => Все, решено, берем!")
                        // ===============================
                        // Покупка
                        // ===============================
                        const quantity = "1"
                        const price = {
                            "nano": 1,
                            "units": "36"
                        };
                        const direction = "1" // DIRECTION.BUY // Направление операции. 1 - buy, 2 - sell
                        const orderType = "1";
                        const orderId = Date.now();
                        const instrumentId = ""; //"1c69e020-f3b1-455c-affa-45f8b8049234"; //figi = "BBG004S683W7";
                        // const postOrder = await require('./investAPI/OrdersService/postOrder')
                        //     .post(figi, quantity, price, direction, accountId, orderType, orderId, instrumentId)
                        // console.log (postOrder)
                        // console.log ('Система говорит => Покуплено, ура!')
                    }
                } else {
                    console.log ('Гоблин говорит => Нужно больше золота!')
                }
            }
            // ===============================
            // Условие, если продажа
            // ===============================
            if (lastAction.action === 'sell') {
                // Проверка на то, что у меня есть хотя бы одна такая пиченька
                console.log("Пробуем продать: (ticker: " + order.ticker + ", classCode: " + order.classCode + ")")
                const idType = 'INSTRUMENT_ID_TYPE_TICKER'
                const sharesBy = await require('../invest.api/instrumentsService/sharesBy')
                    .get({
                        idType,
                        classCode: order.classCode,
                        ticker: order.ticker
                    })
                const figi = sharesBy.instrument.figi
                //console.log(figi)
                let isPosition = false
                for (let [i, position] of positions.entries()) {
                    //console.log(position.figi)
                    if (figi === position.figi) {
                        console.log("Гоблин говорит => Такая пиченька у меня уже есть: " + figi)
                        isPosition = true
                    } else {
                        console.log("[Сравнение с " + i + "-й позицией] Гоблин говорит => Неодинаковые пиченьки (" + figi + " и " + position.figi + "), еще подержу!")
                    }
                }
                if (isPosition === true) {
                    console.log("Система говорит => Все, решено, продаем!")
                    // ===============================
                    // Продажа
                    // ===============================
                    const quantity = "1"
                    const price = {
                        "nano": 1,
                        "units": "36"
                    };
                    const direction = "2" // DIRECTION.BUY // Направление операции. 1 - buy, 2 - sell
                    const orderType = "2";
                    const orderId = Date.now();
                    const instrumentId = ""; //"1c69e020-f3b1-455c-affa-45f8b8049234"; //figi = "BBG004S683W7";
                    // const postOrder = await require('./investAPI/OrdersService/postOrder')
                    //     .post(figi, quantity, price, direction, accountId, orderType, orderId, instrumentId)
                    // console.log (postOrder)
                    // console.log ('Система говорит => Попродано, ура!')
                    console.log ('Гоблин говорит => Это же все шо нажито, непосильно...!')
                } else {
                    console.log("Гоблин говорит => Нечего продавать, остальное подержу!")
                }
            }
        }
    }

}





// ===============================
// Условие, если ее 'sell'
// ===============================
if (lastSocialLot.action === 'sell') {
    message = 'Ее продали, значит и мне она не нужна! Продаем: ' + lastSocialLot.ticker
    console.log (message);

    // ===============================
    // Функция продажи
    // DIRECTION.BUY or DIRECTION.SELL
    // Направление операции: 1-buy, 2-sell,
    // ===============================

    message = 'Система говорит => Продано, ура!' + lastSocialLot.ticker
    console.log (message);
} else { // lastSocialLot.action != 'sell' => 'buy'
    message = 'Ее купили, но у меня она уже есть! Пусть еще побудет: ' + lastSocialLot.ticker
    console.log (message);
}


// ===============================
// Условие, если 'buy'
// ===============================
if (lastSocialLot.action === 'buy') {
    message = "[Сравнение чьей-то " + i + "-й позиции с моей " + j + "-й позицией] " +
        "Гоблин говорит => Так-так-так! Ее купили, значит в ней может быть что-то ценное. " +
        "Давай посмотрим, а хватит ли нам денег в казне для покупки: " + lastSocialLot.ticker
    console.log (message);

    // ===============================
    // Проверка на то, что у меня есть на что покупать
    // ===============================
    if (lastSocialLot.cost <= amountByPortfolio.totalAmountCurrencies.units) {
        message = "[Сравнение чьей-то " + j + "-й позиции с моей " + j + "-й позицией] " +
            "Гоблин говорит => Вот моя печенька: " + myLot.ticker + ", " +
            "она не такая, как эта: " + lastSocialLot.ticker + ". " +
            "Они неодинаковые, следовательно надо брать! " +
            "У меня есть: " + amountByPortfolio.totalAmountCurrencies.units + " рублей, " +
            "печенька стоит: " + lastSocialLot.cost + " рублей! Золота хватит, берем!";
        console.log (message);

        // ===============================
        // Функция покупки
        // DIRECTION.BUY or DIRECTION.SELL
        // Направление операции: 1-buy, 2-sell,
        // ===============================

        message ="Система говорит => Покуплено, ура!"
        console.log (message);
    } else {
        message = "[Сравнение чьей-то " + i + "-й позиции с моей " + j + "-й позицией] " +
            "Гоблин говорит => Вот " + j + "-ая моя печенька: " + myLot.figi + ", " +
            "она не такая, как эта: " + lastSocialLot.figi + ". " +
            "Они неодинаковые, надо брать! " +
            "У меня есть: " + amountByPortfolio.totalAmountCurrencies.units + " рублей, " +
            "печенька стоит: " + lastSocialLot.cost + " рублей! Нужно больше золота!"
        console.log (message);
    }
} else {
    // lastSocialLot.action != 'buy' => 'sell'
    message = "[Сравнение чьей-то " + i + "-й позиции с моей " + j + "-й позицией] " +
        "Гоблин говорит => Так-так-так! " +
        "Ее продали, значит в ней нет ничего ценного. " +
        "Значит и мне не нужна" + lastSocialLot.ticker
    console.log (message);
}
