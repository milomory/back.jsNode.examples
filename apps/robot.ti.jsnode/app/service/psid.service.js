
const {Psid: PsidService, CountService} = require('../db/db.models/psid.model');

exports.initPsid = async () => {
    await PsidService.sync({ force: true }).then(() => {
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
        const Psid = await PsidService.findOne({ where: { id: 1 } })
        // console.log('getPsid - psid =', Psid.dataValues.psid);
        return Psid.dataValues.psid
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

