
exports.profile = async (psid) => {
    try {

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

        const instrumentArr = []
        const profiles = await require('../social/profiles').getProfile()

        if (profiles) {

            const currentDate = new Date().toISOString().slice(0, 10)
            //const currentDate = "2023-12-25"
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
                    await init(10, 15)

                    console.log("")
                    console.log(i + "ый Профиль (profile): " + profile.name)
                    console.log("")

                    // ===============================
                    // Тянем весь ордерЛист
                    // ===============================
                    const orderList = await require('../social/instruments').getInstrumentList({
                        psid,
                        profileUid: profile.uid,
                        limit:      100 // очень важный параметр, тиньков будет отбивать
                    })

                    if (orderList) {
                        // ===============================
                        // Выбираем только сегодняшние оредеры
                        // ===============================
                        for (let [j, order] of orderList.entries()) {

                            if ((order.statistics.maxTradeDateTime.slice(0, 10)) === (currentDate) &&
                                (order.type === 'share') && (order.currency === 'rub')) {

                                // ===============================
                                // Задержка
                                // ===============================
                                await init(10, 15)

                                // ===============================
                                // Выбираем по j-тому ордеру последний его акшин
                                // ===============================
                                console.log("Выбираем последний акшин по тикеру: " + order.ticker + "")
                                console.log("ticker: " + order.ticker + ", classCode: " + order.classCode)
                                const actions = await require('../social/instruments').getActionsByInstrument({
                                    psid,
                                    profileUid: profile.uid,
                                    limit: 1,
                                    order
                                })

                                console.log("")
                                console.log("Ловим ошибку")
                                console.log(actions)
                                console.log("")

                                if (actions?.length && actions[0].action) {

                                    // ===============================
                                    // Выводим все акшины по И-тому одеру, но т.к. у нас лимит стоит 1,
                                    // то мы получаем сразу последний
                                    // ===============================
                                    console.log("Action: " + actions[0].action + ", по цене: " + actions[0].averagePrice)
                                    console.log("")
                                    const sharesBy = await require('../invest.api/instrumentsService/sharesBy').get({
                                        idType: "INSTRUMENT_ID_TYPE_TICKER",
                                        classCode: order.classCode,
                                        id: order.ticker
                                    })

                                    instrumentArr.push(
                                        {
                                            figi: sharesBy.instrument.figi,                     // sharesBy
                                            ticker: order.ticker,
                                            classCode: order.classCode,
                                            uid: sharesBy.instrument.uid,                       // Currencies
                                            positionUid: sharesBy.instrument.positionUid,       // Currencies
                                            tradeDateTime: actions[0].tradeDateTime,            // '2023-12-25T21:16:06.016+03:00',
                                            action: actions[0].action,                          // '2023-12-27T03:08:08.076+03:00
                                            cost: actions[0].averagePrice
                                        }
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }


        // console.log('instrumentArr')
        // console.log(instrumentArr)
        // console.log("")

        const sortedData = instrumentArr.sort((a, b) => {
            if (a.positionUid < b.positionUid) return -1;
            if (a.positionUid > b.positionUid) return 1;
            if (a.tradeDateTime < b.tradeDateTime) return -1;
            if (a.tradeDateTime > b.tradeDateTime) return 1;
            return 0;
        });

        const uniqueData = sortedData.reduce((acc, current) => {
            const x = acc.find(item => item.positionUid === current.positionUid);
            if (!x) {
                return acc.concat([current]);
            } else {
                if (new Date(current.tradeDateTime) > new Date(x.tradeDateTime)) {
                    x.tradeDateTime = current.tradeDateTime;
                }
                return acc;
            }
        }, []);

        // console.log(uniqueData);




        return uniqueData

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}
