
const init = async () => {
    try {
        await require('./service/db/psid.service').initPsidTable();
        await require('./service/db/count.service').initCountTable();
        await require('./service/db/trades.service').initTradesTable();
        await require('./rest');
        await require('./service/common.service').common();

    } catch (error) {
        if (error.response) {
            if (error.response.statusCode === 400) {
                // Обработка ошибки 400 здесь
                console.error('Ошибка 400:', error.response.data);
                return;
            } else {
                // Обработка других ошибок здесь
                console.error('Ошибка:', error.response.data);
                return;
            }
        } else {
            // Обработка ошибок без статуса ответа здесь
            console.error('Ошибка:', error);
            return;
        }
    }
}

init().then(r => {console.log("Module index - init start")})








