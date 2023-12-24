exports.postOrderService = async (data) => {

    const postOrder = {
        data
    }
    // const postOrder = await require('../invest.api/ordersService/postOrder')
    //      .post({
    //          figi: data.lotHaveMyProfile.figi,
    //          quantity: "1",
    //          price: {
    //              "nano": 1,
    //              "units": "36"
    //          },
    //          direction: data.direction,
    //          accountId: data.account.id,
    //          orderType: "1",
    //          orderId: Date.now(),
    //          instrumentId: data.lotHaveMyProfile.uid
    //      })

    return postOrder
}
