const path = require('path')
const express = require('express')
const app = express()

app.use('/src', express.static(path.join(__dirname, 'src')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'client/index.html'))
})

const port = process.env.PORT || 3000

const init = async() => {
    app.listen(port, () => console.log(`app is listening on ${port}`))
}
init()