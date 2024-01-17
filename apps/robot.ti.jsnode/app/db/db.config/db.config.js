
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, './', 'db.config.json');
const settings = fs.readFileSync(file);

const env = require('../../env').getENV()
const credentials = {
    "host": env.DB_HOST,
    "user": env.DB_USER,
    "password": env.DB_PASSWORD,
    "name": env.DB_NAME,
    "dialect": env.DB_DIALECT,
    "port": env.DB_PORT
}

module.exports = {settings: JSON.parse(settings), credentials};





