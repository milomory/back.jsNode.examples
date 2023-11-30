exports.get = (env, accountId) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.StopOrdersService/GetStopOrders';
    const headers = {
        'accept': 'application/json',
        'Authorization':`Bearer ${env.INVEST_TOKEN}`,
        'Content-Type': 'application/json'
    };
    const data = {
        accountId
    };
    (async () => {
        const response = await require('../../service').request(method, url, headers, data);
        console.log (response.data)
    })()
}
