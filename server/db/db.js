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
        await db.authenticate()
        await db.sync( {force: true})
    }
    catch(error){
        console.log('SYNCANDSEED ERROR:', error)
    }
}


module.exports = {
    syncAndSeed,
    // models: {
    //     Item
    // }
}