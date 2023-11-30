require('dotenv').config();

exports.getENV = () => {
    return {
        TINKOFF_USERNAME:       process.env.TINKOFF_USERNAME,
        TINKOFF_PASSWORD:       process.env.TINKOFF_PASSWORD,
        TINKOFF_SECRET_KEY:     process.env.TINKOFF_SECRET_KEY,
        TINKOFF_USERID:         process.env.TINKOFF_USERID,
        INVEST_TOKEN:           process.env.INVEST_TOKEN
    }
}

// export const getENV = () => {
//     return {
//         TINKOFF_USERNAME:       process.env.TINKOFF_USERNAME,
//         TINKOFF_PASSWORD:       process.env.TINKOFF_PASSWORD,
//         TINKOFF_SECRET_KEY:     process.env.TINKOFF_SECRET_KEY,
//         TINKOFF_USERID:         process.env.TINKOFF_USERID,
//         INVEST_TOKEN:           process.env.INVEST_TOKEN
//     }
// }
