const path = require('path')
const { syncAndSeed, Item } = require('./db/db')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/client', express.static(path.join(__dirname, '../client')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/api/items', async(req, res, next) => {
    res.send(await Item.findAll())
})

/* your post and delete routes
should use the same path that you use to get data
so this should be app.post('/api/items')
check out RESTful api principles here:
https://restfulapi.net/resource-naming/
*/
app.post('/', async(req, res, next) => {
    try {
        const newItem = await Item.create({ name: req.body.item })
        //your data routes should be completely separate from the webpage
        //so you should post to the database
        //send the newItem back to the front end
        //and continue handling the item on the frontend from there
        res.redirect('/')
    } catch (error) {
        console.log('NEW ITEM POST REQUEST ERROR:', error)
    }
})

//this should be app.delete('/api/items/:id')
app.delete('/:id', async(req, res, next) => {
    try {
        const toBeDestroyed = await Item.findByPk(req.params.id)
        await toBeDestroyed.destroy()
        res.send(console.log('Item has been deleted'))
    } catch (error) {
        console.log('DELETE HANDLER ERROR:', error)
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
