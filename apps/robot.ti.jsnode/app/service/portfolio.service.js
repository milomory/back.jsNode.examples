const {delay} = require("./delay.service");

exports.getInstrumentByPortfolio = async (account) => {
    console.log("PORTFOLIO SERVICE START")
    console.log("PORTFOLIO SERVICE: -getInstrumentByPortfolio- method START")

    // ===============================
    // Пихаем этот ИД и карренси, чтобы потом посмотреть, что там внутри вообще есть рублевого
    // ===============================
    const portfolio = await require('./invest.api/operationsService.api.service').getPortfolio({
        accountId:  account?.id,
        currency:   'RUB'
    })

    // console.log("PORTFOLIO SERVICE: -portfolio- variables")
    // console.log(portfolio)

    const portfolioPositionsArr = []

    if (portfolio) {
        for (let [i, position] of portfolio?.positions?.entries()) {
            if (position?.instrumentType === "share") {

                const findInstrument = await require('./invest.api/instrumentsService.api.service').findInstrument({
                    "query": position?.positionUid,
                    "instrumentKind": "INSTRUMENT_TYPE_SHARE",
                    "apiTradeAvailableFlag": true
                })

                if (findInstrument) {
                    // console.log("PORTFOLIO SERVICE: findInstrument[" + i + "] is not empty. ticker:" + findInstrument?.instruments[0]?.ticker)

                    portfolioPositionsArr.push(
                        {
                            figi:           findInstrument?.instruments[0]?.figi,
                            ticker:         findInstrument?.instruments[0]?.ticker,
                            classCode:      findInstrument?.instruments[0]?.classCode,
                            instrumentType: findInstrument?.instruments[0]?.instrumentType,
                            uid:            findInstrument?.instruments[0]?.uid,
                            positionUid:    findInstrument?.instruments[0]?.positionUid
                        }
                    )
                } else {
                    console.log("PORTFOLIO SERVICE: -findInstrument- variable is empty")
                }
            }
        }
    }

    return portfolioPositionsArr
}

exports.getAmountByPortfolio = async (account) => {
    console.log("PORTFOLIO SERVICE START")
    console.log("PORTFOLIO SERVICE: -getAmountByPortfolio- method START")

    const portfolio = await require('./invest.api/operationsService.api.service').getPortfolio({
        accountId:  account?.id,
        currency:   'RUB'
    })

    // ===============================
    // Достаем количество свободного бабла в рублях
    // ===============================
    const totalAmountCurrencies = {
        currency: portfolio?.totalAmountCurrencies?.currency, // 'rub'
        units: portfolio?.totalAmountCurrencies?.units
    }
    // ===============================
    // Достаем количество общего бабла всего, что есть с активами в рублях
    // ===============================
    const totalAmountPortfolio = {
        currency: portfolio?.totalAmountPortfolio?.currency, // 'rub'
        units: portfolio?.totalAmountPortfolio?.units
    }
    return {
        totalAmountCurrencies,
        totalAmountPortfolio
    }
}
