let React = require('react')
let User = require('../model/User.js')

/**
 * Username input component
 */
export default class UsernameInput extends React.Component {

    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" onChange={this.onChange}/>
            </form>)
    }

    onChange(e) {
        this.props.user.set('name', e.target.value)
    }

    onSubmit(e) {
        e.preventDefault()

        if (this.props.user.get('name').length)
            this.props.onSetup()
    }
}

UsernameInput.propTypes = {
    user: React.PropTypes.instanceOf(User),
    onSetup: React.PropTypes.func
}
