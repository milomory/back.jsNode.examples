exports.get = async (idType, classCode, id) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.InstrumentsService/ShareBy';
    const data = {
        idType,
        classCode,
        id
    };
    const response = await require('../../service').request(method, url, null, data);
    return response.data
}
