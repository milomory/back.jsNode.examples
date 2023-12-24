
exports.getInstrumentByPortfolio = async (account) => {

    // ===============================
    // Пихаем этот ИД и карренси, чтобы потом посмотреть, что там внутри вообще есть рублевого
    // ===============================
    const portfolio = await require('../invest.api/operationsService/getPortfolio').get({
        accountId:  account.id,
        currency:   'RUB'
    })
    const portfolioPositionsArr = []
    for (let [i, position] of portfolio.positions.entries()) {
        if (position.instrumentType === "share") {
            const findInstrument = await require('../invest.api/instrumentsService/findInstrument').get({
                "query": position.positionUid,
                "instrumentKind": "INSTRUMENT_TYPE_SHARE",
                "apiTradeAvailableFlag": true
            })
            portfolioPositionsArr.push(
                {
                    figi:           findInstrument.instruments[0].figi,
                    ticker:         findInstrument.instruments[0].ticker,
                    classCode:      findInstrument.instruments[0].classCode,
                    instrumentType: findInstrument.instruments[0].instrumentType,
                    uid:            findInstrument.instruments[0].uid,
                    positionUid:    findInstrument.instruments[0].positionUid
                }
            )
        }
    }
    return portfolioPositionsArr
}

exports.getAmountByPortfolio = async (account) => {
    const portfolio = await require('../invest.api/operationsService/getPortfolio').get({
        accountId:  account.id,
        currency:   'RUB'
    })
    // ===============================
    // Достаем количество свободного бабла в рублях
    // ===============================
    const totalAmountCurrencies = {
        currency: portfolio.totalAmountCurrencies.currency, // 'rub'
        units: portfolio.totalAmountCurrencies.units
    }
    // ===============================
    // Достаем количество общего бабла всего, что есть с активами в рублях
    // ===============================
    const totalAmountPortfolio = {
        currency: portfolio.totalAmountPortfolio.currency, // 'rub'
        units: portfolio.totalAmountPortfolio.units
    }
    return {
        totalAmountCurrencies,
        totalAmountPortfolio
    }
}
