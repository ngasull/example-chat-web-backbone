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

    componentWillMount() {

        this.state = {
            name: this.props.user.get('name')
        }
    }

    render() {
        return (
            <form className="username" onSubmit={this.onSubmit}>
                <label htmlFor="username">Username:&nbsp;</label>
                <input type="text" id="username" value={this.state.name} onChange={this.onChange}/>
            </form>)
    }

    onChange(e) {
        let name = e.target.value

        if (name.length < 17) {
            this.props.user.set('name', name)
            this.setState({name})
        }
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
