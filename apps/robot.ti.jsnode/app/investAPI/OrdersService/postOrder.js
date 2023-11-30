exports.post = (env, figi, quantity, price, direction, accountId, orderType, orderId, instrumentId) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OrdersService/PostOrder';
    const headers = {
        'accept': 'application/json',
        'Authorization':`Bearer ${env.INVEST_TOKEN}`,
        'Content-Type': 'application/json'
    };
    const data = {
        figi,
        quantity,
        price,
        direction,
        accountId,
        orderType,
        orderId,
        instrumentId
    };
    (async () => {
        const response = await require('../../service').request(method, url, headers, data);
        console.log (response.data)
    })()
}
