
exports.run = async (lastSocialLot) => {

    // console.log("ROBOT module says - lastSocialLot:")
    // console.log(lastSocialLot)

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

    if (instrumentByPortfolio.find(obj => obj.positionUid === lastSocialLot.positionUid)) {
        console.log("ROBOT module says - " + lastSocialLot.ticker + " В портфеле такая штука есть, посмотрим на ее акшин... " + lastSocialLot.action)

        if (lastSocialLot.action === 'sell') {
            // ===============================
            // Функция продажи
            // ===============================
            console.log("ROBOT module says - Функция продажи")
            const postOrder = await require('./invest.api/ordersService.api.service').postOrder({
                lot: lastSocialLot,
                direction: "2",
                account,
                orderType: "2"
            })
            if (postOrder) {
                console.log('ROBOT module says - Функция продажи вернула это:')
                console.log(postOrder)
                console.log('ROBOT module says - Система говорит => Продано, ура!' + lastSocialLot?.ticker)
            }
        }
    } else {
        console.log("ROBOT module says - " + lastSocialLot.ticker + " В портфеле такой штуки нет, посмотрим на ее акшин...  " + lastSocialLot.action + " ")

        if (lastSocialLot?.action === 'buy') {
            if (lastSocialLot?.averagePrice * lastSocialLot?.lot < amountByPortfolio?.totalAmountCurrencies?.units) {
                // ===============================
                // Функция покупки
                // ===============================
                console.log("ROBOT module says - Функция покупки")
                const postOrder = await require('./invest.api/ordersService.api.service').postOrder({
                    lot: lastSocialLot,
                    direction: "1",
                    account,
                    orderType: "2"
                })
                if (postOrder) {
                    console.log("ROBOT module says - postOrder is not empty")
                    console.log('Система говорит => Покуплено, ура!' + lastSocialLot?.ticker)
                } else {
                    console.log("ROBOT module says - postOrder is empty")
                }
            } else {
                console.log("ROBOT module says - Не хватает денег на покупку")
            }
        }
    }
    return "ROBOT module says - END ROBOT"
}

