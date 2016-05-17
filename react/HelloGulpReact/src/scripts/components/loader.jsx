var React = require('react');
var ReactDOM = require('react-dom');

module.exports =(function(){

    return React.createClass({
        render: function() {
          return(
              <span>
                   <span className={"message" + (this.props.isLoading ? '' : ' is-hidden')}>{ this.props.loadingMessage }</span> 
                   <span className={"style to show loading side" + (this.props.isLoading ? '' : ' is-hidden')}></span> 
              </span>
          );
        }
    });
})()
