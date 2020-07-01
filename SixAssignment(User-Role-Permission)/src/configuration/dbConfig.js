const Sequelize = require('Sequelize');
require('dotenv').config();

const database = process.env.DB_NAME;
const user = process.env.USER_NAME;
const password = process.env.PASS;
const host = process.env.HOST_NAME;

const dbConfig = new Sequelize(database, user, password, {
host: host,
port: 5432,
dialect: 'postgres',

define: {
schema: 'public',
timestamps: false
},

pool: {
max: 5,
min: 0,
idle: 10000
}
});

module.exports = dbConfig;