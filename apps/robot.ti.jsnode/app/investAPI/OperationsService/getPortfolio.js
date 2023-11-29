exports.get = (env, accountId, currency) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio';
    const headers = {
        'accept': 'application/json',
        'Authorization':`Bearer ${env.INVEST_TOKEN}`,
        'Content-Type': 'application/json'
    };
    const data = {
        accountId,
        currency
    };
    (async () => {
        const accounts = await require('../Service/service').request(method, url, headers, data);
        console.log (accounts.data)
    })()
}