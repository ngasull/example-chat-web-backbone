let React = require('react')
let UsernameInput = require('./UsernameInput.jsx')
let Chat = require('./Chat.jsx')
let User = require('../model/User.js')

/**
 * Main/root component: displays a username input before displaying the actual chat
 */
export default class RootComponent extends React.Component {

    render() {
        let username = this.props.user.get('name')

        if (username.length) {
            // Render chat if user is set up
            return <Chat user={this.props.user}/>
        } else {
            // Render username input otherwise
            return <UsernameInput user={this.props.user} onSetup={this.forceUpdate.bind(this)}/>
        }
    }
}

RootComponent.defaultProps = {
    user: new User()
}
