
exports.getSocialInstruments = async (profiles) => {

    const psid = await require('./db/psid.service').getPsid()

    if (profiles && psid) {

        // const currentDate = new Date().toISOString().slice(0, 10)
        const currentDate = "2024-01-31"
        console.log("")
        console.log("Сегодня: " + currentDate)
        console.log("Время: " + new Date().toTimeString())
        console.log("")

        // ===============================
        // Цикл обхода всех профилей
        // ===============================
        for (let [i, profile] of profiles.entries()) {

            if (profile.pid !== 0) {

                // ===============================
                // Задержка
                // ===============================
                await require("./delay.service").delay(5, 10)

                console.log("")
                console.log("Профиль № " + i + " (profile): " + profile.name)
                console.log("")

                // ===============================
                // Тянем весь ордерЛист
                // ===============================
                const orderList = await require('./instruments.social.service').getInstrumentList({
                    psid,
                    profileUid: profile.uid,
                    limit:      100 // очень важный параметр, тиньков будет отбивать
                })

                if (orderList) {
                    console.log('orderList is not empty')
                    // ===============================
                    // Выбираем только сегодняшние оредеры
                    // ===============================
                    for (let [j, order] of orderList.entries()) {

                        if ((order.statistics.maxTradeDateTime.slice(0, 10)) === (currentDate) &&
                            (order.type === 'share') && (order.currency === 'rub')) {

                            // ===============================
                            // Задержка
                            // ===============================
                            await require("./delay.service").delay(5, 10)

                            // ===============================
                            // Выбираем по j-тому ордеру последний его акшин
                            // ===============================
                            const actions = await require('./instruments.social.service').getActionsByInstrument({
                                psid,
                                profileUid: profile.uid,
                                limit: 1,
                                order
                            })

                            if (actions?.length && actions[0].action) {

                                // ===============================
                                // Выводим все акшины по И-тому одеру, но т.к. у нас лимит стоит 1,
                                // то мы получаем сразу последний
                                // ===============================
                                console.log("Смотрим все акшины по И-тому одеру, но т.к. у нас лимит стоит 1, то мы получаем сразу последний. " +
                                    "Выбираем Ticker: " + order.ticker + ". Action: " + actions[0].action + ". Cost: " + actions[0].averagePrice)

                                const sharesBy = await require('./invest.api/instrumentsService.api.service').sharesBy({
                                    //const sharesBy = await require('./invest.api/instrumentsService/sharesBy').getSharesBy({
                                    idType: "INSTRUMENT_ID_TYPE_TICKER",
                                    classCode: order.classCode,
                                    id: order.ticker
                                })

                                if (sharesBy) {
                                    const robot = await require('./robot.service').run({
                                            figi:                   sharesBy.instrument.figi,            // sharesBy
                                            ticker:                 order.ticker,
                                            classCode:              order.classCode,
                                            name:                   sharesBy.instrument.name,
                                            uid:                    sharesBy.instrument.uid,             // Currencies
                                            positionUid:            sharesBy.instrument.positionUid,     // Currencies
                                            tradeDateTime:          actions[0].tradeDateTime,            // '2023-12-25T21:16:06.016+03:00',
                                            action:                 actions[0].action,                   // '2023-12-27T03:08:08.076+03:00
                                            averagePrice:           actions[0].averagePrice,
                                            relativeYield:          actions[0].relativeYield
                                        })
                                    console.log(robot)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //return lastSocialLots

}
