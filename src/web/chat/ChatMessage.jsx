let React = require('react')
let Message = require('../model/Message.js')

/**
 * The element rendering a line in the chat
 */
export default class ChatMessage extends React.Component {

    render() {
        return <li>{this.props.message.get('author')}: {this.props.message.get('text')}</li>
    }
}

ChatMessage.propTypes = {
    message: React.PropTypes.instanceOf(Message)
}
