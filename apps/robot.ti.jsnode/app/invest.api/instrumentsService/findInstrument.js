exports.get = async (data) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.InstrumentsService/FindInstrument';
    try {
        const response = await require('../../service/axios.service').request(method, url, null, data);
        return response.data
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}
