var React = require('react');
var Redux = require('redux');
//Redux Store
var store = Redux.createStore(statePureFunction);
// Does not change the parameter
// Predicated behaviour
// Take previous State & new action event, return new/updated state
function statePureFunction(previousState, action) {
    console.log('--------> previousState: ', previousState);
    console.log('--------> action: ', action);
    if (previousState === undefined) return 0; //initial state
    if (action.type === 'INCREMENT') {
        return previousState + 1;
    } else if (action.type === 'DECREMENT') {
        return previousState - 1;
    }
    return previousState;
}

function CounterTile() {
}

CounterTile = React.createClass({
    //React Life-Cycle events
    getInitialState: function () {
        return {value: this.props.startValue};
    },
    componentDidMount: function () {
        var self = this;
        store.setState({value: this.props.startValue});
        store.subscribe(function () {
            self.setState({value: store.getState()});
        })
    },
    render: function () {
        return (
            <div>
                <div>Simple Counter {this.state.value}</div>
                <span>
                    <button onClick={() =>store.dispatch({type:'INCREMENT'})}>+</button>
                    <button onClick={() =>store.dispatch({type:'DECREMENT'})}>-</button>
                </span>
            </div>);
    }
});

module.exports = CounterTile;