
const { sequelize, DataTypes } = require('../db.config/sequelize')

const Count = sequelize.define('count', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    countStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = { Count };
