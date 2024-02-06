
const { sequelize, DataTypes } = require('../db.config/sequelize')

const Trades = sequelize.define('trades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    figi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ticker: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    classCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lot: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price_currency: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price_units: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price_nano: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    accountId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    orderType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tradeDateTime:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    instrumentId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    positionUid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
});

module.exports = { Trades };
