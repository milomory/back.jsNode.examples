
const {Count: CountService} = require('../../db/db.models/count.model');

const upsert = async (countStatus, counter) => {
    await CountService.upsert({
        id: 1,
        countStatus,
        counter,
        date: Date.now()
    }).then(newCount => {
        // console.log('Новая запись newCount(countStatus: 0) создана (countInit):', newCount);
    }).catch(error => {
        console.error('Ошибка при создании записи newCount(countStatus: 0):', error);
    });
}

exports.initCountTable = async () => {
    await CountService.sync({
        force: true
    }).then(() => {
        // console.log('Таблица "count" успешно создана');
    }).catch(error => {
        console.error('Ошибка при создании таблицы "count":', error);
    });
    await upsert(0, 0)
}

exports.saveCount = async (countStatus) => {
    try {
        const result = await CountService.findOne({ where: { id: 1 } })
        const Counter = result.dataValues.counter;
        await upsert(countStatus, ((countStatus === 0) ? Counter + 1 : Counter))
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

exports.getCountStatus = async () => {
    try {
        const result = await CountService.findOne({ where: { id: 1 } })
        if (result) {
            // Обращаемся к свойствам результата только если он не пустой
            // console.log(result.dataValues);
            return result.dataValues.countStatus
        } else {
            console.log('Результат запроса пуст');
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
