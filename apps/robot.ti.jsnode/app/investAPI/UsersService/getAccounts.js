exports.get = (env) => {
    const method = 'post';
    const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.UsersService/GetAccounts';
    const headers = {
        'accept': 'application/json',
        'Authorization':`Bearer ${env.INVEST_TOKEN}`,
        'Content-Type': 'application/json'
    };
    const data = {};
    (async () => {
        const accounts = await require('../Service/service').request(method, url, headers, data);
        console.log (accounts.data)
    })()
}