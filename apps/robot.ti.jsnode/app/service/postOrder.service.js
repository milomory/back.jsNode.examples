exports.postOrderService = async (data) => {

    // const postOrderAbout = {
    //     data
    // }
    const postOrder = await require('../invest.api/ordersService/postOrder')
         .post({
             figi: data.lotNotHaveMyProfile.figi,
             quantity: "1",
             price: {
                 "nano": 1,
                 "units": "36"
             },
             direction: data.direction,
             accountId: data.account.id,
             orderType: "1",
             orderId: Date.now(),
             instrumentId: data.lotNotHaveMyProfile.uid
         })

    return {postOrder}
}
