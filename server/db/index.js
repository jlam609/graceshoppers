const {db, models} = require('./models')
const {Cart, Category, Order, Product, Session, User} = models

const seed = async (force = true) => {
    try{
        await db.sync({force})
    }
    catch(e){
        throw new Error('seed unsuccessful', e)
    }
}

module.exports = {
    db,
    seed,
    models:{
        Cart,
        Category,
        Order,
        Product,
        Session,
        User
    }
}