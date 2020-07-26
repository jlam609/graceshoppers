const db = require ('../db')
const {STRING, UUID, UUIDV4, INTEGER} = require('sequelize')

const User = db.define('user', {
    id:{
        primaryKey:true,
        type:UUID,
        defaultValue:UUIDV4
    },
    username:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:STRING,
        allowNull:false,
    },
    salt:{
        type:STRING,
        allowNull:false
    },
    clearance:{
        type:INTEGER,
        defaultValue:1,
        validate:{
            min:1,
            max:5
        }
    }
})

module.exports = User