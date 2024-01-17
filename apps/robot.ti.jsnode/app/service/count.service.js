
const {Count: CountService} = require('../db/db.models/count.model');

exports.initCount = async () => {
    await CountService.sync({ force: true }).then(() => {
        console.log('Таблица "count" успешно создана');
    })
        .catch(error => {
            console.error('Ошибка при создании таблицы:', error);
        });
    console.log('Таблица создана');

    await CountService.upsert({
        id: 1,
        countStatus: 0,
        date: Date.now()
    }).then(newCount => {
        console.log('Новая запись newCount(countStatus: 0) создана (countInit):', newCount);
    }).catch(error => {
        console.error('Ошибка при создании записи:', error);
    });

}

exports.runCount = async (psid) => {
    try {
        if (psid) {
            await CountService.upsert({
                id: 1,
                countStatus: 1,
                date: Date.now()
            }).then(newCount => {
                console.log('Новая запись newCount(countStatus: 1) создана (countRun):', newCount);
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
            console.log(await require('./executeOrder.service').executeOrder(lastSocialLots))

            await CountService.upsert({
                id: 1,
                countStatus: 0,
                date: Date.now()
            }).then(newCount => {
                console.log('Новая запись newCount(countStatus: 0) создана (countRun):', newCount);
            }).catch(error => {
                console.error('Ошибка при создании записи:', error);
            });
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

exports.getCountStatus = async () => {
    try {
        const Count = await CountService.findOne({ where: { id: 1 } })
        //console.log(Count)
        return Count.dataValues.countStatus
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
