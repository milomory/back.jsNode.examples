exports.getSharesBy = async (data) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.InstrumentsService/ShareBy';
    try {
        const response = await require('../../axios.service').request(method, url, null, data);
        if (response.data) {
            console.log("shareBy...")
            console.log(response.data)
        }
        return response.data
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }
}
