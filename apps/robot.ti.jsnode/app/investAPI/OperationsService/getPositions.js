exports.get = (env, accountId) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPositions';
    const headers = {
        'accept': 'application/json',
        'Authorization':`Bearer ${env.INVEST_TOKEN}`,
        'Content-Type': 'application/json'
    };
    const data = {
        accountId
    };
    (async () => {
        const accounts = await require('../Service/service').request(method, url, headers, data);
        console.log (accounts.data)
    })()
}