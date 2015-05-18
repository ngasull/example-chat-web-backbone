let React = require('react')
let openSocket = require('./socket.js')
let UsernameInput = require('./username/UsernameInput.jsx')
let Chat = require('./chat/Chat.jsx')
let User = require('./model/User.js')

/**
 * Main/root component: displays a username input before displaying the actual chat
 */
export default class RootComponent extends React.Component {

    constructor() {
        super()
        this.socket = openSocket()
    }

    componentWillUnmount() {
        this.socket.close()
    }

    render() {
        let username = this.props.user.get('name')
        let component

        if (username.length) {
            // Render chat if user is set up
            component = <Chat user={this.props.user} socket={this.socket}/>
        } else {
            // Render username input otherwise
            component = <UsernameInput user={this.props.user} onSetup={this.forceUpdate.bind(this)}/>
        }

        return component
    }
}

RootComponent.defaultProps = {
    user: new User()
}
