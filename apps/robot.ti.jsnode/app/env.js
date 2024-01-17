require('dotenv').config();

exports.getENV = () => {
    return {
        TINKOFF_USERNAME:       process.env.TINKOFF_USERNAME,
        TINKOFF_PASSWORD:       process.env.TINKOFF_PASSWORD,
        TINKOFF_SECRET_KEY:     process.env.TINKOFF_SECRET_KEY,
        TINKOFF_USERID:         process.env.TINKOFF_USERID,
        INVEST_TOKEN:           process.env.INVEST_TOKEN,
        DB_HOST:                process.env.DB_HOST,
        DB_USER:                process.env.DB_USER,
        DB_PASSWORD:            process.env.DB_PASSWORD,
        DB_NAME:                process.env.DB_NAME,
        DB_DIALECT:             process.env.DB_DIALECT,
        DB_PORT:                process.env.DB_PORT
    }
}
