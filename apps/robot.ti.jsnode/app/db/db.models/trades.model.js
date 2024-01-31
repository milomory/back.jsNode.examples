
const { sequelize, DataTypes } = require('../db.config/sequelize')

const Trades = sequelize.define('trades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    figi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price_units: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_nano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orderType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instrumentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = { Trades };
