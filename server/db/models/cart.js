const db = require ('../db')
const {UUID, UUIDV4, BOOLEAN, ENUM} = require('sequelize')

const Cart = db.define('cart', {
    id:{
        primaryKey:true,
        type:UUID,
        defaultValue:UUIDV4
    }
})

module.exports = Cart