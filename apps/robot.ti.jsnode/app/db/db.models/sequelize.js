const dbConfig = require("../db.config/db.config.js");

// console.log(dbConfig)

const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.credentials.name, dbConfig.credentials.user, dbConfig.credentials.password, {
    host: dbConfig.credentials.host,
    dialect: dbConfig.credentials.dialect,
    logging: dbConfig.settings.logging,
    port: dbConfig.credentials.port,
        pool: {
        max: dbConfig.settings.pool.max,
        min: dbConfig.settings.pool.min,
        acquire: dbConfig.settings.pool.acquire,
        idle: dbConfig.settings.pool.idle
    }
});
module.exports = {sequelize, DataTypes};
