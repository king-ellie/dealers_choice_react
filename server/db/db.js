const { Sequelize, DataTypes } = require ('sequelize')

const db = new Sequelize('postgres://localhost/pantry')

const Item = db.define('item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, 
    // quantity: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
})


const syncAndSeed = async() => {
    try{
        await db.sync( {force: true})
        const [flour, sugar, coffee, salt] = await Promise.all([
            Item.create({name: 'flour'}),
            Item.create({name: 'sugar'}),
            Item.create({name: 'coffee'}),
            Item.create({name: 'salt'})
        ])
    }
    catch(error){
        console.log('SYNCANDSEED ERROR:', error)
    }
}


module.exports = {
    syncAndSeed,
    Item
}