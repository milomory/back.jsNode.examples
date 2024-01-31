
const { sequelize, DataTypes } = require('../db.config/sequelize')

const Psid = sequelize.define('psid', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    psid: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = { Psid };
