
const {Trades: TradesService} = require('../../db/db.models/trades.model');

exports.initTradesTable = async () => {
    await TradesService.sync({
        // force: true
    }).then(() => {
        console.log('Таблица "trades" успешно создана');
    }).catch(error => {
        console.error('Ошибка при создании таблицы:', error);
    });
}

exports.updateTradeStatus = async (Trade, status) => {
    console.error("Trade")
    console.error(Trade[0]?.dataValues?.id)
    const id = Trade[0]?.dataValues?.id
    return await TradesService.update({ status }, { where: { id } });
}

exports.updateTrade = async (Trade, Order) => {
    console.error("trades.service  module - Trade")
    console.error(Trade)

    if (Trade) {
        console.error(Trade[0]?.dataValues?.id)
        const id = Trade[0]?.dataValues?.id
        return await TradesService.update({
            price_units: Order?.initialOrderPrice?.units,
            price_nano: Order?.initialOrderPrice?.nano,
            orderType: Order?.orderType,
            orderId: Order?.orderId
        }, { where: { id } });
    } else {
        console.error("trades.service  module - Trade is empty")
    }

}

exports.saveTrade = async (data) => {

    console.log("trades.service module [42] - data:")
    console.log(data)

    try {
        if (data) {
            return await TradesService.upsert({
                figi: data?.lot?.figi,
                ticker: data?.lot?.ticker,
                classCode: data?.lot?.classCode,
                lot: data?.lot?.lot,
                name: data?.lot?.name,
                quantity: 1,
                price_currency: "rub",
                price_units: "",
                price_nano: "",
                direction: data?.direction,
                accountId: data?.account.id,
                orderType: data?.orderType,
                orderId: "",
                tradeDateTime: data?.lot?.tradeDateTime,
                instrumentId: data?.lot?.uid,
                uid: data?.lot?.uid,
                positionUid: data?.lot?.positionUid,
                status: false
            });
        } else {
            console.error("trades.service  module - data is empty")
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

exports.getLastTradeByInstrumentId = async (instrumentId) => {
    try {
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
