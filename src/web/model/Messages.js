let Backbone = require('backbone')
let Message = require('./Message')

let Messages = Backbone.Collection.extend({
    model: Message,
    url: 'api/message'
})

export default Messages
