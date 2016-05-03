var React = require('react');
var ReactPropTypes = React.PropTypes;
module.exports = React.createClass({
    propTypes: {
        onAddTask: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string
    },
    textChanged: function (event) {
        this.setState({
            newTask: event.target.value
        });
    },
    componentDidMount:function(){
        this.refs.todoInput.getDOMNode().focus();
    },
    addButtonClicked: function () {
        this.props.onAddTask(this.state.newTask);
        this.refs.todoInput.getDOMNode().focus();
    },
    render: function () {
        return (
            <div>
                <input type="text" placeholder="Some thing to do.."
                       ref="todoInput"
                       onChange={this.textChanged}> </input>
                <button type="button" onClick={this.addButtonClicked}>Add Task</button>
            </div>)
    }

});