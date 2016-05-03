var ReactDOM = require('react-dom');
var React = require('react');//Do not remove
var TodoItem = require('../../components/TodoItem.jsx');
var TodoTextInput = require('../../components/TodoInput.jsx');
var Header = require('../../components/Header.jsx');
var Footer = require('../../components/Footer.jsx');
var TodoActions = require('../../actions/TodoActions');

$(function () {

    function onAdd(newText) {
        console.log('--------> newText: ',newText);
        if (newText && newText.trim()) {
            TodoActions.createTodo(newText)
        }
    }
    function itemClicked(itemId,checked){
        console.log('--------> itemId: ',itemId,checked);
        TodoActions.toggleItem(itemId,checked);
    }

    ReactDOM.render(<Header title="Todo App"/>,
        $('#header')[0]
    );
    ReactDOM.render(<TodoTextInput onAddTask={onAdd}/>,
        $('#textInput')[0]
    );
    function itemRemovedHandler(removedIndex){
        console.log('--------> removedIndex: ',removedIndex);
        if(removedIndex>=0){
            TodoActions.removeItem(removedIndex)
        }
    }
    ReactDOM.render(<TodoItem
        onTaskRemoved={itemRemovedHandler}
        onTaskChecked = {itemClicked}/>,
        $('#content')[0]
    );
    ReactDOM.render(<Footer/>,
        $('#footer')[0]
    );
});
