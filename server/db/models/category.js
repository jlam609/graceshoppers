const db = require ('../db')
const {STRING, UUID, UUIDV4, Model} = require('sequelize')

const Category = db.define('category', {
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

module.exports = Category