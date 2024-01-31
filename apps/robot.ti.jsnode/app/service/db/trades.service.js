
const {Trades: TradesService} = require('../../db/db.models/trades.model');
const {Count: CountService} = require("../../db/db.models/count.model");

exports.initTradesTable = async () => {
    await TradesService.sync({
        //force: true
    }).then(() => {
        console.log('Таблица "trades" успешно создана');
    }).catch(error => {
        console.error('Ошибка при создании таблицы:', error);
    });
}

exports.updateTradeStatus = async (Trade, status) => {
    // console.error("Trade")
    // console.error(Trade[0].dataValues.id)
    const id = Trade[0].dataValues.id
    return await TradesService.update({ status }, { where: { id } });
}

exports.updateTrade = async (Trade, Order) => {
    // console.error("Trade")
    // console.error(Trade[0].dataValues.id)
    const id = Trade[0].dataValues.id
    return await TradesService.update({
        price_units: Order.initialOrderPrice.units,
        price_nano: Order.initialOrderPrice.nano,
        orderType: Order.orderType,
        orderId: Order.orderId
    }, { where: { id } });
}

exports.saveTrade = async (data) => {
    try {
        return await TradesService.upsert({
            figi: data.lot.figi,
            quantity: "1",
            price_currency: "rub",
            price_units: 1,
            price_nano: 1,
            direction: data.direction,
            accountId: data.account.id,
            orderType: data.orderType,
            orderId: "",
            instrumentId: data.lot.uid,
            status: false
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

exports.getLastTradeByInstrumentId = async (instrumentId) => {
    try {
//        const result = await TradesService.findOne({ where: { instrumentId } })
        const result = await TradesService.findOne({
            where: {
                instrumentId,
                status: true
            },
            order: [ [ 'createdAt', 'DESC' ] ] });

        if (result) {
            // Обращаемся к свойствам результата только если он не пустой
            // console.log(result.dataValues);
            console.log("Module trades.service says - getTradeByInstrumentId -> is it not null")
            return result.dataValues
        } else {
            console.log('Module trades.service says - getTradeByInstrumentId -> is it null');
        }
    } catch (error) {
        console.error('Module trades.service says - Ошибка:', error);
    }
}
