
const {Psid: PsidService} = require('../db/db.models/psid.model');

exports.psidInit = async () => {
    await PsidService.sync({ force: true }).then(() => {
        console.log('Таблица "psid" успешно создана');
    })
        .catch(error => {
            console.error('Ошибка при создании таблицы:', error);
        });
    console.log('Таблица создана');
}

exports.psidSave = async (psid) => {

    try {
        if (psid) {

            console.log("This is my PSID: " + psid)

            await PsidService.upsert({
                id: 1,
                psid,
                date: Date.now()
            }).then(newPsid => {
                console.log('Новая запись создана:', newPsid);
            }).catch(error => {
                console.error('Ошибка при создании записи:', error);
            });




            // ===============================
            // Начинаем работать с Social-Api
            // ===============================
            const lastSocialLots = await require('./instrument.service').profile(psid)

            // ===============================
            // Начинаем работать с ИНВЕСТ-АПИ
            // ===============================
            console.log (await require('./executeOrder.service').executeOrder(lastSocialLots))
            // console.log (await require('./executeOrder.service.v.02').executeOrder(lastSocialLots))

        }
    } catch (error) {
        console.error('Ошибка:', error);
        // Обработка ошибки или передача сообщения об ошибке пользователю
    }

}

