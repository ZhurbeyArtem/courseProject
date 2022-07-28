const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
process.env.DB_NAME, //назва бд
process.env.DB_USER, //назва користувача
process.env.DB_PASSWORD, //пароль від бд
    {
        dialect: 'postgres',
        host: process.env.DB_HOST, //хост
        port:  process.env.DB_PORT, //порт 5432

    }


)