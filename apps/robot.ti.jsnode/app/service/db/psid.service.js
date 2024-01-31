
const {Psid: PsidService} = require('../../db/db.models/psid.model');

exports.initPsidTable = async () => {
    await PsidService.sync({
        force: true
    }).then(() => {
        // console.log('Таблица "psid" успешно создана');
    }).catch(error => {
        console.error('Ошибка при создании таблицы:', error);
    });

    await PsidService.upsert({
        id: 1,
        psid: "",
        date: Date.now()
    }).then(newPsid => {
        // console.log('Новая запись "psid=null" создана:', newPsid);
    }).catch(error => {
        console.error('Ошибка при создании записи:', error);
    });
}

exports.savePsid = async (psid) => {
    try {
        if (psid) {
            console.log("savePsid - psid = " + psid)
            await PsidService.upsert({
                id: 1,
                psid,
                date: Date.now()
            }).then(newPsid => {
                // console.log('Новая запись "psid" создана:', newPsid);
            }).catch(error => {
                console.error('Ошибка при создании записи:', error);
            });
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

exports.getPsid = async () => {
    try {
        const result = await PsidService.findOne({ where: { id: 1 } })
        if (result) {
            // Обращаемся к свойствам результата только если он не пустой
            // console.log(result.dataValues);
            return result.dataValues.psid
        } else {
            console.log('Результат запроса пуст');
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

