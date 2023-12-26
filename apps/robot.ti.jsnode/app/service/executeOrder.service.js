exports.executeOrder = async (lastSocialLots) => {

    let message = []
    let lotsHaveMyProfile = []
    let lotsNotHaveMyProfile = []

    //console.log(lastSocialLots)
    // ===============================
    // Смотрим выбранный мой аккаунт, созданный для этого всего
    // ===============================
    const accounts = await require('../invest.api/usersService/getAccounts')
        .get({})
    //const account = accounts.accounts[accounts.accounts.length-1]
    const account = accounts.accounts[5]
    //console.log(account)

    // ===============================
    // Смотрим лоты в моем портфеле
    // ===============================
    const instrumentByPortfolio = await require('../service/portfolio.service')
        .getInstrumentByPortfolio(account)
    //console.log(instrumentByPortfolio)

    // ===============================
    // Смотрим деньги в моем портфеле
    // ===============================
    const amountByPortfolio = await require('../service/portfolio.service')
        .getAmountByPortfolio(account)
    //console.log(amountByPortfolio)

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
                message.push("[" + i + "][" + j + "] - [Сравнение чьей-то " + i + "-й позиции (" + lastSocialLot.ticker + ") с моей " + j + "-й позицией (" + myLot.ticker + ")] ")
                message.push("[" + i + "][" + j + "] - Гоблин говорит => Такая печенька у меня уже есть: " + lastSocialLot.ticker + ", " +
                    "надо посмотреть, что с ней делали... Ого, признак (" + lastSocialLot.action + ")!")

                // ===============================
                // Ниибический костыль, делаем еще массив и пихаем все, что сошлось
                // ===============================
                lotsHaveMyProfile.push(lastSocialLot)

            } else {
                // ===============================
                // i-тый лот чьего-то профиля != j-му моему лоту
                // (т.е. у меня такого еще нет)
                // ===============================
                message.push(
                    "[" + i + "][" + j + "] - [Сравнение чьей-то " + i + "-й позиции (" + lastSocialLot.ticker + ") с моей " + j + "-й позицией (" + myLot.ticker + ")] ")
                message.push(
                    "[" + i + "][" + j + "] - Гоблин говорит => Такой печеньки у меня еще нет, " +
                    "надо посмотреть, что с ней делали... Ого, признак (" + lastSocialLot.action + ")!")

                // ===============================
                // Ниибический костыль, делаем еще массив и пихаем все, что есть не у меня и чего у меня нет
                // ===============================
                lotsNotHaveMyProfile.push(lastSocialLot)

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

        //...

        // ===============================
        // Условие, если ее 'sell'
        // ===============================
        if (lotHaveMyProfile.action === 'sell') {
            message.push("Ее продали, значит и мне она не нужна! Продаем: [" + i + "] " + lotHaveMyProfile.ticker)
            // console.log (message);

            // ===============================
            // Функция продажи
            // DIRECTION.BUY or DIRECTION.SELL
            // Направление операции: 1-buy, 2-sell,
            // ===============================



            //... ()
            const postOrder = await require('../service/postOrder.service').postOrderServiceSell({
                lotHaveMyProfile,
                direction: "2",
                account
            })
            console.log('Функция продажи')
            console.log(postOrder)



            message.push('Система говорит => Продано, ура!' + lotHaveMyProfile.ticker)

        } else { // lastSocialLot.action != 'sell' => 'buy'
            message.push('Ее купили, но у меня она уже есть! Пусть еще побудет: ' + lotHaveMyProfile.ticker)

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

    // ===============================
    // Идем по нормализованному говну ниибического костыля в виде массива с тем,
    // что не сошлось, что можно попродавать, если там САЛЕ
    // ===============================
    for (let [i, lotNotHaveMyProfile] of uniqueArrayLotsNotHaveMyProfile.entries()) {
        // console.log(lotNotHaveMyProfile)

        //...

        // ===============================
        // Условие, если 'buy'
        // ===============================
        if (lotNotHaveMyProfile.action === 'buy') {
            message.push(
                //"[Сравнение чьей-то " + i + "-й позиции с моей " + j + "-й позицией] " +
                "Гоблин говорит => Так-так-так! Ее купили, значит в ней может быть что-то ценное. " +
                "Давай посмотрим, а хватит ли нам денег в казне для покупки: [" + i + "] " + lotNotHaveMyProfile.ticker)


            // ===============================
            // Проверка на то, что у меня есть на что покупать
            // ===============================
            if (lotNotHaveMyProfile.cost <= amountByPortfolio.totalAmountCurrencies.units * 100) {
                message.push(
                    //"[Сравнение чьей-то " + i + "-й позиции с моей " + j + "-й позицией] " +
                    "Гоблин говорит => Вот моя печенька: " + lotNotHaveMyProfile.ticker + ", " +
                    //"она не такая, как эта: " + lastSocialLot.ticker + ". " +
                    //"Они неодинаковые, следовательно" +
                    "надо брать! " +
                    "У меня есть: " + amountByPortfolio.totalAmountCurrencies.units + " рублей, " +
                    "печенька стоит: " + lotNotHaveMyProfile.cost + " рублей! Золота хватит, берем!")


                // ===============================
                // Функция покупки
                // DIRECTION.BUY or DIRECTION.SELL
                // Направление операции: 1-buy, 2-sell,
                // ===============================



                //... ()
                const postOrder = await require('../service/postOrder.service').postOrderServiceBuy({
                    lotNotHaveMyProfile,
                    direction: "1",
                    account
                })
                console.log('Функция покупки')
                console.log(postOrder)




                message.push("Система говорит => Покуплено, ура!")

            } else {
                message.push(
                    //"[Сравнение чьей-то " + i + "-й позиции с моей " + j + "-й позицией] " +
                    "Гоблин говорит => Вот " +
                    // j + "-ая моя " +
                    "печенька: " + lotNotHaveMyProfile.figi + ", " +
                    //"она не такая, как эта: " + lastSocialLot.figi + ". " +
                    //"Они неодинаковые," +
                    "надо брать! " +
                    "У меня есть: " + amountByPortfolio.totalAmountCurrencies.units + " рублей, " +
                    "печенька стоит: " + lotNotHaveMyProfile.cost + " рублей! Нужно больше золота!")

            }
        } else {
            // lastSocialLot.action != 'buy' => 'sell'
            message.push(
                //"[Сравнение чьей-то " + i + "-й позиции с моей " + j + "-й позицией] " +
                "Гоблин говорит => Так-так-так! " +
                "Ее продали, значит в ней нет ничего ценного. " +
                "Значит и мне не нужна " + lotNotHaveMyProfile.ticker)

        }

    }

    return message
}

