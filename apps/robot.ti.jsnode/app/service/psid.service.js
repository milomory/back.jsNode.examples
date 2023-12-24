
exports.psid = async (psid) => {
    if (psid) {
        console.log("This is my PSID: " + psid)

        // ===============================
        // Начинаем работать с Social-Api
        // ===============================
        const lastSocialLots = await require('./instrument.service').profile(psid)

        // ===============================
        // Начинаем работать с ИНВЕСТ-АПИ
        // ===============================
        console.log (await require('../service/executeOrder.service').executeOrder(lastSocialLots))

    }
}

