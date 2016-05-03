var AppDispatcher = require('../app/dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');
var _ = require('lodash');


//TODO Make this Redux compatible
AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case TodoConstants.CREATE:
            if (action.text && action.text !== '') {
                var index = count++;
                _todos[index] = {id: index, task: action.text, completed: false};
            }
            TodoStore.emitChange();
            break;
        case TodoConstants.REMOVE:
            _.remove(_todos, function (item) {
                return (item.id === action.id);
            });
            TodoStore.emitChange();
            break;
        case TodoConstants.TOGGLE:
            _.findIndex(_todos, function (item) {
                return (item.id === action.id) && ((item.completed = action.checked) || true); //finding & updating at same time
            });
            TodoStore.emitChange();
            break;
    }
});
var count = 0;
var _todos = [];

var CHANGE_EVENT = 'change';
var TodoStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        console.log('--------> addling listern: ');
        this.on(CHANGE_EVENT, callback);
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);

    },
    removeChangeListener: function (callback) {
        console.log('--------> removing listern: ');
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAll(){
        return _todos;
    }


});
/*
 TodoStore.prototype = new EventEmitter();
 TodoStore.prototype.addChangeListener = function (callback) {
 console.log('--------> addling listern: ');
 this.on(CHANGE_EVENT, callback);
 };
 TodoStore.prototype.emitChange = function () {
 this.emit(CHANGE_EVENT);
 };
 TodoStore.prototype.removeChangeListener = function (callback) {
 console.log('--------> removing listern: ');
 this.removeListener(CHANGE_EVENT, callback);
 };
 */


module.exports = TodoStore;
