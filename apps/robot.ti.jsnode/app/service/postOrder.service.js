exports.postOrderService = async (data) => {

    const postOrder = await require('../invest.api/ordersService/postOrder')
         .post({
             figi: data.lastSocialLot.figi,
             quantity: "1",
             price: {
                 "nano": 1,
                 "units": "36"
             },
             direction: data.direction,
             accountId: data.account.id,
             orderType: "1",
             orderId: Date.now(),
             instrumentId: data.lastSocialLot.uid
         })

    return postOrder
}
