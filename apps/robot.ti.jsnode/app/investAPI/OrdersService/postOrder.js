exports.post = (figi, quantity, price, direction, accountId, orderType, orderId, instrumentId) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OrdersService/PostOrder';
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
        const response = await require('../../service').investApiRequest(method, url, null, data);
        console.log (response.data)
    })()
}
