var React = require('react');
var Redux = require('redux');
var ReactPropTypes = React.PropTypes;
var taskIndex = 0;
var TodoStore = require('../stores/TodoStore');
////Don't modify the previous state & action
//function reducer(previousState, action) {
//    if (!previousState) {
//        return [];
//    }
//    switch (action.type) {
//        case 'ADD':
//            var newArray = previousState.splice(0);
//            newArray.push({
//                task: action.task,
//                completed: false,
//                index: taskIndex++
//            });
//            return newArray;
//        case 'TOGGLE':
//            if (action.index > previousState.length - 1) {
//                return previousState;
//            }
//            var tempArray = previousState.splice(0);
//            var oldItem = previousState[action.index];
//            var updatedItem = Object.assign({}, oldItem);
//            updatedItem.completed = action.checked;
//            tempArray[action.index] = updatedItem;
//            return tempArray;
//        case 'REMOVE':
//            if (action.index > previousState.length - 1) {
//                return previousState;
//            }
//            var tempArray = previousState.splice(0).splice(action.index, 1);
//            return tempArray;
//        default:
//            console.log('--------> action: ', action);
//            return previousState;
//    }
//}
//
//var reduxStore = Redux.createStore(reducer);
//
//function taskChecked(event) {
//    reduxStore.dispatch({type: 'TOGGLE', checked: event.target.checked, index: event.target.value});
//}
//function taskRemoved(removedIndex) {
//    reduxStore.dispatch({type: 'REMOVE', index: removedIndex});
//}

function taskChecked(event) {
    console.log('--------> event.target.checked: ', event.target.value);
    //reduxStore.dispatch({type: 'REMOVE', index: removedIndex});
}

function getTodoStateFromStore() {
    return {data: TodoStore.getAll()}
}

module.exports = React.createClass(
    {
        propTypes: {
            onTaskRemoved: ReactPropTypes.func.isRequired,
            onTaskRemoved: ReactPropTypes.func.isRequired
        },
        //reducer: reducer,
        getInitialState: function () {
            return getTodoStateFromStore()
        },
        _onChange: function () {
            this.setState(getTodoStateFromStore())

        },
        componentDidMount: function () {
            TodoStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function () {
            TodoStore.removeChangeListener(this._onChange);
        },
        render: function () {
            var self = this;
            var todos = this.state.data.map(function (d, i) {
                var css = d.completed ? 'strike-out-text' : 'underline-text';
                return (
                    <li className={css}>
                        <input type="checkbox" onClick={(event)=>{self.props.onTaskChecked(d.id,event.target.checked)}} value={d.id}
                               checked={d.completed}/><span>{d.task}</span>
                        <button onClick={(event)=>{self.props.onTaskRemoved(d.id)}}>x</button>
                    </li>);
            });
            return (
                <div>
                    <ul>
                        {todos}
                    </ul>
                </div>
            );

        }
    });