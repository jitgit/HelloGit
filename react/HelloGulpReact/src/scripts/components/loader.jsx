var React = require('react');
var ReactDOM = require('react-dom');

module.exports =(function(){

    return React.createClass({
        render: function() {
          return(
              <span>
                   <span className={"message" + (this.props.isLoading ? '' : ' is-hidden')}>{ this.props.loadingMessage }</span> 
                   <span className={"neo-icon-loading is-spinning-clockwise message" + (this.props.isLoading ? '' : ' is-hidden')}></span> 
              </span>
          );
        }
    });
})()
