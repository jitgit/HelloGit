var ReactDOM = require('react-dom');
var React = require('react');//Do not remove
var HelloWorldTitle = require('./components/HelloWorldTitle.jsx');
var Gravatar = require('./components/Gravatar.jsx');
function MyClassA() {
}

var GravatarData = [{name: 'Dev'}, {name: 'Devd'},{name: 'JP'}];
MyClassA.prototype = {
    methodA: function () {
        console.log("Method A ");
        ReactDOM.render(<HelloWorldTitle/>,
            document.getElementById('content')
        );
        ReactDOM.render(<Gravatar foo="Tick me" data={GravatarData}/>,
            document.getElementById('content2')
        );
    }
};


module.exports = MyClassA;
