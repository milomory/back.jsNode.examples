exports.get = async () => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.UsersService/GetAccounts';
    const data = {};
    const response = await require('../../service').apiRequest(method, url, data);
    return response.data
}
