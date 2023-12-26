exports.postOrderServiceBuy = async (data) => {

    console.log ('postOrderServiceBuy')
    console.log (data)

    // const postOrder = await require('../invest.api/ordersService/postOrder')
    //      .post({
    //          figi: data.lotNotHaveMyProfile.figi,
    //          quantity: "1",
    //          price: {
    //              "nano": 1,
    //              "units": "36"
    //          },
    //          direction: data.direction,
    //          accountId: data.account.id,
    //          orderType: "2",
    //          orderId: Date.now(),
    //          instrumentId: data.lotNotHaveMyProfile.uid
    //      })
    //
    // return postOrder
}

exports.postOrderServiceSell = async (data) => {

    console.log ('postOrderServiceSell')
    console.log (data)

    // const postOrder = await require('../invest.api/ordersService/postOrder')
    //     .post({
    //         figi: data.lotHaveMyProfile.figi,
    //         quantity: "1",
    //         price: {
    //             "nano": 1,
    //             "units": "36"
    //         },
    //         direction: data.direction,
    //         accountId: data.account.id,
    //         orderType: "2",
    //         orderId: Date.now(),
    //         instrumentId: data.lotHaveMyProfile.uid
    //     })
    //
    // return postOrder
}
