//
// exports.post = async (data) => {
//     const method = 'post';
//     const url = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OrdersService/PostOrder';
//     try {
//         const response = await require('../../axios.service').request(method, url, null, data);
//         return response.data
//     } catch (error) {
//         if (error.response) {
//             if (error.response.statusCode === 400) {
//                 // Обработка ошибки 400 здесь
//                 console.error('Ошибка 400:', error.response.data);
//                 return;
//             } else {
//                 // Обработка других ошибок здесь
//                 console.error('Ошибка:', error.response.data);
//                 return;
//             }
//         } else {
//             // Обработка ошибок без статуса ответа здесь
//             console.error('Ошибка:', error);
//             return;
//         }
//     }
// }
