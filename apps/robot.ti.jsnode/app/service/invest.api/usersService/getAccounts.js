exports.getAllAccounts = async (data) => {
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.UsersService/GetAccounts';
    try {
        const response = await require('../../axios.service').request('post', url, null, data);
        return response.data
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}

