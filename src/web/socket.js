let socketioClient = require('socket.io-client')

export default function openSocket() {
    return socketioClient('')
}
