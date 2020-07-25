const db = require ('../db')
const {STRING, UUID, UUIDV4} = require('sequelize')

const Product = db.define('product', {
    id:{
        primaryKey:true,
        type:UUID,
        defaultValue:UUIDV4
    },
    name:{
        type:STRING,
        unique:true,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
})

module.exports = Product