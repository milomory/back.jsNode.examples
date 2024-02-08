
exports.getSocialInstruments = async (profile) => {

    console.log("SOCIAL SERVICE STARTING...")

    const psid = await require('./db/psid.service').getPsid()

    if (profile && psid) {

        const currentDate = new Date().toISOString().slice(0, 10)
        // const currentDate = "2024-02-05"
        console.log("SOCIAL SERVICE")
        console.log("SOCIAL SERVICE: Today: " + currentDate)
        console.log("SOCIAL SERVICE: Time: " + new Date().toTimeString())
        console.log("SOCIAL SERVICE")

        if (profile.pid !== 0) {

            // ===============================
            // Задержка
            // ===============================
            await require("./delay.service").delay(5, 10)

            console.log("SOCIAL SERVICE")
            console.log("SOCIAL SERVICE: Name: " + profile.name)
            console.log("SOCIAL SERVICE")

            // ===============================
            // Тянем весь ордерЛист
            // ===============================
            const orderList = await require('./instruments.social.service').getInstrumentList({
                psid,
                profileUid: profile.uid,
                limit:      100, // очень важный параметр, тиньков будет отбивать
                currentDate
            })

            if (orderList.length > 0) {
                console.log('SOCIAL SERVICE: -orderList- variable is not empty')
                console.log(orderList)

                // ===============================
                // Выбираем ордеры только сегодняшние, только акции и только рублевые
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
                            // console.log("SOCIAL SERVICE: Looking last Action by " + i + "'s orderList. " +
                            //     "Профиль " + profile?.name + ". " +
                            //     "classCode: " + order?.classCode + ". " +
                            //     "type: " + order?.type + ". " +
                            //     "Ticker: " + order?.ticker + ". " +
                            //     "Action: " + actions[0]?.action + ". " +
                            //     "Cost: " + actions[0]?.averagePrice)

                            const sharesBy = await require('./invest.api/nsi/sharesBy.nsi.service').getSharesBy(order.ticker)

                            if (sharesBy) {
                                console.log("SOCIAL SERVICE")
                                console.log("SOCIAL SERVICE: STARTING ROBOT SERVICE...")
                                console.log("SOCIAL SERVICE")
                                console.log(await require('./robot.service').run({
                                    figi:                   sharesBy.figi,
                                    ticker:                 order.ticker,
                                    classCode:              order.classCode,
                                    lot:                    sharesBy.lot,
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
            } else {
                console.log("SOCIAL SERVICE: -orderList- variable is empty")
            }
        }
    }
    return "SOCIAL SERVICE: SOCIAL SERVICE is END"
}
