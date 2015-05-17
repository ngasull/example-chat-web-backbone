let React = require('react')
let UsernameInput = require('./UsernameInput.jsx')
let User = require('../model/User.js')
let Messages = require('../model/Messages.js')

/**
 * Main chat component: displays a username input before displaying the actual chat
 */
export default class BackboneChat extends React.Component {

    componentWillMount() {
        this.props.messages.fetch()
    }

    render() {
        if (this.props.user.get('name').length) {
            // Render chat if user is set up
            return <div>Hello {this.props.user.get('name')}</div>

        } else {
            // Render username input otherwise
            return <UsernameInput user={this.props.user}/>
        }
    }
}

BackboneChat.defaultProps = {
    user: new User(),
    messages: new Messages()
}
