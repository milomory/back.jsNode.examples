exports.run = async (lastSocialLots) => {

    let message = []
    let lotsHaveMyProfile = []
    let lotsNotHaveMyProfile = []

    // ===============================
    // Смотрим выбранный мой аккаунт, созданный для этого всего
    // ===============================
    const account = await require('./invest.api/usersService.api.service').getAccount(5)

    // ===============================
    // Смотрим лоты в моем портфеле
    // ===============================
    const instrumentByPortfolio = await require('./portfolio.service').getInstrumentByPortfolio(account)

    // ===============================
    // Смотрим деньги в моем портфеле
    // ===============================
    const amountByPortfolio = await require('./portfolio.service').getAmountByPortfolio(account)

    // ===============================
    // Цикл для прохода по массиву последних событий выбранных профилей
    // ===============================
    for (let [i, lastSocialLot] of lastSocialLots.entries() ) {

        // ===============================
        // Цикл для прохода по моим лотам
        // ===============================
        for (let [j, myLot] of instrumentByPortfolio.entries()) {

            // ===============================
            // Проверка на то, что i-тый лот чьего-то профиля === j-му моему лоту
            // ===============================
            if (myLot.uid === lastSocialLot.uid) {
                // ===============================
                // i-тый лот чьего-то профиля === j-му моему лоту
                // (т.е. у меня такой уже есть)
                // ===============================
                // message.push("[" + i + "][" + j + "] - [Сравнение чьей-то " + i + "-й позиции (" + lastSocialLot.ticker + ") с моей " + j + "-й позицией (" + myLot.ticker + ")] ")
                // message.push("[" + i + "][" + j + "] - Гоблин говорит => Такая печенька у меня уже есть: " + lastSocialLot.ticker + ", " + "надо посмотреть, что с ней делали... Ого, признак (" + lastSocialLot.action + ")!")

                // ===============================
                // Ниибический костыль, делаем еще массив и пихаем все, что сошлось
                // ===============================
                lotsHaveMyProfile.push(lastSocialLot)
                console.log("math" + lastSocialLot.ticker)

            } else {
                // ===============================
                // i-тый лот чьего-то профиля != j-му моему лоту
                // (т.е. у меня такого еще нет)
                // ===============================
                // message.push("[" + i + "][" + j + "] - [Сравнение чьей-то " + i + "-й позиции (" + lastSocialLot.ticker + ") с моей " + j + "-й позицией (" + myLot.ticker + ")] ")
                // message.push("[" + i + "][" + j + "] - Гоблин говорит => Такой печеньки у меня еще нет, " + "надо посмотреть, что с ней делали... Ого, признак (" + lastSocialLot.action + ")!")
                // message.push("not math" + lastSocialLot.ticker)


                if (instrumentByPortfolio.some(obj => obj.uid === lastSocialLot.uid)) {
                    console.log("[" + i + "][" + j + "] - [Сравнение чьей-то " + i + "-й позиции (" + lastSocialLot.ticker + ") с моей " + j + "-й позицией (" + myLot.ticker + ")] ")
                    console.log("[" + i + "][" + j + "] - Гоблин говорит => Такая печенька у меня уже есть: " + lastSocialLot.ticker + ", " +
                        "надо посмотреть, что с ней делали... Ого, признак (" + lastSocialLot.action + ")!")
                } else {
                    console.log(
                        "[" + i + "][" + j + "] - [Сравнение чьей-то " + i + "-й позиции (" + lastSocialLot.ticker + ") с моей " + j + "-й позицией (" + myLot.ticker + ")] ")
                    console.log(
                        "[" + i + "][" + j + "] - Гоблин говорит => Такой печеньки у меня еще нет, " +
                        "надо посмотреть, что с ней делали... Ого, признак (" + lastSocialLot.action + ")!")

                    // ===============================
                    // Ниибический костыль, делаем еще массив и пихаем все, что есть не у меня и чего у меня нет
                    // ===============================
                    console.log("Этой уйнюшки у меня нет")
                    lotsNotHaveMyProfile.push(lastSocialLot)
                }

            }

        }
    }

    // ===============================
    // Нормализуем ниибический костыль в виде массива с тем,
    // что сошлось, что можно попродавать, если там САЛЕ
    // ===============================
    // console.log('lotsHaveMyProfile')
    let uniqueArrayLotsHaveMyProfile = lotsHaveMyProfile.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.uid === obj.uid && t.figi === obj.figi
            ))
    );

    // ===============================
    // Идем по нормализованному говну ниибического костыля в виде массива с тем,
    // что сошлось, что можно попродавать, если там САЛЕ
    // ===============================
    for (let [i, lotHaveMyProfile] of uniqueArrayLotsHaveMyProfile.entries()) {
        // console.log(lotHaveMyProfile)

        // ===============================
        // Условие, если ее 'sell'
        // ===============================
        if (lotHaveMyProfile.action === 'sell') {
            console.log("Ее продали, значит и мне она не нужна! Продаем: [" + i + "] " + lotHaveMyProfile.ticker)
            // console.log (message);

            // ===============================
            // Функция продажи
            // DIRECTION.BUY or DIRECTION.SELL
            // Направление операции: 1-buy, 2-sell,
            // ===============================
            // const postOrder = await require('./postOrder.service').postOrderService({
            //     lots: lotHaveMyProfile,
            //     direction: "2",
            //     account,
            //     orderType: "2"
            // })

            const postOrder = await require('./invest.api/ordersService.api.service').postOrder({
                lots: lotHaveMyProfile,
                direction: "2",
                account,
                orderType: "2"
            })

            console.log('Функция продажи')
            console.log(postOrder)

            console.log('Система говорит => Продано, ура!' + lotHaveMyProfile.ticker)

        } else { // lastSocialLot.action != 'sell' => 'buy'
            console.log('Ее купили, но у меня она уже есть! Пусть еще побудет: ' + lotHaveMyProfile.ticker)

        }
    }

    // ===============================
    // Нормализуем ниибический костыль в виде массива с тем,
    // что не сошлось, что можно напокупать, если там БУЙ
    // ===============================
    // console.log('lotsNotHaveMyProfile')
    let uniqueArrayLotsNotHaveMyProfile = lotsNotHaveMyProfile.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.uid === obj.uid && t.figi === obj.figi
            ))
    );

    console.log("Нормализованное говно для покупки то, чего у меня еще нет и может и не нано...")
    console.log(uniqueArrayLotsNotHaveMyProfile)

    // ===============================
    // Идем по нормализованному говну ниибического костыля в виде массива с тем,
    // что не сошлось, что можно попродавать, если там САЛЕ
    // ===============================
    for (let [i, lotNotHaveMyProfile] of uniqueArrayLotsNotHaveMyProfile.entries()) {
        // console.log(lotNotHaveMyProfile)

        // ===============================
        // Условие, если 'buy'
        // ===============================
        if (lotNotHaveMyProfile.action === 'buy') {

            console.log("bue!!!!!!!!!!!!!!!!!")

            console.log(
                "Гоблин говорит => Так-так-так! Ее купили, значит в ней может быть что-то ценное. " +
                "Давай посмотрим, а хватит ли нам денег в казне для покупки: [" + i + "] " +
                lotNotHaveMyProfile.ticker + " за бешеные: " + lotNotHaveMyProfile.averagePrice + " рублей!")


            // ===============================
            // Проверка на то, что у меня есть на что покупать
            // ===============================
            if (lotNotHaveMyProfile.averagePrice * 100 < amountByPortfolio.totalAmountCurrencies.units) {

                console.log("bue: averagePrice * 100 < totalAmountCurrencies")

                message.push(
                    "Гоблин говорит => Вот моя печенька: " + lotNotHaveMyProfile.ticker + ", " +
                    "надо брать! У меня есть: " +
                    amountByPortfolio.totalAmountCurrencies.units + " рублей, " + "печенька стоит: " +
                    lotNotHaveMyProfile.averagePrice + " рублей! Золота хватит, берем!")


                // ===============================
                // Функция покупки
                // DIRECTION.BUY or DIRECTION.SELL
                // Направление операции: 1-buy, 2-sell,
                // ===============================
                // const postOrder = await require('./postOrder.service').postOrderService({
                //     lots: lotNotHaveMyProfile,
                //     direction: "1",
                //     account,
                //     orderType: "2"
                // })

                const postOrder = await require('./invest.api/ordersService.api.service').postOrder({
                    lots: lotNotHaveMyProfile,
                    direction: "1",
                    account,
                    orderType: "2"
                })

                console.log('Функция покупки')
                console.log(postOrder)

                console.log("Система говорит => Покуплено, ура!")

            } else {
                console.log(
                    "Гоблин говорит => Вот " +
                    "печенька: " + lotNotHaveMyProfile.figi + ", " +
                    "надо брать! " +
                    "У меня есть: " + amountByPortfolio.totalAmountCurrencies.units + " рублей, " +
                    "печенька стоит: " + lotNotHaveMyProfile.averagePrice + " рублей! Нужно больше золота!")

            }
        } else {
            // lastSocialLot.action != 'buy' => 'sell'
            console.log(
                "Гоблин говорит => Так-так-так! " +
                "Ее продали, значит в ней нет ничего ценного. " +
                "Значит и мне не нужна " + lotNotHaveMyProfile.ticker)

        }

    }

    return message
}

