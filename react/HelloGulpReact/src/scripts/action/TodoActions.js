var TodoConstants = require('../constants/TodoConstants');
var AppDispatcher = require('../app/dispatcher/AppDispatcher');

module.exports = {
    createTodo: function (text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.CREATE,
            text: text
        });
    },
    removeItem:function(removedIndex){
        AppDispatcher.dispatch({
            actionType: TodoConstants.REMOVE,
            id: removedIndex
        });
    },
    toggleItem:function(itemId,checked){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TOGGLE,
            id: itemId,
            checked:checked
        });
    }
};

