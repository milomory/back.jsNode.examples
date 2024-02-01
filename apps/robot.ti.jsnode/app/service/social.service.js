
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
                    for (let [i, order] of orderList.entries()) {

                        if ((order?.statistics?.maxTradeDateTime?.slice(0, 10)) === (currentDate) &&
                            (order?.type === 'share') && (order?.currency === 'rub')) {

                            // ===============================
                            // Задержка
                            // ===============================
                            await require("./delay.service").delay(5, 10)

                            // ===============================
                            // Выбираем по i-тому ордер-листу последний его акшин
                            // ===============================
                            const actions = await require('./instruments.social.service').getActionsByInstrument({
                                psid,
                                profileUid: profile.uid,
                                limit: 1,
                                order
                            })

                            if (actions?.length && actions[0]?.action) {

                                // ===============================
                                // Выводим все акшины по И-тому одеру, но т.к. у нас лимит стоит 1,
                                // то мы получаем сразу последний
                                // ===============================
                                console.log("Смотрим последний экшин по " + i + "-тому одер-листу. " +
                                    "Профиль " + profile?.name + ". " +
                                    "classCode: " + order?.classCode + ". " +
                                    "type: " + order?.type + ". " +
                                    "Ticker: " + order?.ticker + ". " +
                                    "Action: " + actions[0]?.action + ". " +
                                    "Cost: " + actions[0]?.averagePrice)

                                const sharesBy = await require('./invest.api/instrumentsService/sharesBy.nsi.service').getSharesBy(order.ticker)

                                if (sharesBy) {
                                    console.log("START ROBOT")
                                    console.log(await require('./robot.service').run({
                                        figi:                   sharesBy.figi,              // sharesBy
                                        ticker:                 order.ticker,
                                        classCode:              order.classCode,
                                        name:                   sharesBy.name,
                                        exchange:               sharesBy.exchange,
                                        uid:                    sharesBy.uid,
                                        positionUid:            sharesBy.positionUid,
                                        tradeDateTime:          actions[0].tradeDateTime,   // '2023-12-25T21:16:06.016+03:00',
                                        action:                 actions[0].action,
                                        averagePrice:           actions[0].averagePrice,
                                        relativeYield:          actions[0].relativeYield,
                                        minPriceIncrement:      sharesBy.minPriceIncrement
                                    }))
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
