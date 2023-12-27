
exports.psid = async (psid) => {

    try {
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
    } catch (error) {
        console.error('Ошибка:', error);
        // Обработка ошибки или передача сообщения об ошибке пользователю
    }

}

