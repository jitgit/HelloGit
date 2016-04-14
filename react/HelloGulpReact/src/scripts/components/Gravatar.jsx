var React = require('react');

function Gravatar() {
}
var Gravatar = React.createClass({
    getInitialState: function () {
        console.log('--------> this.props: ', this.props);
        return {data:this.props.data};
    },
    render: function () {
        var checkBoxes = this.state.data.map(function (u) {
            return <input type="checkbox">{u.name}</input>
        });

        console.log('--------> checkBoxes: ',checkBoxes);
        return (
            <div>
                {checkBoxes}
            </div>
        );

    }
});
module.exports = Gravatar;
