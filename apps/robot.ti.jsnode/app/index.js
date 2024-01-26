
const init = async () => {
    // try {
        await require('./service/psid.service').initPsid();
        await require('./service/count.service').initCount();
        await require('./rest');
        await require('./service/common.service').common();

    // } catch (error) {
    //     if (error.response) {
    //         if (error.response.statusCode === 400) {
    //             // Обработка ошибки 400 здесь
    //             console.error('Ошибка 400:', error.response.data);
    //             return;
    //         } else {
    //             // Обработка других ошибок здесь
    //             console.error('Ошибка:', error.response.data);
    //             return;
    //         }
    //     } else {
    //         // Обработка ошибок без статуса ответа здесь
    //         console.error('Ошибка:', error);
    //         return;
    //     }
    // }
}

init().then(r => {console.log("init start")})








