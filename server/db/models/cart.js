const db = require ('../db')
const {UUID, UUIDV4, INTEGER} = require('sequelize')

const Cart = db.define('cart', {
    id:{
        primaryKey:true,
        type:UUID,
        defaultValue:UUIDV4
    },
    quantity:{
        type:INTEGER,
        defaultValue:1,
    }
})

module.exports = Cart