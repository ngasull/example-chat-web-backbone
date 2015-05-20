let path = require('path')
let express = require('express')
let ChatBackend = require('example-chat-backend')

let PORT = 3000
let backend = new ChatBackend()

backend.setupApiRoutes()

backend.app.use('/static', express.static(path.join(__dirname, '../web/static')))
backend.app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../web/index.html'))
})

backend.listen(PORT)
console.log(`Listening at http://localhost:${PORT}`)
