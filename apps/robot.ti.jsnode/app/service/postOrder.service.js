exports.postOrderService = async (data) => {

    try {

        console.log ('postOrderServiceBuy')
        console.log (data)

        const postOrder = await require('../invest.api/ordersService/postOrder')
            .post({
                figi: data.lots.figi,
                quantity: "1",
                price: {
                    "currency": "rub",
                    "nano": 0,
                    "units": Math.trunc(data.lots.cost)
                },
                direction: data.direction,
                accountId: data.account.id,
                orderType: data.orderType,
                orderId: Date.now(),
                instrumentId: data.lots.uid
            })

        if (postOrder.response) {
            if (postOrder.response.status != 200) {
                console.log("It is not GOOD! message: " + postOrder.data.message)

            } else {
                console.log("It is  GOOD! message: " + postOrder.data.message)
                // ...
            }
        }

        return postOrder

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error
    }

}

// exports.postOrderServiceBuy = async (data) => {
//
//     try {
//
//         console.log ('postOrderServiceBuy')
//         console.log (data)
//
//         const postOrder = await require('../invest.api/ordersService/postOrder')
//             .post({
//                 figi: data.lotNotHaveMyProfile.figi,
//                 // figi: data.lot.figi,
//                 quantity: "1",
//                 price: {
//                     "nano": 1,
//                     "units": "36"
//                 },
//                 direction: data.direction,
//                 accountId: data.account.id,
//                 orderType: "2",
//                 orderId: Date.now(),
//                 instrumentId: data.lotNotHaveMyProfile.uid
//             })
//
//         if (postOrder.response) {
//             if (postOrder.response.status != 200) {
//                 console.log("It is not GOOD! message: " + postOrder.data.message)
//
//             } else {
//                 console.log("It is  GOOD! message: " + postOrder.data.message)
//                 // ...
//             }
//         }
//
//         return postOrder
//
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         throw error
//     }
//
// }
//
// exports.postOrderServiceSell = async (data) => {
//
//     try {
//
//         console.log ('postOrderServiceSell')
//         console.log (data)
//
//         const postOrder = await require('../invest.api/ordersService/postOrder')
//             .post({
//                 figi: data.lotHaveMyProfile.figi,
//                 // figi: data.lot.figi,
//                 quantity: "1",
//                 price: {
//                     "nano": 0,
//                     "units": ""+ Math.trunc(data.lotHaveMyProfile.cost) +""
//                 },
//                 direction: data.direction,
//                 accountId: data.account.id,
//                 orderType: "1",
//                 orderId: Date.now(),
//                 instrumentId: data.lotHaveMyProfile.uid
//             })
//
//         if (postOrder.response) {
//             if (postOrder.response.status != 200) {
//                 console.log("It is not GOOD! message: " + postOrder.data.message)
//
//             } else {
//                 console.log("It is  GOOD! message: " + postOrder.data.message)
//                 // ...
//             }
//         }
//
//         return postOrder
//
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         throw error
//     }
//
// }
