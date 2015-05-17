let Backbone = require('backbone')

var Message = Backbone.Model.extend({

    defaults: function () {
        return {
            author: '',
            text: ''
        }
    }
})

export default Message
