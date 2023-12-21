exports.get = async (accountId) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPositions';
    const data = {
        accountId
    };
    const response = await require('../../service').investApiRequest(method, url, null, data);
    return response.data
}
