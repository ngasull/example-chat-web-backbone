let Backbone = require('backbone')

let User = Backbone.Model.extend({

    defaults: function () {
        return {
            name: ''
        }
    }
})

export default User
