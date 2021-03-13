const path = require('path')
const { syncAndSeed } = require('./db/db')
const express = require('express')
const app = express()


app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
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