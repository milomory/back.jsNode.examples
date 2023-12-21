exports.get = (accountId) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OrdersService/GetOrders';
    const data = {
        accountId
    };
    (async () => {
        const response = await require('../../service').investApiRequest(method, url, null, data);
        console.log (response.data)
    })()
}
