/** @jsx React.DOM */
var React = require('react');


/**
 * React Component for Columns
 *
 */
var RDTColumn = React.createClass({displayName: 'RDTColumn',

    render: function() {

        var cols = this.props.config.cols;
        return(
            React.createElement("thead", null, 
                React.createElement("tr", null, " ", 
                    cols.map(function(col,idx) {
                        return React.createElement("td", {key: idx + 100}, col.header)
                    })
                
                )
            )
        )

    }
});


module.exports = RDTColumn;