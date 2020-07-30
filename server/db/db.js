const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:jjf11ltf8@localhost:5432/graceshoppers-2020", {logging:false})

module.exports = db