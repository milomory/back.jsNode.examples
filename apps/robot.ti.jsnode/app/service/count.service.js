
const {Count: CountService} = require('../db/db.models/count.model');

exports.initCount = async () => {
    await CountService.sync({ force: true }).then(() => {
        // console.log('Таблица "count" успешно создана');
    })
        .catch(error => {
            console.error('Ошибка при создании таблицы "count":', error);
        });

    await CountService.upsert({
        id: 1,
        countStatus: 0,
        date: Date.now()
    }).then(newCount => {
        // console.log('Новая запись newCount(countStatus: 0) создана (countInit):', newCount);
    }).catch(error => {
        console.error('Ошибка при создании записи newCount(countStatus: 0):', error);
    });

}

exports.saveCount = async (countStatus) => {
    await CountService.upsert({
        id: 1,
        countStatus,
        date: Date.now()
    }).then(newCount => {
        // console.log('Новая запись newCount(countStatus: 1) создана (countRun):', newCount);
    }).catch(error => {
        console.error('Ошибка при создании записи newCount(countStatus: 1):', error);
    });
}

exports.getCountStatus = async () => {
    try {
        const Count = await CountService.findOne({ where: { id: 1 } })
        // console.log(Count)
        return Count.dataValues.countStatus
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
