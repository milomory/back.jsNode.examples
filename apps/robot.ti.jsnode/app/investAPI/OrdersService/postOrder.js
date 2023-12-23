exports.post = async (figi, quantity, price, direction, accountId, orderType, orderId, instrumentId) => {
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
    const response = await require('../../service').request(method, url, null, data);
    return response.data
}
