
exports.getAccounts = async () => {
    return await require('./api').getApiService("UsersService/GetAccounts", {})
}

exports.getAccount = async (accountPid) => {
    const accounts = await require('./api').getApiService("UsersService/GetAccounts", {})
    return accounts.accounts[accountPid]
}
