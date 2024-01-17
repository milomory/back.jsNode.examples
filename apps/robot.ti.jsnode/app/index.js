
//require('./test.invest.api/investApi.test').run().then()

const indexInit = async () => {
    await require('./service/psid.service').psidInit();
    require('./rest')
}

indexInit()








