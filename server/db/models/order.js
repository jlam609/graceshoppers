const db = require ('../db')
const {UUID, UUIDV4, ENUM} = require('sequelize')

const Order = db.define('order', {
    id:{
        primaryKey:true,
        type:UUID,
        defaultValue:UUIDV4
    },
    status:{
        type:ENUM,
        values:['active', 'pending', 'done'],
        defaultValue: 'active'
    }
})

module.exports = Order