
exports.runCommon = async (psid) => {
    try {
        if (psid) {

            await require('./count.service').saveCount(1)

            // ===============================
            // Начинаем работать с Social-Api
            // ===============================
            const lastSocialLots = await require('./instrument.service').profile(psid)

            // ===============================
            // Начинаем работать с ИНВЕСТ-АПИ
            // ===============================
            console.log(await require('./executeOrder.service').executeOrder(lastSocialLots))

            await require('./count.service').saveCount(0)

        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
