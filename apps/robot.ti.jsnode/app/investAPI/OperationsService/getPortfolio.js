exports.get = async (accountId, currency) => {
    const method = 'post'
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio'
    const data = {
        accountId,
        currency
    }
    const response = await require('../../service').apiRequest(method, url, data);
    return response.data
}
