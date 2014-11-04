/** @jsx React.DOM */
var React = require('react');


/**
 * React Component for Columns
 *
 */
var RDTColumn = React.createClass({

    render: function() {

        var cols = this.props.config.cols;
        return(
            <thead>
                <tr> {
                    cols.map(function(col,idx) {
                        return <td key={idx + 100}>{col.header}</td>
                    })
                }
                </tr>
            </thead>
        )

    }
});


module.exports = RDTColumn;