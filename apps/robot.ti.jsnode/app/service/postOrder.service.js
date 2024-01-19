const { v4: uuidv4 } = require('uuid');

exports.postOrderService = async (data) => {

    try {

        console.log ('postOrderService')
        console.log (data)

        return await require('../invest.api/ordersService/postOrder')
            .post({
                figi:               data.lots.figi,
                quantity:           "1",
                // Decimal(bid["price"]["units"]) + Decimal(bid["price"]["nano"])
                // 1e9 - это перевод в нормальные цифры, 1е9 == 1000000000
                price: {
                    "currency":     "rub",
                    //"nano":         (data.lots.cost - Math.trunc(data.lots.cost)) * 1000 * 1000 * 1000,
                    "nano":         data.direction === 1 ? 500000000 : 0,
                    //"nano":         0,
                    "units":        Math.trunc(data.lots.cost)
                },
                direction:          data.direction,
                accountId:          data.account.id,
                orderType:          data.orderType,
                orderId:            Date.now(),
                // orderId:            uuidv4(),
                instrumentId:       data.lots.uid
            })

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
