
//const profile = 'da512a0c-fa0f-4313-9840-b1753eaf809a' //Gladyshva
const profile = 'b9c00eb6-dd76-40d1-acc0-3046c076ecf2' //DedMoroz

exports.getOrders = async () => {
    const orderList = await require('./instruments').getInstrumentList(profile, 1)
    console.log(orderList.data.payload.items)
    const instrument = {
        ticker:     orderList.data.payload.items[0].ticker,
        classCode:  orderList.data.payload.items[0].classCode
    }
    const actions = await require('./instruments').getActionsByInstrument(profile, 1, instrument)
    console.log(actions.data.payload.items[0])
}

