const db = require ('../db')
const {UUID, UUIDV4} = require('sequelize')

const Session = db.define('session', {
    id:{
        primaryKey:true,
        type:UUID,
        defaultValue:UUIDV4
    }
})

module.exports = Session