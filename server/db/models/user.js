const db = require ('../db')
const {STRING, UUID, UUIDV4} = require('sequelize')

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
    },
    password:{
        type:STRING,
        allowNull:false,
    },
    email:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    salt:{
        type:STRING,
        allowNull:false
    }
})

module.exports = User