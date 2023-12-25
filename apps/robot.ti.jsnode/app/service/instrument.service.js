
exports.profile = async (psid) => {
    try {
        const instrumentArr = []
        const profiles = await require('../social/profiles').getProfile()
        if (profiles) {
            const toDay = new Date().toISOString().slice(0, 10)
            //const toDay = "2023-12-22"
            console.log("Сегодня: " + toDay)
            for (let [i, profile] of profiles.entries()) {
                if (profile.pid !== 0) {
                    console.log(i + " - " + profile.name)
                    const orderList = await require('../social/instruments').getInstrumentList({
                        psid,
                        profileUid: profile.uid,
                        limit:      5 // очень важный параметр, тиньков будет отбивать
                    })

                    // ===============================
                    // Выбираем только сегодняшние оредеры
                    // ===============================
                    for (let [j, order] of orderList.entries()) {

                        if ((order.statistics.maxTradeDateTime.slice(0, 10)) === (toDay) &&
                            (order.type === 'share') && (order.currency === 'rub')) {
                            async function init(min, max) {
                                const randomTime = (min, max) => Math.random() * (max - min) + min;
                                const randomDuration = randomTime(min, max) * 1000;
                                console.log((randomDuration / 1000) + " sec...")
                                await sleep(randomDuration);
                            }

                            async function sleep(ms) {
                                return new Promise((resolve) => {
                                    setTimeout(resolve, ms);
                                });
                            }

                            await init(40, 60)
                        }

                        if ((order.statistics.maxTradeDateTime.slice(0, 10)) === (toDay) &&
                            (order.type === 'share') && (order.currency === 'rub')) {
                            console.log("ticker: " + order.ticker + ", classCode: " + order.classCode)
                            // ===============================
                            // Выбираем по j-тому ордеру всего его акшины
                            // ===============================
                            console.log("Выбираем последний акшин " + order.ticker + ":")
                            const actions = await require('../social/instruments').getActionsByInstrument({
                                psid,
                                profileUid: profile.uid,
                                limit: 1,
                                order
                            })
                            // ===============================
                            // Выводим все акшины по И-тому одеру, но т.к. у нас лимит стоит 1,
                            // то мы получаем сразу последний
                            // ===============================
                            console.log("Action: " + actions[0].action + ", по цене: " + actions[0].averagePrice)
                            console.log("===============================")
                            const sharesBy = await require('../invest.api/instrumentsService/sharesBy').get({
                                idType:     "INSTRUMENT_ID_TYPE_TICKER",
                                classCode:  order.classCode,
                                id:         order.ticker
                            })
                            instrumentArr.push(
                                {
                                    figi:           sharesBy.instrument.figi,           // sharesBy
                                    ticker:         order.ticker,
                                    classCode:      order.classCode,
                                    uid:            sharesBy.instrument.uid,            // Currencies
                                    positionUid:    sharesBy.instrument.positionUid,    // Currencies
                                    action:         actions[0].action,
                                    cost:           actions[0].averagePrice
                                }
                            )
                        }
                    }
                }
            }
        }
        return instrumentArr
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}
