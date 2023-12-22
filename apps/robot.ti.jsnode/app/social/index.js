// Перенести в отдельный модуль профилей, мб потом автоматизируется еще
const profiles = {
    mil: '1c704c46-5bf1-4277-a223-5a57fb8e176a',
    DedMoroz: 'b9c00eb6-dd76-40d1-acc0-3046c076ecf2',
    Gladyshva: 'da512a0c-fa0f-4313-9840-b1753eaf809a',
    extreme911: 'fc449bfb-3075-43df-938c-98a22606d51a',
    Heraclide: '30e4077e-855e-4488-b600-7ceb9bc5161a'
};

const profile = profiles.Heraclide

// Файл с логикой гадо из папки социал в куда-то где не здесь
exports.runLogic = async (psid) => {

    const orderList = await require('./instruments').getInstrumentList(psid, profile, 100)

    // ===============================
    // Выбираем только егодняшние оредеры
    // ===============================
    for (let [i, order] of orderList.entries()) {
        if ((order.statistics.maxTradeDateTime.slice(0, 10)) === (new Date().toISOString().slice(0, 10)) &&
            (order.type == 'share') && (order.currency == 'rub')) {
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
            const actions = await require('./instruments').getActionsByInstrument(psid, profile, 1, order)
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
            accounts = await require('../investAPI/UsersService/getAccounts').get()
            const account = accounts.accounts[accounts.accounts.length-1]
            const accountId = account.id
            const currency = 'RUB'
            // ===============================
            // Пихаем этот ИД и карренси, чтобы потом посмотреть, что там внутри вообще есть рублевого
            // ===============================
            portfolio = await require('../investAPI/OperationsService/getPortfolio').get(accountId, currency)
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
            if (lastAction.action == 'buy') {
                // Проверка на то, что у меня есть на что покупать
                // и на то, что у меня еще нет такого лота
                console.log("Система говорит => Пробуем взять: (ticker: " + order.ticker + ", classCode: " + order.classCode + ")")

                const sharesBy = await require('../investAPI/InstrumentsService/sharesBy').get('INSTRUMENT_ID_TYPE_TICKER', order.classCode, order.ticker)
                const finedFigi = sharesBy.instrument.figi
                //console.log(figi)

                let isPosition = false
                for (let [i, position] of positions.entries()) {
                    //console.log(position.figi)
                    if (finedFigi == position.figi) {
                        console.log("Гоблин говорит => Такая пиченька у меня уже есть: " + finedFigi)
                        isPosition = true
                    } else {
                        console.log("[Сравнение с " + i + "-й позицией] Гоблин говорит => Неодинаковые пиченьки (" + finedFigi + " и " + position.figi + "), надо брать!")
                    }
                }
                console.log ('Гоблин говорит => Пиченька стоит: ' + lastAction.averagePrice)
                console.log ('Гоблин говорит => Золота в казне: ' + totalAmountCurrencies.units)
                if (lastAction.averagePrice <= totalAmountCurrencies.units) {
                    console.log ('Система говорит => Золота хватит!')
                    if (isPosition == false) {
                        console.log("Система говорит => Все, решено, берем!")
                        // ===============================
                        // Покупка
                        // ===============================
                        // ...
                        console.log ('Система говорит => Покуплено, ура!')
                    }
                } else {
                    console.log ('Гоблин говорит => Нужно больше золота!')
                }
            }
            // ===============================
            // Условие, если продажа
            // ===============================
            if (lastAction.action == 'sell') {
                // Проверка на то, что у меня есть хотя бы одна такая пиченька
                console.log("Пробуем продать: (ticker: " + order.ticker + ", classCode: " + order.classCode + ")")
                const sharesBy = await require('../investAPI/InstrumentsService/sharesBy').get('INSTRUMENT_ID_TYPE_TICKER', order.classCode, order.ticker)
                const finedFigi = sharesBy.instrument.figi
                //console.log(figi)

                let isPosition = false
                for (let [i, position] of positions.entries()) {
                    //console.log(position.figi)
                    if (finedFigi == position.figi) {
                        console.log("Гоблин говорит => Такая пиченька у меня уже есть: " + finedFigi)
                        isPosition = true
                    } else {
                        console.log("[Сравнение с " + i + "-й позицией] Гоблин говорит => Неодинаковые пиченьки (" + finedFigi + " и " + position.figi + "), еще подержу!")
                    }
                }
                if (isPosition == true) {
                    console.log("Система говорит => Все, решено, продаем!")
                    // ===============================
                    // Продажа
                    // ===============================
                    // ...
                    console.log ('Система говорит => Попродано, ура!')
                    console.log ('Гоблин говорит => Это же все шо нажито, непосильно...!')
                }
            }
        }
    }

}

