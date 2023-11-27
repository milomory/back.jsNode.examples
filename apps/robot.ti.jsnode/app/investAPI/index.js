
const env = require('../env').getENV()

const headers = {
    'accept': 'application/json',
    'Authorization':`Bearer ${env.INVEST_TOKEN}`,
    'Content-Type': 'application/json'
};

(async () => {
    const accounts = await require('./UsersService/accounts').getAccounts(env, headers);

    console.log (accounts.data)
})()

