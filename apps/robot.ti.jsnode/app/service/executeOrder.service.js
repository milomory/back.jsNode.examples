exports.executeOrder = async (lastSocialLots) => {

    console.log(lastSocialLots)

    // ===============================
    // Достаем ИД аккаунта (последнего), созданного для этого всего
    // ===============================
    const accounts = await require('../invest.api/usersService/getAccounts').get({})
    const account = accounts.accounts[accounts.accounts.length-2]



    // ===============================
    // Будем искать...
    // ===============================
    const instrumentByPortfolio = await require('../service/portfolio.service').getInstrumentByPortfolio(account)
    console.log(instrumentByPortfolio)
    const amountByPortfolio = await require('../service/portfolio.service').getAmountByPortfolio(account)
    //console.log(amountByPortfolio)

}
