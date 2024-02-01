
exports.run = async (lastSocialLot) => {

    console.log("lastSocialLot")
    console.log(lastSocialLot)

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
        console.log(lastSocialLot.ticker + " В портфеле такая штука есть, посмотрим на ее акшин. " + lastSocialLot.action)

        if (lastSocialLot.action === 'sell') {
            // ===============================
            // Функция продажи
            // ===============================
            const postOrder = await require('./invest.api/ordersService.api.service').postOrder({
                lot: lastSocialLot,
                direction: "2",
                account,
                orderType: "2"
            })
            if (postOrder) {
                console.log('Функция продажи вернула это')
                console.log(postOrder)
                console.log('Система говорит => Продано, ура!' + lastSocialLot.ticker)
            }
        }
    } else {
        if ((lastSocialLot.action === 'buy') && (lastSocialLot.averagePrice * 100 < amountByPortfolio.totalAmountCurrencies.units)) {
            // ===============================
            // Функция покупки
            // ===============================
            const postOrder = await require('./invest.api/ordersService.api.service').postOrder({
                lot: lastSocialLot,
                direction: "1",
                account,
                orderType: "2"
            })
            if (postOrder) {
                console.log('Функция покупки вернула это')
                console.log(postOrder)
                console.log('Система говорит => Покуплено, ура!' + lastSocialLot.ticker)
            }
        }
    }
    return "END ROBOT"
}

