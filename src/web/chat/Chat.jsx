let React = require('react')
let ChatMessage = require('./ChatMessage.jsx')
let User = require('../model/User.js')
let Messages = require('../model/Messages.js')
let Message = require('../model/Message.js')

/**
 * The chat component, displaying messages and the input box
 */
export default class Chat extends React.Component {

    constructor() {
        super()
        this.onMessageChange = this.onMessageChange.bind(this)
        this.onMessageSent = this.onMessageSent.bind(this)

        this.state = {
            userMessage: ''
        }
    }

    componentWillMount() {
        this.props.messages.fetch()
        this.props.messages.on('reset add change remove', () => this.forceUpdate())
    }

    componentWillUnmount() {
        this.props.messages.off('reset add change remove')
    }

    render() {
        let username = this.props.user.get('name')

        let messageElements = this.props.messages.map(message =>
            <ChatMessage key={message.get('id')} message={message}/>)

        return (
            <form onSubmit={this.onMessageSent}>
                <h1>Welcome {username}</h1>
                <ul>{messageElements}</ul>
                <input type="text" value={this.state.userMessage} onChange={this.onMessageChange}/>
            </form>)
    }

    onMessageChange(e) {
        this.setState({
            userMessage: e.target.value
        })
    }

    onMessageSent(e) {
        e.preventDefault()
        let text = this.state.userMessage

        if (text.length) {
            this.props.messages.add([new Message({
                author: this.props.user.get('name'),
                text: text
            })])

            this.setState({
                userMessage: ''
            })
        }
    }
}

Chat.propTypes = {
    user: React.PropTypes.instanceOf(User),
    messages: React.PropTypes.instanceOf(Messages)
}

Chat.defaultProps = {
    messages: new Messages()
}
