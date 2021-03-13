const path = require('path')
const { syncAndSeed, Item } = require('./db/db')
const express = require('express')
const app = express()


app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/api/items', async(req, res, next) => {
    res.send(await Item.findAll())
})

app.post('/api/items/1', async(req, res, next) => {
    try {
        console.log('target hit')
    //   Item.create({name: req.params.id})  
    } catch (error) {
        console.log('NEW ITEM POST REQUEST ERROR:', error)
    }
})



const init = async() => {
    try {
        await syncAndSeed()
        
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`app is listening on ${port}`))
    }
    catch(error){
        console.log('INIT ERROR:', error)
    }
}
init()