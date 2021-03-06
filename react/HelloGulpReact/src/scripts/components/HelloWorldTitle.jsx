var React = require('react');

function fetchUsers(cb) {
    setTimeout(function () {
        cb([{id: 1, name: 'Dev'}, {id: 2, name: 'Devd'}, {id: 3, name: 'JP'}]);
    }, 500);
}

var HelloWorldTitle = React.createClass({
    getInitialState: function () {
        return {
            users: [],
            loaded: false
        };
    },
    componentDidMount: function () {
        var self = this;
        fetchUsers(function (users) {
            self.setState({
                users: users,
                loaded: true
            });
        });
    },
    onClickListener: function (clickedUser) {
        console.log('--------> clickedUser: ', clickedUser);
    },
    render: function () {
        var self = this;
        if (!this.state.loaded) {
            return <div>Loading...</div>;
        }
        var users = this.state.users.map(function (u) {
            return <li onClick={self.onClickListener.bind(this,u)}>{u.name}</li>;
        });
        console.log('--------> users: ', users);
        return <div>
            <h1>Hello !!</h1>
            <ul>
                {users}
            </ul>
        </div>;
    }
});

module.exports = HelloWorldTitle;
