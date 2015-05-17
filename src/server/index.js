let path = require('path')
let express = require('express')
let ChatBackend = require('example-chat-backend')

let backend = new ChatBackend()

backend.setupApiRoutes()

backend.app.use('/static', express.static(path.join(__dirname, '../web/static')))
backend.app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../web/index.html'))
})

backend.listen(3000)
