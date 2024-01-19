
exports.common = async () => {
    setInterval(async function () {
        if ((await require('./psid.service').getPsid()) && (await require('./count.service').getCountStatus() === 0)) {

            await require('./count.service').saveCount(1)

            // ===============================
            // Начинаем работать с Social-Api
            // ===============================
            const lastSocialLots = await require('./instrument.service').profile(await require('./psid.service').getPsid())

            // ===============================
            // Начинаем работать с ИНВЕСТ-АПИ
            // ===============================
            console.log(await require('./executeOrder.service').executeOrder(lastSocialLots))

            await require('./count.service').saveCount(0)

        }
    }, 1000);
}
