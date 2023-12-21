exports.get = async () => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.UsersService/GetAccounts';
    const response = await require('../../service').investApiRequest(method, url, null, {});
    return response.data
}
